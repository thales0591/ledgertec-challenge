import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserUseCase } from './use-cases/get-user.usecase'
import { JwtAuthGuard } from 'src/commons/guard/jwt-auth.guard'

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post('')
  async create(@Body() { id, name, email, password }: CreateUserDto) {
    return this.createUserUseCase.execute(id, name, email, password)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    const userId = req.user.sub

    return this.getUserUseCase.execute(userId)
  }
}
