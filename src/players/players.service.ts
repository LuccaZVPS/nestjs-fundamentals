import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayer } from './DTOs/create-player.dto';
import { Player } from './interfaces/player.interface';
import { randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { PlayerDocument } from './interfaces/player.schema';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('players') private playerModel: Model<PlayerDocument>,
  ) {}
  private readonly logger = new Logger(PlayersService.name);
  async createPlayer(createPlayerDTO: CreatePlayer): Promise<void> {
    this.create(createPlayerDTO);
  }

  private async create(createPlayerDTO: CreatePlayer): Promise<void> {
    const { email, name, phoneNumber } = createPlayerDTO;
    var playerExist = await this.findByEmail(email);

    if (playerExist) {
      this.update(createPlayerDTO, playerExist);
      return;
    }

    const player: Player = {
      _id: randomUUID(),
      email: email,
      name: name,
      phoneNumber: phoneNumber,
      playerImageUrl: 'www.google.com.br/foto123.png',
      position: 1,
      ranking: 'A',
    };
    this.playerModel.create(player);
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
  private async update(createPlayerDTO: CreatePlayer, player: Player) {
    await this.playerModel.findOneAndUpdate(
      { email: createPlayerDTO.email },
      {
        $set: {
          name: createPlayerDTO.name,
        },
      },
    );
  }

  async deletePlayer(email: string) {
    const player = this.findByEmail(email);
    if (!player) {
      return false;
    }
    await this.playerModel.findOneAndRemove({ email });
    return true;
  }
}
