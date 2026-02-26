"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

type AnimateOnScrollProps = {
  children: ReactNode
  className?: string
  animation?: "fade" | "slide-up" | "slide-right" | "scale" | "none"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function AnimateOnScroll({
  children,
  className = "",
  animation = "fade",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })

  const getAnimationVariants = () => {
    switch (animation) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      case "slide-up":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }
      case "slide-right":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }
      case "none":
        return {
          hidden: {},
          visible: {},
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getAnimationVariants()}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
