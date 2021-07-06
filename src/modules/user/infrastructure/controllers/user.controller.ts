import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { Response } from 'express'
import { UserBodyDto } from './userBody.dto'
import UserFactory from '../../application/factory/user.factory'
import CreateUserUseCase from '../../application/createUser.useCase'
import FindUserUseCase from '../../application/findUser.useCase'
import FindAllUsersUseCase from '../../application/findAllUsers.useCase'
import UpdateUserUseCase from '../../application/updateUser.useCase'
import DeleteUserUseCase from '../../application/deleteUser.useCase'

@Controller('users')
export class UserController {
  constructor(
    private userFactory: UserFactory,
    private createUserUseCase: CreateUserUseCase,
    private findUserUseCase: FindUserUseCase,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async createUser(@Res() res: Response, @Body() userBody: UserBodyDto) {
    const user = this.userFactory.createUser(userBody)
    const userCreated = await this.createUserUseCase.handler(user)
    return res.status(HttpStatus.CREATED).json(userCreated)
  }

  @Get()
  async findAllUsers(@Res() res: Response) {
    const users = await this.findAllUsersUseCase.handler()
    return res.status(HttpStatus.OK).json(users)
  }

  @Get(':id')
  async findUser(@Res() res: Response, @Param('id') id: string) {
    const user = await this.findUserUseCase.handler(id)
    if (user === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(user)
  }

  @Put(':id')
  async updateUser(@Res() res: Response, @Param('id') id: string, @Body() userBody: UserBodyDto) {
    const user = this.userFactory.createUser(userBody)
    const userUpdated = await this.updateUserUseCase.handler(id, user)
    if (userUpdated === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(userUpdated)
  }

  @Delete(':id')
  async deleteUser(@Res() res: Response, @Param('id') id: string) {
    const user = await this.deleteUserUseCase.handler(id)
    if (user === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(user)
  }
}
