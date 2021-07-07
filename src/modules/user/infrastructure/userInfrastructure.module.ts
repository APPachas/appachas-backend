import { Module } from '@nestjs/common'
import { UserApplicationModule } from '../application/userApplication.module'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './repository/schemas/user.schema'
import { UserController } from './controllers/user.controller'

@Module({
  imports: [
    UserApplicationModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
})
export class UserInfrastructureModule {}
