import classNames from "classnames"
import { HTMLAttributes } from "react"

export interface OptionListProps extends HTMLAttributes<HTMLDivElement> {

}

const OptionList = ({
  children,
  ...attrs
}: OptionListProps) => {
  return (
    <div
      {...attrs}
      className={classNames(
        "grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 place-content-start",
        attrs.className
      )}
    >
      {children}
    </div>
  )
}

export default OptionList
