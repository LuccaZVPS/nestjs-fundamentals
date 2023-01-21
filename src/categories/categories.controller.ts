import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';
import { AnyTxtRecord } from 'dns';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './DTOs/create-category';
import { UpdateCategoryDTO } from './DTOs/update-category';
import { Category } from './interfaces/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryDTO);
  }
  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }
  @Get('/:id')
  async getCategory(@Param('id') id): Promise<Category> {
    return await this.categoriesService.findById(id);
  }
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Param('id') id,
    @Body() categoryDTO: UpdateCategoryDTO,
  ) {
    await this.categoriesService.update(categoryDTO, id);
    return 'categories updated';
  }
  @Post('/:category/player/:player')
  async assignCategory(@Param() params: any): Promise<void> {
    await this.categoriesService.assign(params.category, params.player);
  }
}
