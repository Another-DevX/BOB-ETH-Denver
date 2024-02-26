function abreviarHash (hash: string, longitud: number = 10): string {
  return hash.length <= longitud
    ? hash
    : `${hash.slice(0, longitud / 2)}...${hash.slice(-longitud / 2)}`
}
export default abreviarHash
