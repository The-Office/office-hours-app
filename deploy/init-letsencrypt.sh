#!/bin/bash

mkdir -p certbot/conf certbot/www

domains=(synchrohnize.me www.synchrohnize.me)
email="synchrohnize@gmail.com"
staging=0

docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:2048 -days 1\
    -keyout '/etc/letsencrypt/live/synchrohnize.me/privkey.pem' \
    -out '/etc/letsencrypt/live/synchrohnize.me/fullchain.pem' \
    -subj '/CN=localhost'" certbot

docker compose up --force-recreate -d nginx

for domain in "${domains[@]}"; do
  docker compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      --email $email \
      -d $domain \
      --rsa-key-size 4096 \
      --agree-tos \
      --no-eff-email \
      --force-renewal" certbot
done

docker compose exec nginx nginx -s reload