
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { MongooseModule } from '@nestjs/mongoose';
// import { CatsController } from './cats.controller';
// import { CatsModule } from './cats.module';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { APP_GUARD } from '@nestjs/core';

@Module({
    // imports: [AppModule, CatsModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/niki-test'), AuthModule, UsersModule],
    imports: [AppModule],
    controllers: [AppController],
    providers: [AppService],
})
// export class AppModule implements NestModule {
//     configure(consumer: MiddlewareConsumer): any {
//         consumer
//             .apply(LoggerMiddleware)
//             .forRoutes(AppController);
//     }
// }

export class AppModule {}
