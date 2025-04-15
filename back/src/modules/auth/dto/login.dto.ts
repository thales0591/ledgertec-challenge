import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsEmail({}, { message: 'O e-mail informado é inválido.' })
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
