import {
  ConflictException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { CreateCategoryDTO } from './DTOs/create-category';
import { UpdateCategoryDTO } from './DTOs/update-category';
import { Category } from './interfaces/category.interface';
import mongoose from 'mongoose';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories') private categoryModel: Model<Category>,
    @InjectModel('players') private playerModel: Model<Player>,
  ) {}
  private readonly logger = new Logger(CategoriesService.name);

  async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const categoryExist = await this.categoryModel.findOne(createCategoryDTO);
    if (categoryExist) {
      throw new ConflictException();
    }

    const createdCategory = new this.categoryModel({
      ...createCategoryDTO,
      players: [],
    });
    await createdCategory.save();
    return createdCategory;
  }
  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().populate('players');
  }
  async findById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }
  async update(categoryDTO: UpdateCategoryDTO, id: string): Promise<Category> {
    var category = await this.categoryModel.findByIdAndUpdate(id, {
      $set: {
        description: categoryDTO.description,
        events: categoryDTO.events,
        category: categoryDTO.category,
      },
    });
    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
  async assign(categoryName: string, playerId: string): Promise<void> {
    var player = await this.playerModel.findById(playerId);
    if (!player) {
      throw new NotFoundException('Player doesnt exist');
    }
    var category = await this.categoryModel.findOne({
      category: categoryName,
    });
    if (!category) {
      throw new NotFoundException('Category doesnt exist');
    }
    this.logger.log(category.players);

    if (category.players.includes(playerId as unknown as Player)) {
      throw new ConflictException('Player already in this category');
    }
    category.players.push(playerId as unknown as Player);

    await this.categoryModel.findOneAndUpdate(
      {
        category: categoryName,
      },
      {
        $set: {
          players: category.players,
        },
      },
    );
  }
}
