import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { UserRepository } from 'src/modules/user/user.repository'

@Injectable()
export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwt: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const doesPasswordMatch = await compare(password, user.password)

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const accessToken = this.jwt.sign({ sub: user.id })
    return {
      access_token: accessToken,
    }
  }
}
