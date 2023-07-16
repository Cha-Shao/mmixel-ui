import classNames from "classnames"
import {
  ChangeEvent,
  Dispatch,
  ForwardedRef,
  HTMLAttributes,
  SetStateAction,
  forwardRef
} from "react"
import { Size } from "../types"

interface Props extends Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  size?: Size
  disabled?: boolean
  color?: string
  onChange?: (value: boolean) => void
}

const Switch = forwardRef(function Switch(
  props: Props,
  ref: ForwardedRef<HTMLLabelElement>
) {
  const {
    size = "md",
    disabled = false,
    color = "#ff8729",
  } = props
  return (
    <label ref={ref} className={classNames(
      "m-switch",
      props.className,
      "inline-block"
    )}>
      <input
        className="m-switch-input hidden"
        type="checkbox"
        disabled={disabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          props.setValue(e.target.checked)
          props.onChange && props.onChange(e.target.checked)
        }} />
      <div className={classNames(
        "m-switch-button",
        "rounded-full",
        "inline-flex items-center",
        "duration-150",
        disabled ? "cursor-no-drop" : "cursor-pointer",
        { "h-4 w-6 p-0.5": size === "sm" },
        { "h-5 w-8 p-1": size === "md" },
        { "h-6 w-10 p-1": size === "lg" },
      )} style={{
        backgroundColor: props.value ? color : "#94a3b833"
      }}>
        <span className={classNames(
          "m-switch-circle",
          "block",
          "bg-white dark:bg-black",
          "rounded-full",
          { "h-2.5 w-2.5": size === "sm" },
          { "h-3 w-3": size === "md" },
          { "h-4 w-4": size === "lg" },
          "duration-150",
          "shadow-sm",
          { "translate-x-full": props.value },
        )} />
      </div>
    </label>
  )
})

export default Switch
