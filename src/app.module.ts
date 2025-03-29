import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrugModule } from './drug/drug.module';
import { ProgramModule } from './program/program.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DrugModule, ProgramModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
