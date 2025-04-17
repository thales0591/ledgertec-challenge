import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser({ id, name, email, password }: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        id,
        name,
        email,
        password,
      },
    })
  }

  async findById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
  }
}
