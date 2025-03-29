import { Injectable } from '@nestjs/common';
import { AiService } from 'src/utils/ai.service';
import { DailymedService } from './dailymed.service';
import { ProcessService } from './process.service';
import { IMedicalCondition, IndicationsService } from './indications.service';

@Injectable()
export class DrugService {
  constructor(
    private readonly dailymedService: DailymedService,
    private readonly process: ProcessService,
    private readonly indication: IndicationsService,
    private readonly iaService: AiService,
  ) {}
  async extractIndications(labelText: string): Promise<unknown> {
    // extract indications from the text using Puppeteer from DailyMed
    const htmlContent = await this.process.search(labelText);

    // send the extracted HTML content to the dailymed service for processing with Cheerio
    const response =
      await this.dailymedService.extractIndicationsAndUsage(htmlContent);

    // send the complete text information if Use and Indication to ChatGPT treat the data
    const responseAi =
      await this.iaService.extractIndicationsFromText(response);

    // Treat data was return from ChatGPT.
    // Here we use the IndicationsService to process the data
    const data = this.indication.updateFileWithNewData([
      responseAi,
    ] as IMedicalCondition[]);

    // Save the data to a file and return update object to API
    return Promise.resolve(data);
  }
}
