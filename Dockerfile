# Use a base image with OpenJDK
FROM openjdk:22-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY build/libs/todo-web-mini-project-002-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port the app runs on
EXPOSE 8084

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]