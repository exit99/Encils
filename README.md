# Encils

## Quickstart

1. Clone the repo: `git clone git@gitlab.com:kazanz/schooltext.git`.
2. Install the reqs: `pip install -r reqs/dev.txt`.


## Proof of Concept

This project is a proof of concept and has very bad code organization decision.
We will deploy this for now and get an idea of how the project will work before
refactoring.

## Dev

to test webhooks you must update the phone number webhook in nexmo to match
the forwarding url provided by `ngrok http 8000`. (8000 to match the port 
running the django API).

The webhooks needs to link to the ngrok url `NGROKHASH.ngrok.io/receive`.

## For Production

# Deployment

You will need to `pip install awscli` (version 1.11.140).

## Homepage

`cd homepage && aws s3 sync build/ s3://homepage.encils`

## Dashboard

`cd encils && yarn build && aws s3 sync build/ s3://dashboard.encils`

## API

### Settings

1. `cd api/schooltext_api && cp prod_settings.py.example prod_settings.py` and fill it with password data.

### Authing ECR

1. Retrieve the docker login command that you can use to authenticate your Docker client to your registry: 
Note: 
If you receive an "Unknown options: --no-include-email" error, install the latest version of the AWS CLI. Learn more

`aws ecr get-login --no-include-email --region us-east-1`

2. Run the docker login command that was returned in the previous step. 

### Push to registry

1. `docker build -t encils .`
2. `docker tag encils:latest 795102151300.dkr.ecr.us-east-1.amazonaws.com/encils:latest`
3. `docker push 795102151300.dkr.ecr.us-east-1.amazonaws.com/encils:latest`

[More info here](https://console.aws.amazon.com/ecs/home?region=us-east-1#/repositories/create/new).

### Rebuilding EC2 Container

Not sure how to do this yet.

