import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayer } from './DTOs/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(@InjectModel('players') private playerModel: Model<Player>) {}
  private readonly logger = new Logger(PlayersService.name);
  async createPlayer(createPlayerDTO: CreatePlayer): Promise<void> {
    const { email, name, phoneNumber } = createPlayerDTO;
    var playerExist = await this.findByEmail(email);
    this.logger.log(playerExist);
    if (playerExist) {
      throw new ConflictException();
    }

    const player = {
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      playerImageUrl: 'www.google.com.br/foto123.png',
      position: 1,
      ranking: 'A',
    };
    const playertoSave = new this.playerModel(player);
    playertoSave.save();
  }

  async getPlayers(): Promise<Player[]> {
    const players = this.getPlayersRepo();
    return players;
  }

  private async getPlayersRepo(): Promise<Player[]> {
    return await this.playerModel.find();
  }
  async findByEmail(email: string): Promise<false | Player> {
    const player = await this.playerModel.findOne({ email });
    if (player) {
      return player;
    }
    return false;
  }
  async update(createPlayerDTO: CreatePlayer, id: string) {
    const playerExist = await this.findById(id);
    if (!playerExist) {
      throw new NotFoundException('Player doest exist');
    }
    await this.playerModel.findByIdAndUpdate(id, {
      $set: {
        name: createPlayerDTO.name,
        phoneNumber: createPlayerDTO.phoneNumber,
      },
    });
  }

  async deletePlayer(id: string) {
    const player = await this.findById(id);
    if (!player) {
      return false;
    }
    await player.delete();
    return true;
  }
  async findById(id: string): Promise<Document<unknown, any, Player> & Player> {
    const player = await this.playerModel.findById(id);
    if (!player) {
      throw new NotFoundException();
    }
    return player;
  }
}
