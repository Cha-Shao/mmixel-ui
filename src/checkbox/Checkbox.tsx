import classNames from "classnames"
import { ChangeEvent, Dispatch, ForwardedRef, HTMLAttributes, PropsWithChildren, SetStateAction, forwardRef } from "react"
import Icon, { Check } from "../icon/Icon"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLLabelElement> {
  checked: boolean
  setValue: Dispatch<SetStateAction<boolean>>

  colorDefault?: string

  disabled?: boolean
  onCheck?: (checked: boolean) => void
  onUncheck?: (checked: boolean) => void
}

const Checkbox = forwardRef(function Checkbox(
  props: Props,
  ref: ForwardedRef<HTMLLabelElement>
) {
  const {
    checked = false,
    disabled = false,
    colorDefault: color = "#ff8729",
  } = props
  return (
    <label ref={ref} {...props} className={classNames(
      "m-checkbox",
      props.className,
      "inline-flex items-center",
      props.disabled ? "opacity-50 cursor-no-drop" : "cursor-pointer",
    )}>
      <input
        type="checkbox"
        disabled={disabled}
        className="m-checkbox-input hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          props.setValue(e.target.checked)
          checked
            ? props.onCheck && props.onCheck(!checked)
            : props.onUncheck && props.onUncheck(!checked)
        }} />
      <div className={classNames(
        "m-checkbox-icon",
        "w-4 h-4 overflow-hidden rounded-sm text-white",
        "inline-flex justify-center items-center",
        "duration-150",
        checked ? "border-0" : "border-2 border-slate-800/10 dark:border-slate-100/10",
      )} style={{
        backgroundColor: checked ? color : ""
      }}>
        {checked && <Icon icon={Check} />}
      </div>
      <span className="m-checkbox-children px-2">{props.children}</span>
    </label>
  )
})

export default Checkbox
