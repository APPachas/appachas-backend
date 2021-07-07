import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './infrastructure/repository/schemas/user.schema'
import { UserController } from './infrastructure/controllers/user.controller'
import { UserDomainModule } from './domain/userDomain.module'
import { UserApplicationModule } from './application/userApplication.module'
import { UserInfrastructureModule } from './infrastructure/userInfrastructure.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserDomainModule,
    UserApplicationModule,
    UserInfrastructureModule,
  ],
  controllers: [UserController],
  providers: [],
  exports: [UserApplicationModule],
})
export class UserModule {}
