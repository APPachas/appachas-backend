import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { UserBodyDto } from './userBody.dto'
import UserFactory from '../../application/factory/user.factory'
import CreateUserUseCase from '../../application/createUser.useCase'
import FindUserUseCase from '../../application/findUser.useCase'
import FindAllUsersUseCase from '../../application/findAllUsers.useCase'
import UpdateUserUseCase from '../../application/updateUser.useCase'
import DeleteUserUseCase from '../../application/deleteUser.useCase'
import { GroupID, UserID } from '../../../../core/types'
import FindAllUsersByGroupUseCase from '../../application/findAllUsersByGroup.useCase'

@Controller('users')
export class UserController {
  constructor(
    private userFactory: UserFactory,
    private createUserUseCase: CreateUserUseCase,
    private findUserUseCase: FindUserUseCase,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private findAllUsersByGroupUseCase: FindAllUsersByGroupUseCase,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() userBody: UserBodyDto) {
    const user = this.userFactory.create(userBody)
    const userCreated = await this.createUserUseCase.handler(user)
    return res.status(HttpStatus.CREATED).json(userCreated)
  }

  @Get()
  async findAll(@Res() res: Response, @Query('group') group: GroupID) {
    const users = group
      ? await this.findAllUsersByGroupUseCase.handler(group)
      : await this.findAllUsersUseCase.handler()
    return res.status(HttpStatus.OK).json(users)
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: UserID) {
    const user = await this.findUserUseCase.handler(id)
    if (user === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(user)
  }

  @Put(':id')
  async update(@Res() res: Response, @Param('id') id: UserID, @Body() userBody: UserBodyDto) {
    const user = this.userFactory.create(userBody)
    const userUpdated = await this.updateUserUseCase.handler(id, user)
    if (userUpdated === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(userUpdated)
  }

  @Delete(':id')
  async delete(@Res() res: Response, @Param('id') id: UserID) {
    const user = await this.deleteUserUseCase.handler(id)
    if (user === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(user)
  }
}
