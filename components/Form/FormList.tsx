import classNames from "classnames"
import { HTMLAttributes } from "react"

export interface FormListProps extends HTMLAttributes<HTMLDivElement> {

}

const FormList = ({
  children,
  ...attrs
}: FormListProps) => {
  return (
    <div
      {...attrs}
      className={classNames(
        "grid grid-cols-[8rem_1fr] gap-2 place-content-start",
        attrs.className
      )}
    >
      {children}
    </div>
  )
}

export default FormList
