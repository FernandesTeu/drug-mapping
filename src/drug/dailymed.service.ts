import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';

@Injectable()
export class DailymedService {
  async extractIndicationsAndUsage(htmlContent: string): Promise<string> {
    try {
      const $ = load(htmlContent);

      const sections = $(
        'div.drug-label-sections ul li:nth-of-type(3) .Section',
      );
      const extractedTexts: string[] = [];

      sections.each((index, el) => {
        const sectionText = $(el).text().trim();

        if (!sectionText.toLowerCase().includes('close-toggle show-js')) {
          extractedTexts.push(sectionText);
        }
      });

      return Promise.resolve(extractedTexts.join(' '));
    } catch (error) {
      throw new Error(`Error extracting indications data: ${error}`);
    }
  }
}
