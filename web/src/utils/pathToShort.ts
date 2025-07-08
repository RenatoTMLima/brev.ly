export const pathToShort = (pathname: string) => {
  return pathname.startsWith('/') ? pathname.substring(1) : pathname
}
