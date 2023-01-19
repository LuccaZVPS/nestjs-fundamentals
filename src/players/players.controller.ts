import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePlayer as CreatePlayerDTO } from './DTOs/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDTO) {
    const { email, name, phoneNumber } = createPlayerDto;
    await this.playersService.createPlayer({ email, name, phoneNumber });
    return '';
  }
  @Get()
  async getPlayer(@Query() query): Promise<Player[]> {
    if (query.email) {
      const player = await this.playersService.findByEmail(query.email);
      if (player) {
        return [player];
      }
      throw new NotFoundException();
    }
    return await this.playersService.getPlayers();
  }

  @Delete()
  async deletePlayer(@Query('email') email: string) {
    const response = this.playersService.deletePlayer(email);
    if (!response) {
      throw new NotFoundException();
    }
    return 'Deleted';
  }
}
