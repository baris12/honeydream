#!/bin/bash
scp -i /root/.ssh/id_rsa -r susan@172.28.5.1:/var/log/* /tmp/honeypot1/
