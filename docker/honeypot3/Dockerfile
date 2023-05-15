FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install openssh-client openssh-server -y
RUN apt-get install sudo wget nano -y


RUN apt-get install mysql-server -y
RUN apt-get install apache2 -y 
RUN apt-get install zip -y

RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:ondrej/php -y
RUN apt-get update -y
RUN apt-get install php7.0 -y

# user operations
RUN adduser susan --disabled-password
RUN echo 'susan:onion' | chpasswd
RUN echo 'root:toor' | chpasswd

# copying configuration files
COPY file.zip /
RUN unzip -o file.zip -d /var/www/html/
RUN rm file.zip



COPY start.sh /
RUN chmod +x start.sh

EXPOSE 4444
EXPOSE 80
ENTRYPOINT /start.sh