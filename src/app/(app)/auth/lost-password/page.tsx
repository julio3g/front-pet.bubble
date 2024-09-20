import { LostPasswordForm } from '@/components/auth/lost-password'

export default function LostPassword() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl font-bold">Recuperar senha</h1>
      <LostPasswordForm />
    </div>
  )
}
