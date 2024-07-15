import { useContext } from "react"
import { ToastContext } from "./ToastProvider"
import { ToastType } from "./Toast"

const useToasts = () => {
  const setToasts = useContext(ToastContext).setToasts

  const create = (
    label: string,
    type: ToastType = "success",
  ) => {
    setToasts(toasts => [
      ...toasts,
      {
        id: new Date().getTime() + Math.random(),
        label,
        type
      },
    ])
  }

  const success = (label: string) => {
    create(label)
  }
  const info = (label: string) => {
    create(label, "info")
  }
  const warn = (label: string) => {
    create(label, "warn")
  }
  const error = (label: string) => {
    create(label, "error")
  }
  const remove = (id: number) => {
    setToasts(toasts =>
      toasts.filter(({ id: thisId }) => thisId !== id)
    )
  }

  return {
    success,
    info,
    warn,
    error,
    remove,
  }
}

export default useToasts
