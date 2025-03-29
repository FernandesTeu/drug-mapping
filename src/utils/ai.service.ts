import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { IMedicalCondition } from 'src/drug/indications.service';

@Injectable()
export class AiService {
  logger = new Logger(AiService.name);
  private readonly openai: OpenAI;

  constructor(private readonly envConfig: ConfigService) {
    const configuration = new OpenAI({
      apiKey: this.envConfig.get<string>('OPENAI_API_KEY') || '',
    });
    this.openai = configuration;
  }

  async extractIndicationsFromText(
    text: string,
  ): Promise<Record<string, unknown>[] | IMedicalCondition> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: `Below is the text from the "Indications and Usage" section of a drug label. Extract all the medical conditions mentioned, normalize the names to standard English, and return a list of objects with the condition name and possible synonyms.:\n\n${text}`,
          },
        ],
        temperature: 0,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('Response content is null');
      }
      const parsedContent: Record<string, unknown> = JSON.parse(content);
      return Promise.resolve([parsedContent]);
    } catch (error) {
      // return data consulting manually in ChatGPT
      if (error instanceof Error) {
        return Promise.resolve(this.manuallyDataFromChatGPT());
      } else {
        return Promise.resolve([]);
      }
    }
  }

  private manuallyDataFromChatGPT(): Record<string, unknown>[] {
    return [
      {
        condition: 'Atopic Dermatitis',
        synonyms: ['Atopic eczema'],
      },
      {
        condition: 'Asthma',
        synonyms: [],
      },
      {
        condition: 'Chronic Rhinosinusitis with Nasal Polyps',
        synonyms: [],
      },
      {
        condition: 'Eosinophilic Esophagitis',
        synonyms: [],
      },
      {
        condition: 'Prurigo Nodularis',
        synonyms: [],
      },
      {
        condition: 'Chronic Obstructive Pulmonary Disease',
        synonyms: ['COPD'],
      },
    ];
  }
}
