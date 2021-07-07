import { Injectable } from '@nestjs/common'
import User from '../../domain/users'
import { UserBodyDto } from '../../infrastructure/controllers/userBody.dto'

@Injectable()
export default class UserFactory {
  public create(user: UserBodyDto): User {
    return new User(user.name, user.email, user.password, user.groups)
  }
}
