import { ClipboardIcon, TrashIcon } from '@phosphor-icons/react'
import type { Link } from '../../types/link'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { deleteLink } from '../../services/delete-link'
import { toast } from 'sonner'

type LinkCardProps = {
  link: Link
  onSuccess?: () => void
}

export const LinkCard = ({ link, onSuccess }: LinkCardProps) => {
  const { mutate, status } = useMutation({
    mutationFn: deleteLink,
    onSuccess,
  })

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(link.shortLink)

    toast.info('Link copiado com sucesso', {
      dismissible: true,
      duration: 3000,
      description: `O link ${link.shortLinkName} foi copiado para a área de transferência`,
      classNames: {
        description: '!text-blue-800',
        info: '!bg-blue-100',
        title: '!text-blue-800',
        icon: '!text-blue-800',
      },
    })
  }

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      `Você realmente quer apagar o link ${link.shortLink}?`
    )

    if (isConfirmed) mutate(link.id)

    return
  }

  return (
    <div
      key={link.id}
      className="flex border-t border-gray-200 py-4 justify-between items-center"
    >
      <div className="flex flex-col">
        <a
          href={link.shortLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-base text-md truncate"
        >
          {link.shortLink}
        </a>
        <span className="text-sm text-gray-500 truncate">
          {link.originalLink}
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <span className="text-sm text-gray-500">
          {link.accessNumber} {`acesso${link.accessNumber !== 1 ? 's' : ''}`}
        </span>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleCopyToClipboard}>
            <ClipboardIcon className="fill-gray-600" />
          </Button>
          <Button
            variant="secondary"
            disabled={status === 'pending'}
            onClick={handleDeleteClick}
            className="fill-gray-600"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
