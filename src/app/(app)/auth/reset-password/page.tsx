import { ResetPasswordForm } from '@/components/auth/reset-password'

interface ResetPasswordProps {
  searchParams: {
    key: string
    login: string
  }
}

export default function ResetPassword({ searchParams }: ResetPasswordProps) {
  const { key, login } = searchParams
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl font-bold">Resetar a senha</h1>
      <ResetPasswordForm keyToken={key} userLogin={login} />
    </div>
  )
}
