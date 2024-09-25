'use client'

import { createNewUser } from '@/actions/user-post'
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
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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

interface ZipCodeProps {}

export function SignUpForm() {
  const router = useRouter()
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

  const {
    formState: { isSubmitting },
    reset,
    watch,
  } = form

  const zipCode = watch('zipCode')

  useEffect(() => {
    async function fetchAddress(zipCode: string) {
      const numericZipCode = parseInt(zipCode.replace(/\D/g, ''))
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${numericZipCode}`,
      )
      const data = await response.json()
    }

    if (zipCode?.length === 9) {
      fetchAddress(zipCode)
    }
  }, [zipCode])

  async function onSubmit(data: CreateAccountFormData) {
    const result = await createNewUser(data)
    if (!result) {
      reset()
      router.push('/')
    } else toast.error(result.message)
  }

  return (
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
          <div className="grid grid-cols-3 gap-5">
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
          <Button type="submit" className="w-full">
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Cadastrar-se'
            )}
          </Button>
          <p className="text-muted-foreground text-sm text-center">
            Já possui uma conta?{' '}
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link href="/auth">Entrar</Link>
            </Button>
          </p>
        </form>
      </Form>
    </Card>
  )
}
