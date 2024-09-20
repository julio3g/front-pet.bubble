'use client'

import { authentication } from '@/actions/authentication'
import { LogoLarge } from '@/assets/logo-large'
import { LeftAuthPage } from '@/components/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const authenticationFormSchema = z.object({
  username: z
    .string()
    .min(1, 'O nome de usuário deve ter no mínimo 1 caractere'),
  password: z.string().min(1, 'A senha deve ter no mínimo 1 caractere'),
})

export type AuthenticationFormData = z.infer<typeof authenticationFormSchema>

export default function Login() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null) // Estado para armazenar o erro do servidor
  const form = useForm<AuthenticationFormData>({
    resolver: zodResolver(authenticationFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const {
    formState: { isSubmitting },
    reset,
  } = form

  async function onSubmit(data: AuthenticationFormData) {
    setServerError(null)
    try {
      await authentication(data)
      reset()
      router.push('/')
    } catch (error: any) {
      setServerError(error.message)
    }
  }

  return (
    <div className="container relative flex h-screen w-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Button className="absolute right-4 top-4 md:right-8 md:top-8" asChild>
        <Link href="/auth/create-account">Cadastrar-se</Link>
      </Button>
      <Link
        href="/"
        className="absolute left-4 top-4 z-20 md:right-8 md:top-8 lg:hidden"
      >
        <LogoLarge />
      </Link>
      <LeftAuthPage />
      <div className="lg:p-8">
        <Card className="mx-auto w-full sm:max-w-md sm:w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Acesse sua conta</CardTitle>
            <CardDescription>Que bom te ver novamente!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {serverError && <p className="text-red-500">{serverError}</p>}
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link href="/auth/lost-password">Esqueci minha senha</Link>
                </Button>
                <Button type="submit" className="w-full">
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Entrar'
                  )}
                </Button>
                <p className="text-muted-foreground text-sm text-center">
                  Não tem uma conta?{' '}
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/auth/create-account">Registre-se</Link>
                  </Button>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
