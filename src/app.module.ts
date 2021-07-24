import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { GroupModule } from './modules/group/group.module'
import { ExpenseModule } from './modules/expense/expense.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    UserModule,
    GroupModule,
    ExpenseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
