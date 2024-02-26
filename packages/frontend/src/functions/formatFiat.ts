function formatFiat (value: number | string) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(typeof value === 'string' ? parseFloat(value) : value)
}
export { formatFiat }
