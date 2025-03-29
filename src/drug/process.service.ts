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

      // Configure navigation timeouts
      page.setDefaultNavigationTimeout(30000);
      page.setDefaultTimeout(30000);

      // Navigate to DailyMed search page
      await page.goto('https://dailymed.nlm.nih.gov/dailymed/index.cfm', {
        waitUntil: 'networkidle2',
      });

      // Wait for and fill the search input
      await page.waitForSelector('input[name="query"]');
      await page.type('input[name="query"]', query);

      // Submit search
      await page.keyboard.press('Enter');

      // Wait for search results to appear
      await page.waitForFunction(
        () => {
          const h1 = document.querySelector('h1');
          if (!h1?.textContent) {
            return false;
          }
          return h1 && h1?.textContent.includes('Label:');
        },
        { timeout: 30000 },
      );

      // Wait a bit for results to stabilize
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Wait for detail page to load completely
      await page.waitForSelector('.drug-label-sections', {
        timeout: 30000,
      });

      // Get the full page content
      const content = await page.content();

      return content;
    } catch (error) {
      if ((error as { name?: string }).name === 'TimeoutError') {
        throw new Error(
          'Operation timed out: The page took too long to respond',
        );
      }
      throw new Error(`Error during web scraping: ${error}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
