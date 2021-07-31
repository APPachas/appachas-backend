import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import GroupFactory from '../../application/factory/group.factory'
import CreateGroupUseCase from '../../application/createGroup.useCase'
import FindGroupUseCase from '../../application/findGroup.useCase'
import UpdateGroupUseCase from '../../application/updateGroup.useCase'
import DeleteGroupUseCase from '../../application/deleteGroup.useCase'
import { GroupBodyDto } from './groupBody.dto'
import { GroupID } from '../../../../core/types'
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard'
import FindAllGroupsUseCase from '../../application/findAllGroups.useCase'

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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Res() res: Response, @Req() req: any, @Body() groupBody: GroupBodyDto) {
    const userId = req.user.id
    const group = this.groupFactory.create(groupBody, userId)
    const groupCreated = await this.createGroupUseCase.handler(group)
    return res.status(HttpStatus.CREATED).json(groupCreated)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res: Response, @Req() req: any) {
    const userId = req.user.id
    const groups = await this.findAllGroupsUseCase.handler(userId)
    return res.status(HttpStatus.OK).json(groups)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: GroupID) {
    const group = await this.findGroupUseCase.handler(id)
    if (group === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(group)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Res() res: Response, @Param('id') id: GroupID, @Body() groupBody: GroupBodyDto) {
    const group = this.groupFactory.create(groupBody)
    const GroupUpdated = await this.updateGroupUseCase.handler(id, group)
    if (GroupUpdated === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(GroupUpdated)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Res() res: Response, @Param('id') id: GroupID) {
    const group = await this.deleteGroupUseCase.handler(id)
    if (group === null) return res.status(HttpStatus.NOT_FOUND).send()
    return res.status(HttpStatus.OK).json(group)
  }
}
