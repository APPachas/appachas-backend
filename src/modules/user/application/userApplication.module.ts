import { Module } from '@nestjs/common'
import { UserDomainModule } from '../domain/userDomain.module'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../infrastructure/repository/schemas/user.schema'
import UserFactory from './factory/user.factory'
import CreateUserUseCase from './createUser.useCase'
import FindUserUseCase from './findUser.useCase'
import FindAllUsersUseCase from './findAllUsers.useCase'
import UpdateUserUseCase from './updateUser.useCase'
import DeleteUserUseCase from './deleteUser.useCase'
import { USER_REPOSITORY } from '../../../core/types'
import UserRepositoryMongo from '../infrastructure/repository/user.repository.mongo'
import FindAllUsersByGroupUseCase from './findAllUsersByGroup.useCase'

@Module({
  imports: [
    UserDomainModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    UserFactory,
    CreateUserUseCase,
    FindUserUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindAllUsersByGroupUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryMongo,
    },
  ],
  exports: [
    UserFactory,
    CreateUserUseCase,
    FindUserUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindAllUsersByGroupUseCase,
  ],
})
export class UserApplicationModule {}