import logo from '../assets/Logo.svg'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { LinkIcon } from '@phosphor-icons/react'

export const Home = () => {
  return (
    <main className="px-4 h-dvh flex flex-col items-center">
      <header className="mt-4">
        <img src={logo} alt="Logo" className="py-6" />
      </header>
      <section className="w-full flex flex-col md:flex-row gap-4">
        <article className="bg-gray-100 p-4 rounded-md">
          <h1>Novo Link</h1>
          <form className="flex flex-col gap-4">
            <Input placeholder="www.exemplo.com.br" />
            <Input placeholder="brev.ly/" />
            <Button disabled>Salvar link</Button>
          </form>
        </article>
        <article className="bg-gray-100 p-4 rounded-md">
          <header>
            <h1>Meus links</h1>
            <Button variant="secondary">Baixar CSV</Button>
          </header>
          <div>
            <LinkIcon />
            <p className="uppercase">ainda não existem links cadastrados</p>
          </div>
        </article>
      </section>
    </main>
  )
}
