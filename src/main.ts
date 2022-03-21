import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: "*" });
  app.setGlobalPrefix("api");
  const options = new DocumentBuilder()
    .setTitle("flutterwave test project ")
    .setDescription("")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
    const port = process.env.PORT || 3000;
  await app.listen(port); 
  console.info("app listening on port :" + port);
}
bootstrap();
