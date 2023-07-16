import classNames from "classnames"
import {
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef
} from "react"
import { FullSize } from "../types"
import StyledTitle from "./StyledTitle"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLHeadingElement> {
  size?: FullSize
}

const Title = forwardRef(function Title(
  props: Props,
  ref: ForwardedRef<HTMLHeadingElement>
) {
  switch (props.size) {
    case "ty":
      return <h5 ref={ref} {...props} className={classNames("text-sm", props.className)}>{props.children}</h5>
    case "sm":
      return <h4 ref={ref} {...props} className={classNames("text-lg", props.className)}>{props.children}</h4>
    default: // md
      return <h3 ref={ref} {...props} className={classNames("text-2xl font-bold", props.className)}>{props.children}</h3>
    case "lg":
      return <h2 ref={ref} {...props} className={classNames("text-3xl font-bold", props.className)}>{props.children}</h2>
    case "xl":
      return <h1 ref={ref} {...props} className={classNames("text-5xl font-bold", props.className)}>{props.children}</h1>
  }
})

type TitleComponent = typeof Title & {
  Styled: typeof StyledTitle
}

export default Title as TitleComponent
