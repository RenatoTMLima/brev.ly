import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'rounded-md p-2 w-full disabled:opacity-50 ',

  variants: {
    variant: {
      primary:
        'bg-blue-base hover:bg-blue-dark text-white text-md py-4 disabled:bg-blue-base',
      secondary:
        'bg-gray-200 text-gray-500 text-sm font-semibold border hover:border-blue-base w-fit disabled:bg-gray-200 disabled:border-gray-200',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({ variant, className, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component className={buttonVariants({ variant, className })} {...props} />
  )
}
