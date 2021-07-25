import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { SignInBodyDto } from '../loginBody.dto'
import FindUserByEmailUseCase from '../../../user/application/findUserByEmail.useCase'
import ComparePasswordUseCase from '../../application/comparePassword.useCase'
import { JwtService } from '@nestjs/jwt'

@Controller('/auth')
export default class AuthController {
  constructor(
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly comparePasswordUseCase: ComparePasswordUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async signIn(@Res() request, @Body() signInBodyDto: SignInBodyDto) {
    const user = await this.findUserByEmailUseCase.handler(signInBodyDto.email)
    const isValidPassword = await this.comparePasswordUseCase.handler(user, signInBodyDto.password)
    console.log(process.env.JWT_SECRET)
    if (isValidPassword) {
      const payload = { username: user.email, id: user.id }
      const token = { access_token: this.jwtService.sign(payload) }
      return request.status(HttpStatus.OK).json(token)
    }
    return request.status(HttpStatus.FORBIDDEN).send()
  }

  @Post('/new-user')
  signUp() {}
}
