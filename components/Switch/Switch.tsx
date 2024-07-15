"use client"

import classNames from "classnames"

export interface SwitchProps {
  value: boolean
  onChange: (value: boolean) => void
  className?: string
}

const Switch = ({
  value,
  onChange,
  className,
}: SwitchProps) => {
  return (
    <label className={classNames("w-fit", className)}>
      <input
        type="checkbox"
        checked={value}
        onChange={e => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className={classNames(
        "relative w-11 h-6 after:content-['']",
        "rounded-full",
        "peer bg-muted peer-checked:bg-primary",
        "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary ring-offset-2",
        "peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-foreground",
        "after:absolute after:top-[2px] after:start-[2px] after:transition-all",
        "after:rounded-full after:h-5 after:w-5",
        "after:bg-foreground after:border-border after:border",
      )}></div>
    </label>
  )
}

export default Switch
