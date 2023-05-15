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

COPY vsftpd.conf /etc/vsftpd.conf
RUN cp /etc/vsftpd.conf /etc/vsftpd.conf_default

# user operations
RUN adduser susan --disabled-password
RUN echo 'susan:onion' | chpasswd
RUN echo 'root:toor' | chpasswd

RUN usermod -aG sudo susan


# copying web content
RUN mkdir /var/www/html/files
COPY web_template.zip /
RUN unzip web_template.zip -d /var/www/html/files/
RUN rm web_template.zip


COPY start.sh /
RUN chmod +x start.sh

# USER susan

ENTRYPOINT /start.sh

