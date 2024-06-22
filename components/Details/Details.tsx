"use client"

import { useState } from "react"
import { Button } from "../Button"
import {
  AnimatePresence,
  motion,
} from "framer-motion"

const Details = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: "0", opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: "0", opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        className="px-8 py-2 mx-auto rounded-full !flex justify-center"
        onClick={() => setExpanded(prevState => !prevState)}>
        {expanded ? "收起" : "展开"}
      </Button>
    </div>
  )
}

export default Details
