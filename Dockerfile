# Use WildFly image as the base
ARG WILDFLY_VERSION=23.0.2.Final
FROM quay.io/wildfly/wildfly:${WILDFLY_VERSION}

EXPOSE 8080 8443 8787

ARG APIMAN_VERSION=2.2.3.Final

#RUN cd /opt/jboss/wildfly \
# && curl -L https://github.com/Apiman/apiman/releases/download/$APIMAN_VERSION/apiman-distro-wildfly-$APIMAN_VERSION-overlay.zip | bsdtar -xvf-

COPY ./tools/server-all/target/wildfly-dev-server/apiman     /opt/jboss/wildfly/apiman
COPY ./tools/server-all/target/wildfly-dev-server/bin        /opt/jboss/wildfly/bin
COPY ./tools/server-all/target/wildfly-dev-server/modules    /opt/jboss/wildfly/modules
COPY ./tools/server-all/target/wildfly-dev-server/standalone /opt/jboss/wildfly/standalone
COPY ./tools/server-all/target/wildfly-dev-server/themes     /opt/jboss/wildfly/themes
#COPY ./apiman-2.2.3.Final/tools/server-all/target/wildfly-dev-server/standalone/configuration/standalone-apiman.xml /. 

USER root

RUN chown -R jboss:0 ${JBOSS_HOME} \
 && chmod -R g+rw ${JBOSS_HOME}

USER jboss

RUN $JBOSS_HOME/bin/add-user.sh admin admin123! --silent

# Set the default command to run on boot
ENTRYPOINT ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-c", "standalone-apiman.xml", "--debug"]
#ENTRYPOINT [ "sh" ]