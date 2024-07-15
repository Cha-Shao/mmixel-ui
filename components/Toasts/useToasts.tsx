import { useContext } from "react"
import { ToastContext } from "./ToastProvider"
import { ToastType } from "./Toast"

class Toast {
  private setToasts

  constructor() {
    const { setToasts } = useContext(ToastContext)
    this.setToasts = setToasts
  }

  private create(
    label: string,
    type: ToastType = "success",
  ) {
    this.setToasts(toasts => [
      ...toasts,
      {
        id: new Date().getTime() + Math.random(),
        label,
        type
      },
    ])
  }

  public success(label: string) {
    this.create(label)
  }
  public info(label: string) {
    this.create(label, "info")
  }
  public warn(label: string) {
    this.create(label, "warn")
  }
  public error(label: string) {
    this.create(label, "error")
  }
  public remove(id: number) {
    this.setToasts(toasts =>
      toasts.filter(({ id: thisId }) => thisId !== id)
    )
  }
}

const useToasts = () => {
  return new Toast()
}

export default useToasts
