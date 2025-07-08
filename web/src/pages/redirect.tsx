import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'
import { pathToShort } from '../utils/pathToShort'
import { getOriginalLink } from '../services/get-original-link'
import { incrementLinkAccess } from '../services/increment-link-access'
import { useEffect } from 'react'
import logo from '../assets/Logo_Icon.svg'

export const Redirect = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const shortLink = pathToShort(pathname)

  const { data, isError } = useQuery({
    queryKey: ['link', 'get-original-link', shortLink],
    queryFn: async () => getOriginalLink(shortLink),
    retry: 2,
  })

  const { mutate } = useMutation({
    mutationFn: incrementLinkAccess,
  })

  useEffect(() => {
    if (data?.originalLink) {
      mutate(data.id)
      window.location.href = data.originalLink
    }
  }, [mutate, data])

  useEffect(() => {
    if (isError) {
      navigate('/404')
    }
  }, [isError, navigate])

  return (
    <main className="w-full h-dvh flex items-center justify-center px-4">
      <section className="bg-gray-100 rounded-md flex flex-col items-center px-8 py-20 w-full max-w-[36.25rem]">
        <img src={logo} alt="logo" />
        <h1 className="text-xl text-gray-600 mt-8">Redirecionando...</h1>
        <div className="flex flex-col mt-6 items-center">
          <span className="text-md text-gray-500">
            O link será aberto automaticamente em alguns instantes.
          </span>
          <span className="text-md text-gray-500 mt-2">
            Não foi redirecionado?{' '}
            <a href={data?.originalLink} className="text-blue-base underline">
              Acesse aqui
            </a>
          </span>
        </div>
      </section>
    </main>
  )
}
