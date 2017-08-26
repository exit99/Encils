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

1. `git archive -v -o api-$(git rev-parse --short HEAD).zip --format=zip HEAD --worktree-attributes`.
2. Upload a new version in the ElasticBeanstalk console.  There may be a way to do it with git: 
http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-cli-git.html


### Rebuilding EC2 Container

Not sure how to do this yet.

