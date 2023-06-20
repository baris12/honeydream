FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive
ENV SSH_PASSWORD onion

RUN apt-get update
RUN apt-get install -y \
    cron \
    openssh-client \
    openssh-server \
    sudo \
    wget \
    nano \
    zip \
    sshpass \
    ftp

# copying the scripts for cron job
COPY xx.sh /usr/bin/xx.sh
RUN chmod +x /usr/bin/xx.sh

COPY xx2.sh /usr/bin/xx2.sh
RUN chmod +x /usr/bin/xx2.sh

COPY xx3.sh /usr/bin/xx3.sh
RUN chmod +x /usr/bin/xx3.sh

#
COPY start.sh /
RUN chmod +x start.sh


ENTRYPOINT /start.sh