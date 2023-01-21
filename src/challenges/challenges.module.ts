import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from 'src/players/players.module';
import { PlayersService } from 'src/players/players.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { challengeSchema } from './interfaces/challenges.schema';
import { matchSchema } from './interfaces/matchs.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: challengeSchema, name: 'challenges' },
      { schema: matchSchema, name: 'matchs' },
    ]),
    PlayersModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
