/*
    Template for creating routes in Fastify
    
    class ExampleRoutes {

        constructor(fastify) {
            this.fastify = fastify;
            this.initRoutes();
        }

        initRoutes(){

        }
    }

    export default async function(fastify) {
        new ExampleRoutes(fastify);
    }
        
*/

import ExampleController from '../../services/example/exampleController.js';

class ExampleRoutes {
    constructor(fastify) {
        this.fastify = fastify;
        this.exampleController = new ExampleController();
        this.initRoutes();
    }

    initRoutes() {
        this.fastify.post(
            '/',
            {
                schema: {
                    description: 'Create an example',
                    tags: ['Example'],
                    summary: 'Create an example',
                    body: {
                        type: 'object',
                        required: ['name', 'email'],
                        properties: {
                            name: { type: 'string' },
                            age: { type: 'number' },
                            email: { type: 'string' },
                            address: {
                                type: 'object',
                                properties: {
                                    street: { type: 'string' },
                                    city: { type: 'string' },
                                    state: { type: 'string' },
                                    zip: { type: 'number' },
                                },
                            },
                        },
                    },
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },

            this.createExample.bind(this),
        );

        this.fastify.get(
            '/',
            {
                schema: {
                    description: 'Get all examples',
                    tags: ['Example'],
                    summary: 'Get all examples',
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string' },
                                    name: { type: 'string' },
                                    age: { type: 'number' },
                                    email: { type: 'string' },
                                    address: {
                                        type: 'object',
                                        properties: {
                                            street: { type: 'string' },
                                            city: { type: 'string' },
                                            state: { type: 'string' },
                                            zip: { type: 'number' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            this.getExamples.bind(this),
        );

        this.fastify.put(
            '/',
            {
                schema: {
                    description: 'Update an example',
                    tags: ['Example'],
                    summary: 'Update an example',
                    body: {
                        type: 'object',
                        required: ['_id'],
                        properties: {
                            _id: { type: 'string' },
                            name: { type: 'string' },
                            age: { type: 'number' },
                            email: { type: 'string' },
                            address: {
                                type: 'object',
                                properties: {
                                    street: { type: 'string' },
                                    city: { type: 'string' },
                                    state: { type: 'string' },
                                    zip: { type: 'number' },
                                },
                            },
                        },
                    },
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },
            this.updateExample.bind(this),
        );

        this.fastify.delete(
            '/:id',
            {
                schema: {
                    description: 'Delete an example',
                    tags: ['Example'],
                    summary: 'Delete an example',
                    params: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                description: 'The id of the example',
                            },
                        },
                    },
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                            },
                        },
                    },
                },
            },
            this.deleteExample.bind(this),
        );
    }

    async createExample(request, reply) {
        const example = request.body;
        await this.exampleController.create(example);

        return reply.send({ message: 'Example created' });
    }

    async getExamples(request, reply) {
        const examples = await this.exampleController.getAll();
        return reply.send(examples);
    }

    async updateExample(request, reply) {
        const example = request.body;
        await this.exampleController.update(example);

        return reply.send({ message: 'Example updated' });
    }

    async deleteExample(request, reply) {
        const id = request.params.id;
        await this.exampleController.delete(id);

        return reply.send({ message: 'Example deleted' });
    }
}

export default async function (fastify) {
    new ExampleRoutes(fastify);
}
