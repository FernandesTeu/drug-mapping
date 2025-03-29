import { Module } from '@nestjs/common';
import { DrugService } from './drug.service';
import { DrugController } from './drug.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { DailymedService } from './dailymed.service';
import { HttpModule } from '@nestjs/axios';
import { ProcessService } from './process.service';
import { IndicationsService } from './indications.service';
import { AiService } from 'src/utils/ai.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [DrugController],
  providers: [
    DrugService,
    ConfigService,
    DailymedService,
    ProcessService,
    IndicationsService,
    AiService,
  ],
})
export class DrugModule {}
