import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env'
import { UsersModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { DocumentModule } from './modules/documents/document.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    DocumentModule,
  ],
  controllers: [],
  providers: [PrismaService, JwtModule],
})
export class AppModule {}
