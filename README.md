# SchoolText

A schooltext QA program without a cool name. (Cool name coming soon).

# Quickstart

1. Clone the repo: `git clone git@gitlab.com:kazanz/schooltext.git`.
2. Install the reqs: `pip install -r reqs/dev.txt`.


# Proof of Concept

This project is a proof of concept and has very bad code organization decision.
We will deploy this for now and get an idea of how the project will work before
refactoring.


# For Production

iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
