import { UserID } from '../../../../core/types'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  public getCookieWithJwtToken(userId: UserID) {
    const payload: TokenPayload = { userId }
    const token = this.jwtService.sign(payload)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=3600`
  }
}
