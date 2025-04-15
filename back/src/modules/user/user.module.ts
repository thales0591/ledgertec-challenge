import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { UserRepostiory } from './user.repository'

@Module({
  controllers: [UserController],
  providers: [CreateUserUseCase, UserRepostiory],
})
export class UsersModule {}
