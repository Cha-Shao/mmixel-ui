import classNames from "classnames";
import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from "react";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  onChange?: (value: string) => void
}

const Textarea = ({
  onChange,
  ...attrs
}: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...attrs}
      ref={ref}
      className={classNames(
        'outline-none',
        'px-2 py-1',
        'border rounded-lg transition-colors duration-200',
        attrs.disabled
          ? 'bg-muted cursor-no-drop'
          : 'border-border focus:border-primary bg-transparent',
        'min-h-[6ch]',
        attrs.className
      )}
      onChange={e => onChange && onChange(e.target.value)}
    />
  )
}

export default forwardRef(Textarea)