#!/bin/bash

service ssh start 
service sshd start
service rsyslog start


/opt/tomcat/apache-tomcat-9.0.52/bin/startup.sh

bash