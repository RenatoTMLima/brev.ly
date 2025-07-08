import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import logo from '../assets/Logo.svg'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { DownloadIcon, LinkIcon } from '@phosphor-icons/react'
import { createLink } from '../services/create-link'
import z from 'zod'
import { getLinks } from '../services/get-links'
import { LinkCard } from '../components/layouts/link-card'
import { useState } from 'react'
import { toast, Toaster } from 'sonner'
import { exportCsvReport } from '../services/export-csv-report'
import { downloadUrl } from '../utils/download-url'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { SpinnerGapIcon } from '@phosphor-icons/react/dist/ssr'
import { LoadingBar } from '../components/ui/loading-bar'

export const Home = () => {
  const queryClient = useQueryClient()
  const [inputValues, setInputValues] = useState(EMPTY_FORM_VALUES)
  const [inputErrors, setInputErrors] = useState<string[]>([])

  const {
    data: linksList,
    refetch: refetchLinksList,
    isFetching,
  } = useQuery({
    queryKey: ['link', 'list'],
    queryFn: getLinks,
  })

  const { status: createLinkStatus, mutate: createShortLink } = useMutation({
    mutationKey: ['link', 'create'],
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['link', 'list'] })
      setInputErrors([])
      setInputValues(EMPTY_FORM_VALUES)
    },
    onError: () => {
      toast.error('Erro no cadastro', {
        dismissible: true,
        duration: 3000,
        description: 'Essa url encurtada já existe!',
        classNames: {
          description: '!text-red-800',
          error: '!bg-red-100',
          title: '!text-red-800',
          icon: '!text-red-800',
        },
      })
    },
  })

  const { mutate: handleExportCsvClick, isPending } = useMutation({
    mutationKey: ['link', 'csv-report'],
    mutationFn: exportCsvReport,
    onSuccess: async data => {
      await downloadUrl(data.reportUrl)
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = formValidationSchema.safeParse(inputValues)

    if (!result.success) {
      setInputErrors(Object.keys(result.error.flatten().fieldErrors))
      return
    }

    createShortLink(result.data)
  }

  return (
    <main className="px-4 h-dvh max-h-dvh flex flex-col items-center md:items-start md:w-full md:max-w-[75rem] md:mx-auto md:pt-12">
      <header className="mt-4">
        <img src={logo} alt="Logo" className="py-6" />
      </header>
      <section className="w-full flex flex-col md:flex-row gap-4 md:items-start">
        <article className="bg-gray-100 p-8 rounded-md w-full md:flex-grow-[2] md:basis-2/5">
          <h1 className="text-lg mb-6">Novo Link</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              title="LINK ORIGINAL"
              placeholder="www.exemplo.com.br"
              name="originalLink"
              value={inputValues.originalLink}
              onChange={e =>
                setInputValues(prev => ({
                  ...prev,
                  originalLink: e.target.value,
                }))
              }
              error={inputErrors.includes('originalLink')}
              errorMessage="Informe uma url válida"
            />
            <Input
              prefix="brev.ly/"
              name="shortLink"
              title="LINK ENCURTADO"
              value={inputValues.shortLink}
              onChange={e =>
                setInputValues(prev => ({ ...prev, shortLink: e.target.value }))
              }
              error={inputErrors.includes('shortLink')}
              errorMessage="Informe uma url minúscula e sem espaço/caracter especial"
            />
            <Button disabled={createLinkStatus === 'pending'} type="submit">
              Salvar link
            </Button>
          </form>
        </article>
        <article className="bg-gray-100 p-8 pr-4 pb-2 rounded-md w-full md:flex-grow-[3] md:basis-3/5 relative">
          <LoadingBar isLoading={isFetching} />
          <header className="flex w-full justify-between py-4 pr-4">
            <h1 className="text-lg">Meus links</h1>
            <Button
              variant="secondary"
              className="flex gap-2 items-center"
              disabled={!linksList?.length || isPending}
              onClick={() => handleExportCsvClick()}
            >
              <DownloadIcon width={16} height={16} />
              Baixar CSV
            </Button>
          </header>
          <ScrollArea.Root type="auto" className="overflow-hidden">
            <ScrollArea.Viewport className="h-full md:max-h-[60vh] max-h-[25vh] pr-4">
              {linksList === undefined ? (
                <div className="border-t border-t-gray-200 py-10 flex flex-col gap-4 items-center">
                  <SpinnerGapIcon
                    width={32}
                    height={32}
                    className="fill-gray-400 animate-spin"
                  />
                  <p className="uppercase text-xs">Carregando...</p>
                </div>
              ) : linksList.length ? (
                linksList.map(link => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    onSuccess={refetchLinksList}
                  />
                ))
              ) : (
                <div className="border-t border-t-gray-200 py-10 flex flex-col gap-4 items-center">
                  <LinkIcon width={32} height={32} className="fill-gray-400" />
                  <p className="uppercase text-xs">
                    ainda não existem links cadastrados
                  </p>
                </div>
              )}
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="flex touch-none select-none bg-gray-300 p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-400 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </article>
      </section>
      <Toaster position="bottom-right" />
    </main>
  )
}

const formValidationSchema = z.object({
  originalLink: z.string().trim().url(),
  shortLink: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-zA-Z0-9_-]+$/),
})

const EMPTY_FORM_VALUES = {
  originalLink: '',
  shortLink: '',
}
