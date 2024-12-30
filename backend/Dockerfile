FROM openjdk:21-jdk-slim
# Копируем jar-файл приложения в контейнер
COPY backend/target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar
# Определяем команду для запуска
ENTRYPOINT ["java", "-jar", "/app/backend.jar"]
# Открываем порт для приложения
EXPOSE 8080
