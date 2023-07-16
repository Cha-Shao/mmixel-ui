import classNames from "classnames"
import {
  Children,
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  cloneElement,
  forwardRef,
  isValidElement
} from "react"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLDivElement> {
  direction?: "hor" | "ver"
  rounded?: boolean
}

const ButtonGroup = forwardRef(function ButtonGroup(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const direction = props.direction || "hor"
  return (
    <div ref={ref}
      className={classNames(
        "m-button-group",
        props.className,
        "inline-flex",
        { "flex-col": direction === "ver" },
      )}>
      {Children.map(props.children, (child) => {
        return isValidElement<{ className: string }>(child)
          ? cloneElement(child, {
            className: classNames(
              child.props.className,
              direction === "hor"
                ? classNames(
                  "border-l border-r first:border-l-2 last:border-r-2",
                  props.rounded
                    ? "first:rounded-l-full last:rounded-r-full"
                    : "first:rounded-l-md last:rounded-r-md"
                )
                : classNames(
                  "shadow-none",
                  "border-t border-b first:border-t-2 last:border-b-2",
                  props.rounded
                    ? "first:rounded-t-full last:rounded-b-full"
                    : "first:rounded-t-md last:rounded-b-md"
                ),
              "rounded-none",
            )
          })
          : child
      })}
    </div>
  )
})

export default ButtonGroup
