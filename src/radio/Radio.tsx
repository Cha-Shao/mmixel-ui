import {
  Dispatch,
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  SetStateAction,
  forwardRef,
} from "react"
import classNames from "classnames"

interface Props extends
  PropsWithChildren,
  Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
  checked: boolean
  name: string
  value: any
  setValue: Dispatch<SetStateAction<boolean>>

  colorDefault?: string

  disabled?: boolean
  onChange?: (value: string) => void
}

const Radio = forwardRef(function Radio(
  props: Props,
  ref: ForwardedRef<HTMLLabelElement>
) {
  const {
    checked = false,
    colorDefault: color = "#ff8729",
  } = props
  return (
    <label
      ref={ref}
      className={classNames(
        "m-radio",
        props.className,
        "inline-flex items-center",
        props.disabled ? "opacity-50 cursor-no-drop" : "cursor-pointer"
      )}>
      <input
        name={props.name}
        type="radio"
        className="m-radio-input hidden"
        disabled={props.disabled}
        onChange={() => {
          props.setValue(props.value)
          props.onChange && props.onChange(props.value)
        }} />
      <div
        className="m-radio-icon w-5 h-5 rounded-full duration-200"
        style={{
          boxShadow: `0 0 0 ${checked ? "6px" : "2px"} ${checked ? color : "hsl(0deg 0% 50% / 50%)"
            } inset`,
        }} />
      <span className="m-radio-children px-2">{props.children}</span>
    </label>
  )
})

export default Radio
