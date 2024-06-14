import { useContext } from "react"
import { ToastContext } from "./ToastProvider"

const useToasts = () => {
  const { setToasts } = useContext(ToastContext)

  const create = (
    label: string,
    config?: { error: boolean }
  ) => {
    setToasts(toasts => [
      ...toasts,
      {
        id: new Date().getTime(),
        label,
        error: config?.error,
      }
    ])
  }

  const remove = (id: number) => {
    setToasts(toasts =>
      toasts.filter(({ id: thisId }) => thisId !== id)
    )
  }

  return {
    create,
    remove,
  }
}

export default useToasts
