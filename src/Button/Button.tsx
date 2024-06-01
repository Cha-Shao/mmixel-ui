import classNames = require("classnames")

enum ButtonVariant {
  Solid = 'solid',
  Secondary = 'secondary',
  Ghost = 'ghost',
  Link = 'link',
}

const Button = ({
  variant,
  ...attrs
}) => {
  return (
    <button
      className={classNames(

      )}
      {...attrs}
    >
      {attrs.children}
    </button>
  )
}

export default Button
