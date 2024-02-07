// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ".env",
      }
      )],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        entities : [__dirname + '/**/*.entity{.ts,.js}'],
        logging : true,
        
      }),
      
      inject: [ConfigService],
    }),
    UsersModule,
    TaskModule,
    AuthModule,  

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
