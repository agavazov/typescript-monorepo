# TypeScript Monorepo

This is a monorepo setup using TypeScript, Lerna, ESlint, Docker Compose, and Concurrently. The root directory contains the configuration files for all the sub-packages, while each sub-package has its own configuration for `start`, `build`, `test`, and `lint` scripts.

## Demo URLs
_The URLs/services are not planned for long term support, so I apologize if they don't work_

- API (AWS Beanstalk): http://monorepo-demo-api.eu-central-1.elasticbeanstalk.com/
- Client (AWS S3): http://monorepo-demo-client-bucket.s3-website.eu-central-1.amazonaws.com/

---

## Installation

Before starting, make sure you have installed:

- Node.js (version specified in `.nvmrc`).
- Docker Compose.

After cloning the repository, run `npm install` in the root directory to install all the dependencies for the entire monorepo.

---

## Usage

### Running Locally

To run all the sub-packages locally, use the command `npm run start` in the root directory. This command starts all the packages using `concurrently`, which enables running multiple commands concurrently. By default, this command will start all packages in development mode.

### Building

To build all the packages, run `npm run build` in the root directory. This command builds all the packages using their respective `build` scripts.

### Testing

To run tests for all the packages, use the command `npm run test` in the root directory. This command runs all the packages' `test` scripts.

### Linting

To lint all the packages, use the command `npm run lint` in the root directory. This command runs all the packages' `lint` scripts.

### Docker Compose

To run the monorepo using Docker Compose, use the command `docker-compose up` in the root directory. This command starts all the packages in Docker containers.

## Sub-Packages

The following are the sub-packages included in this monorepo:

- [api](./packages/api) - ExpressJS TypeScript API server
- [client](./packages/client) React Client

Each sub-package has its own configuration for `start`, `build`, `test` scripts.

### GitHub Actions

There is an automated pipeline script that tests, builds, and deploys all packages (front-end, back-end, etc.) to AWS

---

## Docker Build

To start the project in containers run:
1. `docker compose build` 
2. `docker compose up` 

---

# Deploy on AWS

## S3 Bucket

Amazon S3 (Simple Storage Service) provides a simple and cost-effective way to store and retrieve data from the internet. When hosting a built React app, you can use an S3 bucket to store all of your static files, such as HTML, CSS, and JavaScript.

After you create the bucket be sure that you don't forget to make it with public access.
Just unblock the public access (by default is blocked) and put this bucket policy JSON code:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME_HERE",
        "arn:aws:s3:::YOUR_BUCKET_NAME_HERE/*"
      ]
    }
  ]
}
```

# GitHub Actions

GitHub Actions is a tool for automating workflows in your software development projects, allowing you to automate tasks such as building, testing, and deploying your code based on events or triggers. It's defined in YAML files and can integrate with third-party services.

## [Pipeline Script - .github/workflows/main.yml](.github/workflows/main.yml)

To make it work you need to define these `secrets` and `variables` in you GitHub repo:

**Secrets**
- `AWS_ACCESS_KEY_ID` _AKI**************KU6_ 
- `AWS_SECRET_ACCESS_KEY` _AZq***********************************aK_

**Variables**
- `AWS_BS_APPLICATION` _monorepo-demo_
- `AWS_BS_ENVIRONMENT` _Monorepo-demo-api_
- `AWS_REGION` _eu-central-1_
- `AWS_S3_BUCKET` _monorepo-demo-client-bucket_

## Variables & Secrets

Go to `Repository Settings` → `Secrets and variables` → `Actions` → `New repository secret` and then define the required **secrets** and **variables**. 

 _Please check [deploy.yml](.github/workflows/main.yml) for more variables & secrets!_
