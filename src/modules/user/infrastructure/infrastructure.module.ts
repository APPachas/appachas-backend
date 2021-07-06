import { Module } from '@nestjs/common'
import { ApplicationModule } from '../application/application.module'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './repository/schemas/user.schema'
import { UserController } from './controllers/user.controller'

@Module({
  imports: [ApplicationModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
})
export class InfrastructureModule {}
