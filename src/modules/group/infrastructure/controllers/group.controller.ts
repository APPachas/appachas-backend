import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
import { Response } from 'express'
import GroupFactory from '../../application/factory/group.factory'
import CreateGroupUseCase from '../../application/createGroup.useCase'
import FindGroupUseCase from '../../application/findGroup.useCase'
import FindAllGroupsUseCase from '../../application/findAllGroups.useCase'
import UpdateGroupUseCase from '../../application/updateGroup.useCase'
import DeleteGroupUseCase from '../../application/deleteGroup.useCase'
import { GroupBodyDto } from './groupBody.dto'
import { GroupID } from '../../../../core/types'

@Controller('groups')
export class GroupController {
  constructor(
    private groupFactory: GroupFactory,
    private createGroupUseCase: CreateGroupUseCase,
    private findGroupUseCase: FindGroupUseCase,
    private findAllGroupsUseCase: FindAllGroupsUseCase,
    private updateGroupUseCase: UpdateGroupUseCase,
    private deleteGroupUseCase: DeleteGroupUseCase,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() groupBody: GroupBodyDto) {
    const group = this.groupFactory.create(groupBody)
    const groupCreated = await this.createGroupUseCase.handler(group)
    return res.status(HttpStatus.CREATED).json(groupCreated)
  }

  @Get()
  async findAll(@Res() res: Response) {
    const groups = await this.findAllGroupsUseCase.handler()
    return res.status(HttpStatus.OK).json(groups)
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: GroupID) {
    const group = await this.findGroupUseCase.handler(id)
    if (group === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(group)
  }

  @Put(':id')
  async update(@Res() res: Response, @Param('id') id: GroupID, @Body() groupBody: GroupBodyDto) {
    const group = this.groupFactory.create(groupBody)
    const GroupUpdated = await this.updateGroupUseCase.handler(id, group)
    if (GroupUpdated === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(GroupUpdated)
  }

  @Delete(':id')
  async delete(@Res() res: Response, @Param('id') id: GroupID) {
    const group = await this.deleteGroupUseCase.handler(id)
    if (group === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(group)
  }
}
