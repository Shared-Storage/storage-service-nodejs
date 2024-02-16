# SSTORAGE-STORAGE-SERVICE

## Environment
- Node version: 18.19.0
- NPM version: 10.2.3

## Setting up environment variables
Take reference from .env.example file.
- Create .env.local.dev and .env.local.staging for development.
- Create .env.deploy.production and .env.deploy.staging for serverless deployments.

### In my case databases, env files and scripts have following relations
- MongoDB atlas production database:
    - .env.deploy.production (`npm run serverless-deploy-production`)
- MongoDB atlas staging database:
    - .env.deploy.staging (`npm run serverless-deploy-staging`)
    - .env.local.staging (`npm start`)
- MongoDB local server:
    - .env.local.dev (`npm run dev`)

## To run the app
Run `$ npm run dev` to run the app in development for local mongodb server.
Run `$ npm start` to run the app in development for staging mongodb server in mongodb atlas.

## To deploy the app (Deployed on AWS Lambda)
Make sure **serverless** is installed `npm i -g serverless` and configured `serverless config credentials --provider aws --key <Key> --secret <Secret>`

To generate keys you can refer here https://www.youtube.com/watch?v=D5_FHbdsjRc

### For staging deployment
`npm run serverless-deploy-staging`

### For staging production
`npm run serverless-deploy-production`

## To test if app is up in development or deployment
In browser run the following: `http://<server_link>/v0/working`