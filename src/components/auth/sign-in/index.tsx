'use client'

import { authentication } from '@/actions/authentication'
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
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const authenticationFormSchema = z.object({
  username: z
    .string()
    .min(1, 'O nome de usuário deve ter no mínimo 1 caractere'),
  password: z.string().min(1, 'A senha deve ter no mínimo 1 caractere'),
})

export type AuthenticationFormData = z.infer<typeof authenticationFormSchema>

export function SignInForm() {
  const router = useRouter()
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
    const result = await authentication(data)
    if (!result) {
      reset()
      router.push('/')
    } else {
      toast.error(result.message)
    }
  }

  return (
    <Card className="mx-auto w-full sm:max-w-md sm:w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Acesse sua conta</CardTitle>
        <CardDescription>Que bom te ver novamente!</CardDescription>
      </CardHeader>
      <CardContent>
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
  )
}
