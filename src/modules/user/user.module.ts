import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './infrastructure/repository/schemas/user.schema'
import { UserController } from './infrastructure/controllers/user.controller'
import { DomainModule } from './domain/domain.module'
import { ApplicationModule } from './application/application.module'
import { InfrastructureModule } from './infrastructure/infrastructure.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
