"use client"

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react"
import Toast, { ToastProps } from "./Toast"
import { AnimatePresence } from "framer-motion"

export const ToastContext = createContext<{
  toasts: ToastProps[]
  setToasts: Dispatch<SetStateAction<ToastProps[]>>
}>({
  toasts: [],
  setToasts: () => { },
})

const ToastProvider = ({
  children,
}: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  return (
    <ToastContext.Provider value={{
      toasts,
      setToasts,
    }}>
      <div className="fixed top-16 right-0 z-50 max-w-96 p-2">
        <ul>
          <AnimatePresence>
            {toasts.map(toast => (
              <li key={toast.id} className="mb-2">
                <Toast
                  {...toast}
                />
              </li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
