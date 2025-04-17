import { ConflictException, Injectable } from '@nestjs/common'
import { UserRepository } from '../user.repository'
import { hash } from 'bcryptjs'

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepostiory: UserRepository) {}

  async execute(
    id: string | undefined,
    name: string,
    email: string,
    password: string,
  ) {
    const doesUserWithSameEmailAlreadyExists =
      await this.userRepostiory.findByEmail(email)

    if (doesUserWithSameEmailAlreadyExists) {
      throw new ConflictException('User with same email already exists.')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.userRepostiory.createUser({
      id,
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}
