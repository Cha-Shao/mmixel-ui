import classNames from "classnames"
import { HTMLAttributes } from "react"

enum ButtonSize {
  Tiny = 'ty',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
}

enum ButtonVariant {
  Solid = 'solid',
  Secondary = 'secondary',
  Ghost = 'ghost',
  Link = 'link',
}

const Button = (
  {
    variant,
    size,
    rounded,
    ...attrs
  }: {
    variant: ButtonVariant,
    size: ButtonSize,
    rounded?: boolean,
  } & HTMLAttributes<HTMLButtonElement>
) => {
  return (
    <button
      className={classNames(
        size === ButtonSize.Tiny && 'px-2 py-1 text-xs',
        size === ButtonSize.Small && 'px-3 py-2 text-sm',
        size === ButtonSize.Medium && 'px-4 py-2 text-base',
        size === ButtonSize.Large && 'px-6 py-3 text-lg',
        rounded ? 'rounded-full' : 'rounded-lg',
      )}
      {...attrs}
    >
      {attrs.children}
    </button>
  )
}

export default Button
