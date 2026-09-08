# MongoDB Dictionary for Amazon Alexa

An Amazon Alexa skill that provides concise spoken definitions of MongoDB terminology.

Ask Alexa about a MongoDB concept and the skill responds with a short, voice-friendly explanation.

Originally created in 2017, MongoDB Dictionary was modernized in 2026 to run on the current Alexa Skills Kit SDK and AWS Lambda runtime, with its terminology refreshed to reflect modern MongoDB.

## Example Usage

The skill uses the invocation name `mongo d. b.`.

Try questions such as:

```text
Alexa, ask mongo d. b. what is collection
Alexa, ask mongo d. b. what is replica set
Alexa, ask mongo d. b. what is aggregation pipeline
Alexa, ask mongo d. b. what is vector search
Alexa, ask mongo d. b. what is Atlas
```

Example response:

> **Collection:** A named group of MongoDB documents within a database, roughly analogous to a table in a relational database.

## What's Included

MongoDB Dictionary contains more than 300 MongoDB terms and spoken aliases covering topics including:

* MongoDB fundamentals
* Documents and collections
* CRUD operations
* Aggregation
* Indexes
* Replication and replica sets
* Sharding
* Transactions
* Security and encryption
* MongoDB Atlas
* MongoDB Search
* MongoDB Vector Search
* Embeddings and semantic search
* Legacy MongoDB terminology

Definitions are intentionally concise and written for spoken delivery rather than copied directly from product documentation.

## Project Structure

```text
.
├── index.js
├── index.test.js
├── definitions.json
├── responses.json
├── interaction-model.json
├── package.json
└── package-lock.json
```

### `index.js`

AWS Lambda entry point and Alexa request handlers.

The skill uses ASK SDK v2 and an asynchronous Lambda handler compatible with the Node.js 24 runtime.

### `definitions.json`

The MongoDB terminology dataset used by the skill.

Terms are normalized for case-insensitive lookup, with aliases included for terminology that Alexa may hear or transcribe in different ways.

### `responses.json`

Common conversational responses for launching, helping, and exiting the skill.

### `interaction-model.json`

Alexa custom interaction model containing the `GetDefinition` intent, `Term` slot, sample utterances, and MongoDB terminology slot values.

### `index.test.js`

Automated tests covering launch requests, successful definition lookups, modern terminology, unknown terms, and missing slots.

## Technology

* Node.js 24
* ASK SDK for Node.js v2
* AWS Lambda
* Amazon Alexa Custom Skills
* Node.js built-in test runner

## Development

Install dependencies:

```bash
npm install
```

Run the automated tests:

```bash
npm test
```

The Lambda function handler is:

```text
index.handler
```

The application uses an explicit asynchronous handler and invokes the ASK SDK skill directly:

```javascript
exports.handler = async (event, context) => {
  return skill.invoke(event, context);
};
```

This avoids the callback-based Lambda handler pattern used by older versions of the Alexa SDK.

## A Little History

MongoDB Dictionary began in 2017 as an experiment in using voice interfaces for developer education.

The original version ran on Node.js 6.10, used the first-generation `alexa-sdk`, and contained terminology based largely on the MongoDB 3.4-era glossary.

Nine years later, the Alexa platform, Node.js, AWS Lambda, and MongoDB itself had all changed substantially.

In September 2026, the project was modernized rather than retired:

* Migrated from Node.js 6.10 to Node.js 24
* Migrated from `alexa-sdk` v1 to ASK SDK v2
* Replaced the original callback-based Lambda integration with an async handler
* Reconstructed the Alexa interaction model
* Preserved the original `mongo d. b.` invocation name
* Expanded the terminology dataset to more than 300 terms
* Added modern MongoDB concepts including Atlas, Search, Vector Search, embeddings, and semantic search
* Added speech-friendly aliases for acronyms and commonly misrecognized terms
* Added automated request-handler tests
* Verified the modernized skill through AWS Lambda and the Alexa Developer Console

And, somehow, it still works.

## About the Definitions

The terminology in this project is informed by MongoDB's public documentation and glossary, but the definitions are independently written and optimized for concise spoken responses.

For authoritative and complete MongoDB documentation, refer to the official [MongoDB documentation](https://www.mongodb.com/docs/manual/reference/glossary/).

## Disclaimer

MongoDB is a trademark of MongoDB, Inc.

This is an independent educational project and is not an official MongoDB product or an indication of endorsement by MongoDB, Inc.

Amazon, Alexa, and AWS are trademarks of Amazon.com, Inc. or its affiliates.

## Author

Created by **Ken W. Alger** in 2017.

Modernized in 2026.
