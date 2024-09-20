'use client'

import { passwordLost } from '@/actions/password-lost'
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
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const lostPasswordFormSchema = z.object({
  login: z
    .string()
    .min(2, 'O nome ou email do usuário deve ter no mínimo 2 caracteres'),
})

export type LostPasswordFormData = z.infer<typeof lostPasswordFormSchema>

export function LostPasswordForm() {
  const form = useForm<LostPasswordFormData>({
    resolver: zodResolver(lostPasswordFormSchema),
    defaultValues: {
      login: '',
    },
  })

  const {
    formState: { isSubmitting, isSubmitted },
    reset,
  } = form

  async function onSubmit(data: LostPasswordFormData) {
    try {
      await passwordLost(data)
      reset()
    } catch (error: any) {}
  }

  return (
    <Card className="p-6 max-w-96 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail / Usuário</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSubmitted ? (
            <p>E-mail enviado com sucesso!</p>
          ) : (
            <Button type="submit" className="w-full">
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Enviar'
              )}
            </Button>
          )}
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
