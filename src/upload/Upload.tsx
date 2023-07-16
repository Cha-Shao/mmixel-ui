import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  ForwardedRef,
  HTMLAttributes,
  PropsWithChildren,
  SetStateAction,
  forwardRef,
  useRef,
} from "react"
import Button from "../button/Button"
import Icon, { Close, Files } from "../icon/Icon"

interface Props extends
  PropsWithChildren,
  HTMLAttributes<HTMLDivElement> {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>

  accept?: string
  multiple?: boolean
  drag?: boolean
  max?: number
  disabled?: boolean
  onUpload?: (files: File[]) => void
  onRemove?: (file: File) => void
}

const Upload = forwardRef(function Upload(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    accept,
    multiple = false,
    disabled = false,
    drag = false,
  } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const appendFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const appendFiles = Array.from(e.target.files || [])
    const newFiles = [...props.files, ...appendFiles].slice(0, props.max)
    props.setFiles(newFiles)
    props.onUpload && props.onUpload(newFiles)
  }
  const removeFiles = (index: number) => {
    const prevFiles = props.files
    const removedFile = props.files[index]
    prevFiles.splice(index, 1)
    props.onRemove && props.onRemove(removedFile)
    props.setFiles([...prevFiles])
  }
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const appendFiles = Array.from(e.dataTransfer.files || [])
    const newFiles = [...props.files, ...appendFiles].slice(0, props.max)
    props.setFiles(newFiles)
    props.onUpload && props.onUpload(newFiles)
  }

  return (
    <div ref={ref} {...props} className={classNames(
      "m-upload",
      props.className,
    )}>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        disabled={disabled || (props.max ? props.files.length >= props.max : false)}
        className="m-upload-input hidden"
        accept={accept}
        onInput={appendFiles}
      />
      <div
        onClick={() => { inputRef.current?.click() }}
        onDragOver={drag ? handleDragOver : undefined}
        onDrop={drag ? handleDrop : undefined}
        className={classNames(
          "m-upload-trigger",
          "w-fit",
          { "opacity-50": disabled || (props.max ? props.files.length >= props.max : false) }
        )}>
        {props.children}
      </div>
      <AnimatePresence>
        {multiple && props.files.map((file, i) => (
          <motion.div
            key={file.name + i.toString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames(
              "m-upload-list",
              "flex items-center",
              "py-1 px-2 mt-2",
              "duration-200 hover:bg-slate-400/10",
              "rounded-md",
              "cursor-default",
              "group",
            )}>
            <Icon icon={Files} />
            <p className="line-clamp-1 flex-grow px-2">{file.name}</p>
            <Button square type="ghost" size="sm"
              className="opacity-0 group-hover:opacity-100"
              onClick={() => { removeFiles(i) }}>
              <Icon icon={Close} />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>)
})

export default Upload
