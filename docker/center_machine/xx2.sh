#!/bin/bash
scp -i /home/kali/.ssh/id_rsa -r jack@172.28.5.2:/var/log/* /tmp/honeypot2/logs/
scp -i /home/kali/.ssh/id_rsa -r jack@172.28.5.2:/opt/tomcat/apache-tomcat-9.0.52/logs/* /tmp/honeypot2/tomcatlogs/
