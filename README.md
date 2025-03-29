<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project in source folder

```bash
# docker
$ docker docker build -t drug-mapping .

#run project
docker run -p 3000:3000 -e NODE_ENV=production -e OPENAI_API_KEY=your_api_key_here drug-mapping

```

## Run tests

```bash
# execute local
$ yarn start:dev

#.env variable
NODE_ENV=production
OPENAI_API_KEY=your_api_key_here

```

## Challenge during the Project

## Cheerio

To extract data from the DailyMed website, the initial configuration was simple but insufficient. The website features an extensive search input, which complicates the extraction process. While Cheerio is effective for manipulating HTML data, it cannot handle JavaScript executed on the page. Therefore, with the assistance of AI, I opted for the Puppeteer library.

## Puppeteer

The library was a great choice, as it allows full interaction with JavaScript on the webpage. It enabled me to easily identify the search input field and set the drug name for querying DailyMed.

The first challenge I faced was waiting for the results page to fully load. I solved this by identifying a specific element ID that confirmed the page was ready before proceeding to extract the data.

The second challenge was related to Puppeteer running headless Chrome under the hood. To get it working properly, especially in a containerized environment, I had to test different Docker images to ensure compatibility.

## ChatGPD OpenAI

It was a big challenge since I had never used this API before. While exploring the documentation, I discovered the OpenAI SDK for Node.js, which helps streamline interactions with the API.

Unfortunately, I couldn't resolve the issue because using the OpenAI API requires an API key, and I couldn’t find a way to use it without paying. As a workaround, I manually copied the prompt and pasted it into the ChatGPT web interface, which returned the object I needed to continue testing.

In the service's catch block, I returned the manually extracted object from ChatGPT to keep the implementation moving forward. I'm not entirely sure if it will work as expected, but at least I gave it a try.

## Docker

I didn’t have major issues with Puppeteer itself, but I had to use a Docker image that included Chromium to make it work properly. Since my time was limited, I couldn't explore alternative solutions.

I saw in the Puppeteer documentation that there's an official Dockerfile available, but I didn’t have the chance to test it due to the tight schedule.

## Explanation Implimentation

I followed this approach to implement the feature:

- Puppeteer: I used Puppeteer to search for content on the DailyMed website and interact with DOM elements. The program.service returns HTML elements to the drug.service, which continues the application flow.

- Cheerio: I used Cheerio to extract content from the returned HTML. It’s a great library for working with DOM elements, although it doesn't handle JavaScript. Using it, I extracted the "Usage and Indications" section.

- OpenAI API: This was the biggest challenge, as I couldn’t find a way to use the API key without paying. As a workaround, I manually submitted the data to ChatGPT via the web interface and copied the response object for testing. The openai.service receives raw data from the dailymed.service and returns an object with symptom information.

- Indications.service: This service merges all the collected information. It updates a JSON file with the data returned from OpenAI and then returns an object containing the DrugIndications property.

Finally, the drug.service returns the formatted object.
