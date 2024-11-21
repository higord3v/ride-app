import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RideController } from './ride/ride.controller';
import { RideService } from './ride/ride.service';
import { ConfigModule } from '@nestjs/config';
import { cwd } from 'process';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:  join(__dirname, '..', '..', '.env'),
  })],
  controllers: [AppController, RideController],
  providers: [AppService, RideService],
})
export class AppModule {}
