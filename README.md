# MongoDB Dictionary

MongoDB Dictionary is an Amazon Alexa skill that provides spoken definitions of MongoDB terminology.

Originally created in 2017, the project was built as a simple voice interface to the MongoDB glossary: ask Alexa about a MongoDB term and receive a concise definition in response.

## Example Usage

> "Alexa, ask MongoDB what is the definition of a collection."

> "Alexa, ask MongoDB for the definition of a replica set."

The skill supports terminology covering core MongoDB concepts as well as newer areas of the platform, including Atlas, aggregation, replication, sharding, security, encryption, search, and vector search.

## Project Structure

- `index.js` - Alexa skill and request-handling logic
- `definitions.json` - MongoDB terms and Alexa-friendly definitions
- `responses.json` - response strings used by the skill
- `package.json` - Node.js project dependencies and metadata

## Definitions

The glossary data is stored in `definitions.json`.

The definitions are based on terminology from the current MongoDB documentation and are intentionally written as concise, spoken responses rather than reproductions of the documentation.

MongoDB's current glossary is available at:

https://www.mongodb.com/docs/manual/reference/glossary/

## Technology

The original implementation uses:

- Node.js
- Amazon Alexa Skills Kit
- AWS Lambda

The project dates from the early Alexa Skills Kit ecosystem and may require updates to its runtime, dependencies, or Alexa SDK configuration before deployment on current Amazon infrastructure.

## History

MongoDB Dictionary was originally created around MongoDB 3.4 and published as an Alexa skill in 2017.

At the time, the project provided voice access to most of the terminology in the MongoDB 3.4 glossary. The glossary has expanded substantially since then as MongoDB has added capabilities including Atlas, transactions, modern encryption features, Search, Vector Search, and other platform services.

In September 2026, the glossary dataset was refreshed against the current MongoDB documentation, giving this nine-year-old project a much-needed update.

## Status

This is a small legacy project that is maintained primarily to keep the Alexa skill functional and its MongoDB terminology reasonably current.

It is not an official MongoDB project.

## License and Trademarks

MongoDB is a registered trademark of MongoDB, Inc.

Amazon, Alexa, Echo, and AWS are trademarks of Amazon.com, Inc. or its affiliates.

This project is independently maintained and is not affiliated with or endorsed by MongoDB, Inc. or Amazon.

## Author

Created by Ken W. Alger.

GitHub: https://github.com/kenwalger
