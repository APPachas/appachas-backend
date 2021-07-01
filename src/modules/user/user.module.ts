import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './infrastructure/schemas/user.schema'
import { UserController } from './infrastructure/controllers/user.controller'
import { UserService } from './infrastructure/services/user.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
