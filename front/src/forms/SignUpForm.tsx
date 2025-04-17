import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NavLink } from 'react-router-dom'
import { registerSchema } from '@/schemas/register-schema'

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  })

  function onSubmit(data: z.infer<typeof registerSchema>) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full items-center flex justify-center"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight">
            Sign-up
          </CardTitle>
          <CardDescription>Create your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">E-mail</Label>
            <Input id="name" placeholder="Your name" {...register('name')} />
            {errors.name?.message && (
              <span className="text-sm text-destructive">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              placeholder="example@gmail.com"
              {...register('email')}
            />
            {errors.email?.message && (
              <span className="text-sm text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Your password here"
              type="password"
              {...register('password')}
            />
            {errors.password?.message && (
              <span className="text-sm text-destructive">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="my-5 flex flex-col gap-2">
            <CardDescription>
              Already have an account? Sign-in{' '}
              <NavLink to={'/sign-in'} className="font-medium">
                here.
              </NavLink>
            </CardDescription>
          </div>
          <Button type="submit" className="w-full">
            Log-in
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
