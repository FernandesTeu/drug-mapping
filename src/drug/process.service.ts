import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer-core';

@Injectable()
export class ProcessService {
  async search(query: string): Promise<string> {
    let browser: puppeteer.Browser | null = null;
    try {
      browser = await puppeteer.launch({
        headless: true,
        executablePath:
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      // Acessa a página do DailyMed
      await page.goto('https://dailymed.nlm.nih.gov/dailymed/index.cfm', {
        waitUntil: 'networkidle2',
      });

      // Aguarda o campo de busca e insere o termo
      await page.waitForSelector('input[name="query"]');
      await page.type('input[name="query"]', query);

      // Simula o pressionamento da tecla Enter para submeter a busca
      await page.keyboard.press('Enter');

      // Aguarda a navegação e o carregamento dos resultados
      await page.waitForNavigation({ waitUntil: 'networkidle2' });

      // Obtém o conteúdo HTML da página resultante
      const content = await page.content();

      return content;
    } catch (error) {
      throw new Error('Error during web scraping: ' + error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
