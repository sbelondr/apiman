

all:
	./mvnw clean install -DskipTests -Pinstall-all-wildfly
	docker build -t="aosc/apiman:2.2.3.Final" --rm .
	#docker run -it -p 8443:8443 -p 9990:9990 -p 8787:8787 -p 8080:8080 aosc/apiman:2.2.3.Final