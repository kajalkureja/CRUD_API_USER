import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { userProviders } from './user.providers';
import { UsersService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule { }