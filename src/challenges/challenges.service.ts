import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { PlayersService } from 'src/players/players.service';
import { AssignMatchDTO } from './DTOs/assign-match';
import { CreateChallengeDTO } from './DTOs/create-challenge';
import { UpdateChallengeDTO } from './DTOs/update-challenge';
import { Challenges } from './interfaces/challenges.interface';
import { Match } from './interfaces/matchs.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('challenges')
    private readonly challengesModel: Model<Challenges>,
    @InjectModel('matchs') private readonly matchsModel: Model<Match>,
    private readonly playerService: PlayersService,
  ) {}
  private readonly logger = new Logger();
  async create(createChallengeDTO: CreateChallengeDTO) {
    const { players, challenger } = createChallengeDTO;
    const allPlayer = await this.playerService.getPlayers();
    const filter = allPlayer.filter(
      (p) => p._id == players[0]._id || p._id == players[1]._id,
    );
    if (filter.length < 2) {
      throw new NotFoundException('Player doest exist');
    }
    if (challenger != players[0]._id && challenger != players[1]._id) {
      throw new BadRequestException('Challenger should be in the game');
    }
    const challengerPlayer =
      challenger == filter[0]._id ? filter[0] : filter[1];
    if (!challengerPlayer.ranking) {
      throw new BadRequestException('Challenger should have a rank');
    }

    return await this.challengesModel.create({
      ...createChallengeDTO,
      challengeSolicitationDate: new Date(),
      category: challenger,
      status: 'PENDENTE',
      challenger: challengerPlayer._id,
    });
  }
  async getAll() {
    return await this.challengesModel
      .find()
      .populate('players')
      .populate('challenger')
      .populate('match');
  }
  async findOne(id: string) {
    return await this.challengesModel
      .find()
      .where('players')
      .in([id])
      .populate('players')
      .populate('challenger');
  }
  async updateChallenge(body: UpdateChallengeDTO, id: string) {
    return await this.challengesModel.findOneAndUpdate(
      { id: id },
      {
        $set: {
          status: body.status,
          challengeDate: body.challengeDate,
          challengeResponseDate: new Date(),
        },
      },
    );
  }
  async delete(id: string) {
    return await this.challengesModel.findOneAndDelete({ id: id });
  }

  async assignMatch(match: AssignMatchDTO, id: string) {
    const challenge = await this.challengesModel
      .findOne({ id: id })
      .populate('challenger');
    const matchCreated = await this.matchsModel.create({
      winner: match.winner,
      result: match.result,
      players: challenge.players,
      category: challenge.challenger.ranking,
    });

    return await this.challengesModel.findOneAndUpdate(
      { id: id },
      {
        $set: {
          match: matchCreated._id,
        },
      },
    );
  }
}
