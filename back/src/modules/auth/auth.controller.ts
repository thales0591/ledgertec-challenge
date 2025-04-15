import { Body, Controller, Post } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { LoginUseCase } from './use-cases/login.usecase'

@Controller('auth')
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return this.loginUseCase.execute(email, password)
  }
}
