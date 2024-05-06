# Quantas Qloyal Code Test
This is an example project written as part of an evaluation as a part of the interview process for Qantas that includes both a Playright smoke test and an example using the Newman CLI to run a couple of simple integraton tests against the Weatherbit API.

## Table of Contents
- [Installation](#installation)
- [Playwright Usage](#playwright-usage)
- [Newman Usage](#newman-usage)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/Iry-Horus/qantas-playwright-demo.git
```

2. Install dependencies:
```bash
npm install
```

While Playwright can be run via the CLI, it's a far better test development, running, and debugging experience if you install the Playwright Test for VSCode extention. By using the extention one is able to run tests simply by using the VSCode interface. You are also able to select headed or headless mode by checking the 'Show browser' button and enable step by step tracing by checking the 'Show trace viewer' checkbox. It really is the creme de la creme of test development interfaces, allowing you to record tests and assertions directly into your framework from browser.

Refer to the documentation [here](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) for detailed usage instructions.

## Playwright Usage
To run the project, either use the Playwright Test for VSCode extention per the documentation in the [Installation](#installation) section of this ReadMe, or use the following command:

```bash
npx playwright test tests/book-a-hotel.spec.ts
```
Running this command via CLI will also generate and open an HTML report with a details breakdown of the test run.

## Newman Usage
To run the Newman spec, simply run use the following command:
```bash
newman run api-tests/Weatherbit.postman_collection.json -r cli,json
```
Running this command will run the postman collection, retrieving the weather data from both a longitude and latitude and by zip code, as well as generate a report in console and print the request to JSON in a runtime generate root folder titled 'Newman.'
