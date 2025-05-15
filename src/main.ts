import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
// somewhere in your initialization file

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    // app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    const config = new DocumentBuilder()
      .setTitle("Skidkachi project")
      .setDescription("Skidkachi REST API")
      .setVersion("1.0")
      .addTag("Nestjs", "Validation")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    app.use(cookieParser());
    await app.listen(PORT, () => {
      console.log(`sercewgffdsf ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
