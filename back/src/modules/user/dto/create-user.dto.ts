import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  id?: string

  @IsString()
  name: string

  @IsString()
  @IsEmail({}, { message: 'O e-mail informado é inválido.' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio.' })
  email: string

  @IsString({ message: 'A senha deve ser uma string.' })
  @Min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  password: string
}
