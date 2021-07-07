import { UserDto } from '../repository/schemas/user.schema'
import User from '../../domain/users'

export default class UserMapper {
  public static toDomain(userEntity: UserDto): User {
    return new User(
      userEntity.name,
      userEntity.email,
      userEntity.password,
      userEntity.groups,
      userEntity.id,
    )
  }

  static toDomains(usersEntity: UserDto[]): User[] {
    const users = new Array<User>()
    usersEntity.forEach(userEntity => {
      const user = this.toDomain(userEntity)
      users.push(user)
    })
    return users
  }
}
