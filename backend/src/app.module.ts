import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RideController } from './ride/ride.controller';
import { RideService } from './ride/ride.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:  join(__dirname, '..',"..", '..', '.env')
  })],
  controllers: [AppController, RideController],
  providers: [AppService, RideService, PrismaService],
})
export class AppModule {}
