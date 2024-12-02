import { Schema } from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Evaluation } from './models/evaluation.model';
import { Prototype } from './models/prototype.model';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Pridgeify API',
            version: '1.0.0',
            description: 'API for IdeaHub',

        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            },
            {
                url: 'https://pridgeify.herokuapp.com',
                description: 'Production server'
            }
        ]
    },
    Schemas:[
        {
            User:{
                type: 'object',
                properties:{
                    id:{
                        type: 'string',
                        description: 'User id'
                    },
                    email:{
                        type: 'string',
                        description: 'User email'
                    },
                    password:{
                        type: 'string',
                        description: 'User password'
                    },
                    role:{
                        type: 'string',
                        description: 'User role',
                        enum: ['investor', 'innovator','consultant']
                    },
                    skills:{
                        type: 'array',
                        description: 'User skills'
                    },
                    profilePic:{
                        type: 'string',
                        description: 'User profile picture'
                    },
                    bio:{
                        type: 'string',
                        description: 'User bio'
                    },
                    name:{
                        type: 'string',
                        description: 'User name'
                    },
                    isEmailVerified:{
                        type: 'boolean',
                        description: 'User email confirmation status'
                    },
                    refreshToken:{
                        type: 'string',
                        description: 'User refresh token'
                    },
                    emailToken:{
                        type: 'string',
                        description: 'User email token'
                    },
                    resetPasswordToken:{
                        type: 'string',
                        description: 'User reset password token'
                    },
                    resetPasswordExpires:{
                        type: 'string',
                        description: 'User reset password expiration date'
                    },
                    createdAt:{
                        type: 'string',
                        description: 'User creation date'
                    },
                    updatedAt:{
                        type: 'string',
                        description: 'User update date'
                    },  
                }
            },
            Idea:{
                type: 'object',
                properties:{
                    id:{
                        type: 'string',
                        description: 'Idea id'
                    },
                    title:{
                        type: 'string',
                        description: 'Idea title'
                    },
                    description:{
                        type: 'string',
                        description: 'Idea description'
                    },
                    category:{
                        type: 'string',
                        description: 'Idea category'
                    },
                    creatorId:{
                        type: 'string',
                        description: 'Idea creator'
                    },
                    createdAt:{
                        type: 'string',
                        description: 'Idea creation date'
                    },
                    updatedAt:{
                        type: 'string',
                        description: 'Idea update date'
                    },
                    status:{
                        type: 'string',
                        description: 'Idea status',
                        enum: ['draft', 'submitted', 'funded']
                    },
                    resourcesRequired:{
                        type: 'array',
                        description: 'Idea resources'
                    },
                }
            } ,
            Evaluation:{
                type: 'object',
                properties:{
                    id:{
                        type: 'string',
                        description: 'Evaluation id'
                    },
                    evaluatorId:{
                        type: 'string',
                        description: 'Evaluator id'
                    },
                    ideaId:{
                        type: 'string',
                        description: 'Idea id'
                    },
                    feasibilityScore:{
                        type: 'number',
                        description: 'Evaluation score'
                    },
                    marketPotentialScore:{
                        type: 'number',
                        description: 'Evaluation score'
                    },
                    riskAssessment:{
                        type: 'number',
                        description: 'Evaluation score'
                    },
                    comments:{
                        type: 'string',
                        description: 'Evaluation comment'
                    },
                    createdAt:{
                        type: 'string',
                        description: 'Evaluation creation date'
                    },
                }
            },
            Prototype:{
                type: 'object',
                properties:{
                    id:{
                        type: 'string',
                        description: 'Prototype id'
                    },
                    ideaId:{
                        type: 'string',
                        description: 'Idea id'
                    },
                    prototypeUrl:{
                        type: 'string',
                        description: 'Prototype url'
                    },
                    developerId:{
                        type: 'string',
                        description: 'Developer id'
                    },
                    status:{
                        type: 'string',
                        description: 'Prototype status',
                        enum: ['in progress', 'completed']
                    },
                    createdAt:{
                        type: 'string',
                        description: 'Prototype creation date'
                    },
                }
            }

        }
    ],
    apis: ['src/routes/*.ts']
};

const swaggerDocs = swaggerJsDoc(options);

export {
    swaggerDocs,
    swaggerUi
}