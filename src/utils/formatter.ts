function formatCepToPostalCode(cep: string): string {
  if (cep.length !== 8) throw new Error('O CEP deve ter 8 dígitos')
  return `${cep.slice(0, 5)}-${cep.slice(5)}`
}
function convertCepToNumeric(zipCode: string): number {
  return parseInt(zipCode.replace(/\D/g, ''))
}

export { convertCepToNumeric, formatCepToPostalCode }
