import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('')
  async create(@Body() { id, name, email, password }: CreateUserDto) {
    return this.createUserUseCase.execute(id, name, email, password)
  }
}
