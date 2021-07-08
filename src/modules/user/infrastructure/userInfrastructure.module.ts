import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { UserApplicationModule } from '../application/userApplication.module'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './repository/schemas/user.schema'
import { UserController } from './controllers/user.controller'
import { encryptPasswordMiddleware } from './middlewares/encryptPassword.middleware'

@Module({
  imports: [
    UserApplicationModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController],
})
export class UserInfrastructureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(encryptPasswordMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST })
  }
}
