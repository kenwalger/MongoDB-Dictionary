# MongoDB Dictionary

An Amazon Alexa skill that provides concise spoken definitions of MongoDB terminology.

MongoDB Dictionary began in 2017 as an experiment in building voice interfaces for developer education. A user could ask Alexa about a MongoDB term and receive a short definition suitable for a spoken response.

Examples included:

> "Alexa, ask MongoDB what a collection is."

> "Alexa, ask MongoDB to define replica set."

The original skill was built against MongoDB 3.4-era terminology using Node.js 6 and the first-generation Alexa Skills Kit SDK.

## 2026 Modernization

In September 2026, the project was revisited after Amazon announced that the original Alexa skill would be disabled due to its age and low usage.

Rather than leave the repository in its 2017 state, the implementation was modernized as a small software preservation exercise.

The update included:

* Migrating from Node.js 6.10 to Node.js 24
* Migrating from the original `alexa-sdk` package to ASK SDK v2
* Replacing the legacy callback-based Lambda integration with an asynchronous handler compatible with Node.js 24
* Refreshing the MongoDB terminology from the current MongoDB documentation
* Expanding the dictionary to more than 300 terms
* Adding terminology for Atlas, aggregation, replication, sharding, encryption, MongoDB Search, Vector Search, and other modern MongoDB capabilities
* Adding speech-friendly aliases for acronyms and technical terminology
* Adding automated tests for the core Alexa request handlers
* Updating project metadata and documentation

The modernized Lambda implementation successfully runs on Node.js 24 and passes the project's automated test suite.

## Project Status

**Retired.**

The original Alexa skill was published in 2017. During the 2026 modernization, the underlying Lambda application was successfully migrated and tested, but the historical Alexa interaction model was no longer available in the Alexa Developer Console.

Because invocation names for previously published skills cannot be changed, recreating the voice model would require publishing a new Alexa skill. Given the limited usefulness of maintaining a dedicated MongoDB dictionary skill today, the decision was made to retire the Alexa application rather than create and certify a replacement.

The repository remains available as an example of:

* Early voice-interface development for technical education
* An Alexa Skills Kit application
* AWS Lambda integration
* Maintaining and modernizing a small legacy Node.js application
* Migrating software across nearly a decade of platform and runtime changes

## How It Works

The skill uses a simple request pipeline:

```text
Alexa request
    |
    v
ASK SDK request handler
    |
    v
MongoDB term lookup
    |
    v
Concise spoken definition
```

Definitions are stored locally in `definitions.json`, allowing the skill to answer requests without an external database or API.

The interaction model uses a `GetDefinition` intent with a `Term` slot containing MongoDB terminology and speech-friendly aliases.

## Project Structure

```text
.
├── index.js
├── index.test.js
├── definitions.json
├── responses.json
├── interaction-model.json
├── package.json
├── package-lock.json
└── README.md
```

### `index.js`

Implements the Alexa request handlers and AWS Lambda entry point using ASK SDK v2.

### `index.test.js`

Tests core behavior including:

* Launch requests
* Known-term lookup
* Modern MongoDB terminology
* Unknown terms
* Missing term slots

Run the tests with:

```bash
npm test
```

### `definitions.json`

Contains concise, voice-oriented descriptions of MongoDB terminology.

The definitions are original summaries informed by terminology in the current MongoDB documentation rather than reproductions of MongoDB documentation text.

### `responses.json`

Contains common conversational responses used by the skill.

### `interaction-model.json`

Contains the reconstructed Alexa interaction model, including the `GetDefinition` intent, `Term` slot, MongoDB terminology, and speech-friendly aliases.

This model was created as part of the 2026 modernization but was not published as a replacement Alexa skill.

## Technology

The final implementation uses:

* Node.js 24
* ASK SDK for Node.js v2
* AWS Lambda
* Node.js built-in test runner
* JSON-based local terminology data

## History

### 2017

* Created the original MongoDB Dictionary Alexa skill
* Built with Node.js 6.10
* Used the original Alexa SDK for Node.js
* Covered MongoDB 3.4-era terminology
* Published through the Amazon Alexa Skills ecosystem

### 2026

* Revisited the project after receiving Amazon's retirement notice
* Migrated the implementation to Node.js 24
* Migrated to ASK SDK v2
* Updated the AWS Lambda handler for the modern asynchronous runtime
* Refreshed and substantially expanded the MongoDB terminology
* Added automated tests
* Successfully deployed and tested the modernized Lambda implementation
* Retired the Alexa skill rather than publish a replacement skill

## Why Keep This Repository?

Software does not need to remain a production application forever to be useful.

This repository captures a small piece of the 2017 voice-assistant era and, nine years later, provides a practical example of what it takes to bring an application across multiple generations of runtimes, SDKs, APIs, and platform requirements.

Sometimes maintaining old software means keeping it alive.

Sometimes it means bringing it forward far enough to understand what still matters, documenting what changed, and then knowing when to call it complete.

## Disclaimer

MongoDB is a trademark of MongoDB, Inc.

This project is an independent educational project and is not affiliated with, endorsed by, or sponsored by MongoDB, Inc. or Amazon.

## Author

Ken W. Alger
