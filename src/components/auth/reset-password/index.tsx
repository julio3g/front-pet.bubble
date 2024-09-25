'use client'

import { passwordReset } from '@/actions/reset-password'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Você deve especificar uma senha')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    password_repeat: z.string().min(1, 'Você deve repetir a senha'),
  })
  .refine((data) => data.password === data.password_repeat, {
    message: 'As senhas não correspondem',
    path: ['password_repeat'],
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>

interface ResetPasswordProps {
  keyToken: string
  userLogin: string
}

export function ResetPasswordForm({ keyToken, userLogin }: ResetPasswordProps) {
  const router = useRouter()
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      password_repeat: '',
    },
  })

  const {
    formState: { isSubmitting },
    reset,
  } = form

  async function onSubmit(data: ResetPasswordFormData) {
    const { password } = data
    const result = await passwordReset({
      login: userLogin,
      password,
      key: keyToken,
    })
    if (!result) {
      reset()
      router.push('/')
    } else toast.error(result.message)
  }

  return (
    <Card className="p-6 max-w-96 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            name="password_repeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repetir Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Enviar'
            )}
          </Button>
          <p className="text-muted-foreground text-sm text-center">
            <Button variant="link" className="p-0 h-auto" asChild>
              <Link href="/auth">Voltar</Link>
            </Button>
          </p>
        </form>
      </Form>
    </Card>
  )
}
