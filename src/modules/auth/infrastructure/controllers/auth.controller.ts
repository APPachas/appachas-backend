import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { SignInBodyDto } from '../loginBody.dto'
import FindUserByEmailUseCase from '../../../user/application/findUserByEmail.useCase'
import ComparePasswordUseCase from '../../application/comparePassword.useCase'
import { AuthenticationService } from '../services/authentication.service'

@Controller('/auth')
export default class AuthController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly comparePasswordUseCase: ComparePasswordUseCase,
  ) {}

  @Post()
  async signIn(@Res() response, @Body() signInBodyDto: SignInBodyDto) {
    const user = await this.findUserByEmailUseCase.handler(signInBodyDto.email)
    if (user === null) {
      return response.status(HttpStatus.FORBIDDEN).send()
    }
    const isValidPassword = await this.comparePasswordUseCase.handler(user, signInBodyDto.password)
    if (isValidPassword) {
      const cookie = this.authenticationService.getCookieWithJwtToken(user.id)
      response.setHeader('Set-Cookie', cookie)
      return response.status(HttpStatus.OK).send()
    }
    return response.status(HttpStatus.FORBIDDEN).send()
  }

  @Post('/new-user')
  signUp() {}
}
