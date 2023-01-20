import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { playerSchema } from 'src/players/interfaces/player.schema';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { categorySchema } from './interfaces/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: categorySchema, name: 'categories' },
      { schema: playerSchema, name: 'players' },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
