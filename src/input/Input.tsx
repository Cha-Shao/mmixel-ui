"use client"
import classNames from "classnames"
import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useRef,
  HTMLAttributes,
  useState,
  ReactNode
} from "react"
import Icon, { EyeClosed, EyeOpen } from "../icon/Icon"

type InputType = | "text" | "password"
interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "prefix" | "suffix"> {
  value: string
  setValue: Dispatch<SetStateAction<string>>

  rounded?: boolean
  disabled?: boolean

  type?: InputType
  maxLength?: number
  onlyNumber?: boolean
  showCount?: boolean

  prefix?: ReactNode | string
  suffix?: ReactNode | string

  onEnter?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onType?: () => void
}

const Input = forwardRef(function Input(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const type = props.type || "text"
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    props.onlyNumber && (value = value.replace(/[^0-9]/g, ""))
    props.onType && props.onType()
    props.setValue(value)
  }

  return (
    <div ref={ref}
      className={classNames(
        "m-input",
        props.className,
        "px-2",
        "min-h-[2rem]",
        props.rounded ? "rounded-full" : "rounded-md",
        props.disabled ? "opacity-80 cursor-no-drop" : "cursor-text",
        "bg-slate-600/10 dark:bg-slate-200/10",
        "flex items-center",
      )}
      onClick={() => { inputRef.current?.focus() }}>
      {props.prefix &&
        <div className="mr-2">{props.prefix}</div>
      }
      <input
        ref={inputRef}
        type={showPassword ? "text" : type}
        placeholder={props.placeholder}
        disabled={props.disabled}
        className="m-input-input bg-transparent outline-none h-full flex-grow"
        value={props.value}
        onChange={handleChange}
        maxLength={props.maxLength}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          e.key === "Enter" && props.onEnter && props.onEnter()
        }}
        onFocus={() => { props.onFocus && props.onFocus() }}
        onBlur={() => { props.onBlur && props.onBlur() }} />
      {type === "password" ? (
        <div
          onMouseDown={() => { setShowPassword(true) }}
          onMouseUp={() => { setShowPassword(false) }}
          className="cursor-pointer opacity-50">
          {showPassword
            ? <Icon icon={EyeOpen} size={18} />
            : <Icon icon={EyeClosed} size={18} />}
        </div>
      ) : (
        <div className="ml-2">
          {props.showCount
            ? <p className="opacity-50">{props.value.length}{props.maxLength && `/${props.maxLength}`}</p>
            : props.suffix}
        </div>
      )}
    </div>
  )
})

export default Input
