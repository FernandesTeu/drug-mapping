import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';

@Module({
  providers: [ProgramService]
})
export class ProgramModule {}
