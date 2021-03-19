import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
      );
    // const app = await NestFactory.create(AppModule);
    app.useStaticAssets(join(__dirname, '../server', 'public'));
    app.setBaseViewsDir(join(__dirname, '../server', 'views'));

    app.setViewEngine('hbs');

    app.enableCors();

    await app.listen(8000);
}
bootstrap();
