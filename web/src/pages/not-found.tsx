import { Link } from 'react-router'
import notFoundImg from '../assets/404.svg'

export const NotFound = () => {
  return (
    <main className="w-full h-dvh flex items-center justify-center px-4">
      <section className="bg-gray-100 rounded-md flex flex-col items-center px-8 py-20 w-full max-w-[36.25rem]">
        <img src={notFoundImg} alt="404 not found" />
        <h1 className="text-xl text-gray-600 mt-8">Link não encontrado</h1>
        <div className="flex flex-col mt-6 items-center">
          <span className="text-md text-gray-500 text-center">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em
            <Link
              to={{ pathname: '/' }}
              className="text-blue-base underline ml-1"
            >
              brev.ly
            </Link>
            .
          </span>
        </div>
      </section>
    </main>
  )
}
