import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupModule } from './group/group.module'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), UserModule, GroupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
