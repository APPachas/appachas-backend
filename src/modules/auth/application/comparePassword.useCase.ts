import { Injectable } from '@nestjs/common'
import User from '../../user/domain/users'
import * as bcrypt from 'bcrypt'

@Injectable()
export default class ComparePasswordUseCase {
  public async handler(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password)
  }
}
