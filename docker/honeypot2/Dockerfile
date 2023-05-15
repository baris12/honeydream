FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install openssh-client openssh-server -y
RUN apt-get install sudo wget nano -y

# installing jdk
RUN apt install default-jdk -y

# installing tomcat 9.0.52
RUN mkdir /opt/tomcat
WORKDIR /opt/tomcat
RUN wget https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.52/bin/apache-tomcat-9.0.52.tar.gz
RUN tar -xf apache-tomcat-9.0.52.tar.gz
RUN chown -Rv $USER:$USER apache-tomcat-9.0.52
RUN chmod -Rv 755 apache-tomcat-9.0.52
RUN rm apache-tomcat-9.0.52.tar.gz

# copying tomcat logs
COPY tomcatlogs/* apache-tomcat-9.0.52/logs/
WORKDIR /

# installing syslog
RUN apt install rsyslog -y
RUN echo "auth,authpriv.* /var/log/auth.log" | sudo tee -a /etc/rsyslog.conf

# user operations
RUN adduser thales --disabled-password
RUN echo 'thales:vodka06' | chpasswd
RUN echo 'root:toor' | chpasswd

# copying configuration files
COPY files.tar /
RUN tar -xvf /files.tar
RUN rm files.tar

# copying web content
RUN apt-get install zip -y
WORKDIR /opt/tomcat/apache-tomcat-9.0.52/webapps/ROOT/
COPY web_template.zip /opt/tomcat/apache-tomcat-9.0.52/webapps/ROOT/
RUN unzip web_template.zip
RUN rm web_template.zip
WORKDIR /

COPY start.sh /
RUN chmod +x start.sh

ENTRYPOINT /start.sh