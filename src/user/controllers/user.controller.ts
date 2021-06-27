import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from '../services/user.service'
import { UserDocument } from '../schemas/user.schema'
import { ICreateUserDto } from '../dto/create-user.dto'
import { IUpdateUserDto } from '../dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Res() res: Response, @Body() createUserDto: ICreateUserDto) {
    const user: UserDocument = await this.userService.create(createUserDto)
    return res.status(HttpStatus.CREATED).json(user)
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll()
    return res.status(HttpStatus.OK).json(users)
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const user = await this.userService.findOne(id)
    return res.status(HttpStatus.OK).json(user)
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: IUpdateUserDto,
  ) {
    const user = await this.userService.update(id, updateUserDto)
    if (user === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(user)
  }

  @Delete(':id')
  async delete(@Res() res: Response, @Param('id') id: string) {
    const user = await this.userService.delete(id)
    if (user === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(user)
  }
}
