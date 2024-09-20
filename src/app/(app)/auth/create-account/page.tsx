'use client'

import { createNewUser } from '@/actions/user-post'
import { LogoLarge } from '@/assets/logo-large'
import { LeftAuthPage } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Loader2, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createAccountFormSchema = z.object({
  username: z
    .string()
    .min(2, 'O nome de usuário deve ter no mínimo 2 caracteres'),
  email: z.string().email('Por favor, insira um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  zipCode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, 'CEP inválido')
    .transform((cep) => cep.replace(/\D/g, '')),
  numberAddress: z
    .string()
    .min(1, 'O número do endereço não pode estar vazio')
    .optional(),
  complement: z.string().optional(),
})

export type CreateAccountFormData = z.infer<typeof createAccountFormSchema>

export default function CreateAccount() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null) // Estado para armazenar o erro do servidor
  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      zipCode: '',
      numberAddress: '',
      complement: '',
    },
  })

  // const zipCode = form.watch('zipCode')

  // console.log(zipCode)

  // function getZipCode() {
  //   if (zipCode.length === 8) {
  //     console.log(zipCode)
  //   }
  // }

  const {
    formState: { isSubmitting },
    reset,
  } = form

  async function onSubmit(data: CreateAccountFormData) {
    setServerError(null)
    try {
      await createNewUser(data)
      reset()
      router.push('/profile')
    } catch (error: any) {
      setServerError(error.message)
    }
  }

  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Button
        variant="ghost"
        className="absolute right-4 top-4 md:right-8 md:top-8 flex gap-2"
      >
        <User size={16} />
        <Link href="/auth">Login</Link>
      </Button>
      <Link
        href="/"
        className="absolute left-4 top-4 z-20 md:right-8 md:top-8 lg:hidden"
      >
        <LogoLarge />
      </Link>
      <LeftAuthPage />
      <div className="lg:p-8">
        <Card className="mx-auto flex w-full p-6 flex-col justify-center space-y-3 sm:max-w-md sm:w-full">
          <CardHeader>
            <CardTitle>Cadastre-se gratuitamente</CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Digite o CEP"
                        id="zipCode"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="numberAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {serverError && <p className="text-red-500">{serverError}</p>}
              <Button type="submit" className="w-full">
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Cadastrar-se'
                )}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}
