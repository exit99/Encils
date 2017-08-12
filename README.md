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

### Deployment

Make sure that `config.js` is using the correct IP/domain. (not localhost or 127.0.0.1).
run `npm run build` from the `frontend` folder.

`pm2 restart next`
`/usr/bin/python3 /usr/local/bin/daphne -b 0.0.0.0 -p 8000 schooltext_api.asgi:channel_layer`. I think this restarts the daphne server.  
`iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000`
