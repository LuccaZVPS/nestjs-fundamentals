import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { playerSchema } from './interfaces/player.schema';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ schema: playerSchema, name: 'players' }]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
