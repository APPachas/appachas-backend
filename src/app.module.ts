import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupModule } from './modules/group/group.module'
import { ExpenseModule } from './modules/expense/expense.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://appachas:tfmcice21@cluster0.pt6f2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    UserModule,
    GroupModule,
    ExpenseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
