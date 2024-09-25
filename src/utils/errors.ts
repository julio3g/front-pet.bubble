export default function apiError(error: unknown) {
  if (error instanceof Error) return error.message
  else return 'Erro genérico'
}
