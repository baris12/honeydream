#!/bin/bash

service cron start

ssh-keygen -q -t rsa -b 4096 -N "" -f /root/.ssh/id_rsa
echo "$SSH_PASSWORD" | sshpass -p "$SSH_PASSWORD" ssh-copy-id -o StrictHostKeyChecking=accept-new -i /root/.ssh/id_rsa.pub susan@172.28.5.1
echo "$SSH_PASSWORD" | sshpass -p "$SSH_PASSWORD" ssh-copy-id -o StrictHostKeyChecking=accept-new -i /root/.ssh/id_rsa.pub baris@172.28.5.2
echo "$SSH_PASSWORD" | sshpass -p "$SSH_PASSWORD" ssh-copy-id -o StrictHostKeyChecking=accept-new -i /root/.ssh/id_rsa.pub cagatay@172.28.5.3


/bin/bash