import { WarningIcon } from '@phosphor-icons/react'
import { cn } from '../../utils/cn'

type InputProps = React.ComponentProps<'input'> & {
  title: string
  error?: boolean
  errorMessage?: string
  prefix?: string
}

function Input({
  className,
  type,
  title,
  error,
  errorMessage,
  prefix,
  ...props
}: InputProps) {
  return (
    <div className={cn('flex flex-col gap-2 group')}>
      <label
        htmlFor={props.name}
        className={cn(
          'text-xs group-focus-within:text-blue-base group-focus-within:font-bold',
          error ? 'text-danger font-bold' : ''
        )}
      >
        {title}
      </label>
      <div
        className={cn(
          'text-md font-normal border border-gray-300 px-4 py-4 rounded-md flex items-center',
          'transition-colors duration-200 ease-in-out',
          'group-focus-within:border-blue-base ',
          error ? 'border-danger' : ''
        )}
      >
        {prefix ? (
          <label
            htmlFor={props.name}
            className={cn(
              'w-fit text-gray-400 group-focus-within:text-black',
              props.value ? 'text-black' : ''
            )}
          >
            {prefix}
          </label>
        ) : null}
        <input
          type={type}
          data-slot="input"
          className={cn(
            'text-md font-normal w-full h-full bg-inherit',
            'outline-none placeholder:text-gray-400',
            className
          )}
          id={props.name}
          {...props}
        />
      </div>
      {error && errorMessage ? (
        <small className="text-sm text-gray-500 flex gap-1 items-center">
          <WarningIcon width={16} height={16} className="fill-danger" />
          {errorMessage}
        </small>
      ) : null}
    </div>
  )
}

export { Input }
