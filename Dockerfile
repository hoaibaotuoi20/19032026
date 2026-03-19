# Bước 1: Build source code sử dụng Maven block
FROM maven:3.9.6-eclipse-temurin-21-jammy AS build
WORKDIR /app

# Copy pom.xml và tải trước các dependency (giúp cache lại các thứ này, build lần sau sẽ cực nhanh)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy toàn bộ code vào và build (bỏ qua bước chạy unit test)
COPY src ./src
RUN mvn clean package -DskipTests

# Bước 2: Chạy ứng dụng từ JRE tối giản nhằm giảm nhẹ dung lượng image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy thành phẩm (file .jar) từ "build" stage sang đây
COPY --from=build /app/target/*.jar app.jar

# Công bố cổng 8080 (cổng mặc định của Spring Boot)
EXPOSE 8080

# Câu lệnh cuối cùng khi container chạy (chạy file .jar)
ENTRYPOINT ["java", "-jar", "app.jar"]
