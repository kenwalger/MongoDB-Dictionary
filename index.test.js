'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { skill } = require('./index');

function requestEnvelope(request) {
    return {
        version: '1.0',
        session: {
            new: true,
            sessionId: 'test-session',
            application: { applicationId: 'test-app' },
            user: { userId: 'test-user' }
        },
        context: {
            System: {
                application: { applicationId: 'test-app' },
                user: { userId: 'test-user' },
                device: {
                    deviceId: 'test-device',
                    supportedInterfaces: {}
                },
                apiEndpoint: 'https://api.amazonalexa.com'
            }
        },
        request
    };
}

async function invoke(request) {
    return skill.invoke(requestEnvelope(request), {});
}

test('LaunchRequest returns welcome prompt', async () => {
    const response = await invoke({
        type: 'LaunchRequest',
        requestId: 'launch-request',
        timestamp: new Date().toISOString(),
        locale: 'en-US'
    });

    assert.equal(response.version, '1.0');
    assert.match(response.response.outputSpeech.ssml, /MongoDB Dictionary/i);
    assert.ok(response.response.reprompt);
});

test('GetDefinition returns a definition for collection', async () => {
    const response = await invoke({
        type: 'IntentRequest',
        requestId: 'collection-request',
        timestamp: new Date().toISOString(),
        locale: 'en-US',
        intent: {
            name: 'GetDefinition',
            confirmationStatus: 'NONE',
            slots: {
                Term: {
                    name: 'Term',
                    value: 'collection',
                    confirmationStatus: 'NONE'
                }
            }
        }
    });

    assert.equal(response.response.card.title, 'collection');

    assert.match(
        response.response.outputSpeech.ssml,
        /named group of MongoDB documents/i
    );
});

test('GetDefinition resolves a modern term', async () => {
    const response = await invoke({
        type: 'IntentRequest',
        requestId: 'vector-search-request',
        timestamp: new Date().toISOString(),
        locale: 'en-US',
        intent: {
            name: 'GetDefinition',
            confirmationStatus: 'NONE',
            slots: {
                Term: {
                    name: 'Term',
                    value: 'vector search',
                    confirmationStatus: 'NONE'
                }
            }
        }
    });

    assert.match(response.response.outputSpeech.ssml, /vector/i);
});

test('GetDefinition handles an unknown term gracefully', async () => {
    const response = await invoke({
        type: 'IntentRequest',
        requestId: 'unknown-request',
        timestamp: new Date().toISOString(),
        locale: 'en-US',
        intent: {
            name: 'GetDefinition',
            confirmationStatus: 'NONE',
            slots: {
                Term: {
                    name: 'Term',
                    value: 'definitely not a mongodb term',
                    confirmationStatus: 'NONE'
                }
            }
        }
    });

    assert.match(
        response.response.outputSpeech.ssml,
        /don't know the definition/i
    );
});

test('GetDefinition prompts again when the Term slot is missing', async () => {
    const response = await invoke({
        type: 'IntentRequest',
        requestId: 'missing-term-request',
        timestamp: new Date().toISOString(),
        locale: 'en-US',
        intent: {
            name: 'GetDefinition',
            confirmationStatus: 'NONE',
            slots: {}
        }
    });

    assert.match(
        response.response.outputSpeech.ssml,
        /provide a MongoDB term/i
    );

    assert.ok(response.response.reprompt);
});