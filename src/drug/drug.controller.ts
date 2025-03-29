import { Body, Controller, Post } from '@nestjs/common';
import { DrugService } from './drug.service';

@Controller('drugs')
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @Post('extract')
  async extractIndications(@Body('labelText') labelText: string) {
    const indications: unknown =
      await this.drugService.extractIndications(labelText);
    return { indications };
  }
}
