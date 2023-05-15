#!/bin/bash
scp -i /home/kali/.ssh/id_rsa -r tech@172.28.5.1:/var/log/* /tmp/logs/
