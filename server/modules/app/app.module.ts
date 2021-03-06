
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../../common/middleware/logger.middleware';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { APP_GUARD } from '@nestjs/core';
import { ItemsModule } from '../items/items.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [AppModule, ItemsModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/node-starter-app'), AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(AppController);
    }
}

// export class AppModule {}
