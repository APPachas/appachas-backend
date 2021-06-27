import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { Response } from 'express'
import { GroupService } from '../services/group.service'
import { ICreateGroupDto } from '../dto/create-group.dto'
import { GroupDocument } from '../schemas/group.schema'
import { IUpdateGroupDto } from '../dto/update-group.dto'

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  async create(@Res() res: Response, @Body() createGroupDto: ICreateGroupDto) {
    const group: GroupDocument = await this.groupService.create(createGroupDto)
    return res.status(HttpStatus.CREATED).json(group)
  }

  @Get()
  async findAll(@Res() res: Response) {
    const groups = await this.groupService.findAll()
    return res.status(HttpStatus.OK).json(groups)
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const group = await this.groupService.findOne(id)
    if (group === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(group)
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateGroupDto: IUpdateGroupDto,
  ) {
    const group = await this.groupService.update(id, updateGroupDto)
    if (group === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(group)
  }

  @Delete(':id')
  async delete(@Res() res: Response, @Param('id') id: string) {
    const group = await this.groupService.delete(id)
    if (group === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(group)
  }
}
