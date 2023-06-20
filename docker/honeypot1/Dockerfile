FROM ubuntu:18.04

EXPOSE 80
EXPOSE 21

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install openssh-client openssh-server -y
RUN apt-get install sudo wget nano -y

#installing ftp
RUN apt-get install -y ssh
RUN apt-get install -y vsftpd
RUN apt-get install -y apache2
RUN apt-get install php -y 
RUN apt-get install zip -y
RUN apt-get install ftp -y


# user operations
RUN adduser susan --disabled-password
RUN echo 'susan:onion' | chpasswd
RUN echo 'root:toor' | chpasswd

RUN usermod -aG sudo susan


# copying web content
RUN mkdir /var/www/html/files
COPY web_template.zip /
RUN rm /var/www/html/index.html
RUN unzip web_template.zip -d /var/www/html/
RUN rm web_template.zip

# file permissions
RUN chmod 777 /var/www/html/*
RUN chmod 755 /var/log/*
RUN chmod 755 /var/log/apache2/*

# copying the vsftp configuration
COPY vsftpd.conf /etc/vsftpd.conf

COPY start.sh /
RUN chmod +x start.sh

# USER susan

ENTRYPOINT /start.sh

