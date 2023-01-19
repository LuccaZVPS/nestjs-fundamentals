import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:7THzq8jsjCf6a6pT@cluster0.46uycfg.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
