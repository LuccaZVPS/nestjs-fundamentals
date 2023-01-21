import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { AssignMatchDTO } from './DTOs/assign-match';
import { CreateChallengeDTO } from './DTOs/create-challenge';
import { UpdateChallengeDTO } from './DTOs/update-challenge';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createChallenger(@Body() createChallengeDTO: CreateChallengeDTO) {
    return await this.challengesService.create(createChallengeDTO);
  }

  @Get()
  async getAllChallenges(@Query('id') id: string) {
    return id
      ? await this.challengesService.findOne(id)
      : await this.challengesService.getAll();
  }
  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateChallenge(@Body() body: UpdateChallengeDTO, @Param() id: string) {
    return await this.challengesService.updateChallenge(body, id);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  async deleteChallenge(@Param() id: string) {
    return await this.challengesService.delete(id);
  }
  @Post('/:id/match')
  @UsePipes(ValidationPipe)
  async putMatch(@Body() body: AssignMatchDTO, @Param() id: string) {
    return await this.challengesService.assignMatch(body, id);
  }
}
