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

To extract data from DailyMed web site. The configuration was simple, but was not enought, because
in dailymed web site, we have a long input search to type what we want to searching.
Cheerio it s good choice to manipulate html data, but the lib doesnt manipulate javascript on the screen, and then with Ai help, I choose pupperteer lib.

## Puppeteer

lib was a good choice. This lib can manipulate javascript in web page, as action, all the DOM element, and was simple identify input search and set the drug name to search into dailymed.
First challeng with this lib was wating for the next page loaded. I identified an ID to verify if the screen was loaded, even checked the conditional I could load data was I needed.
Second challend was about, that puppeteer using google Chrome under the roof to manipulate the data, and when I had to test some docker images to make it work.

## ChatGPD OpenAI

It was a big challenge, I never used this api, and I found in documentation that there is a lin openai for nodejs that helps to improve get responses from openai.
unhappier, I coud not solve this problema, because openai need a api Key, and I could find a way to use widhout pay for that. So, I copy the prompet and past into chatGPT web, and return me an object I need to continue my test.

In this service, on the catch, I return the manual object I has extract from chatGPT web, and I could keep going with the rest of the implementation. I don't have sure if it will be work. but I tried.

## Docker

I did not have problem with, but I had to use a have image that have chromium to make puppeteer works. My time was short and I did not have time to study about others solutions. I sow in the puppeteer documentation that have a docker file to use, but I didn't have time to test.

## Explanation Implimentation

I follow this way to try implement the feature

- Using puppeteer to search content into dailymed web site and manipule DOM elements. The Program.service return hml elements to drug.service and follow the application
- To find the content, I use Cheerio. This is a great lib to get DOM elements, but doens manipulate the javascript. Here I got the "Usage and Indicate" to return data foward.
- APIOPENAI My best problem, because I dont find the way to use the apikey without pay. This services, receibe a pure data from dailymed.service, and return an object with information about the simptomns
- Indications.service here I can merge all the information, updated the json file with data came from openai. I updated the json file and return an json object with the property DrugIndications
- and the drug.service return this formated object
