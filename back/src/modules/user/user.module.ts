import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { UserRepository } from './user.repository'
import { GetUserUseCase } from './use-cases/get-user.usecase'

@Module({
  controllers: [UserController],
  providers: [CreateUserUseCase, UserRepository, GetUserUseCase],
})
export class UsersModule {}
