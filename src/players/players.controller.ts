import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayer as CreatePlayerDTO } from './DTOs/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDTO) {
    const { email, name, phoneNumber } = createPlayerDto;
    await this.playersService.createPlayer({
      email,
      name,
      phoneNumber,
    });

    return 'Player created';
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(@Body() createPlayerDto: CreatePlayerDTO, @Param('id') id) {
    await this.playersService.update(createPlayerDto, id);
    return 'Player updated';
  }

  @Get()
  async getAllPlayer(): Promise<Player[]> {
    return await this.playersService.getPlayers();
  }

  @Get('/:id')
  async getPlayer(@Param('id') id): Promise<Player> {
    const player = await this.playersService.findById(id);
    if (!player) {
      throw new NotFoundException('Player doesnt exist');
    }
    return player;
  }

  @Delete('/:id')
  async deletePlayer(@Param('id') id: string) {
    const response = await this.playersService.deletePlayer(id);
    if (!response) {
      throw new NotFoundException();
    }
    return 'Deleted';
  }
}
