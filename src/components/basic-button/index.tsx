import { Button, type ButtonProps } from "antd"
import clsx from "clsx"
import type { ReactNode } from "react"
import "./index.css"
interface BasicButtonProps extends ButtonProps {
  children?: ReactNode
  buttonType?: ButtonType
}

type ButtonType = "default" | "primary" | "secondary" | "warning"

export function BasicButton({ buttonType = "default", children, className, ...props }: BasicButtonProps) {
  console.log("buttonType", buttonType)
  const typeMap: Record<ButtonType, ButtonProps["type"]> = {
    default: "default",
    primary: "primary",
    secondary: "default",
    warning: "default",
  }

  return (
    <Button
      type={typeMap[buttonType]}
      className={clsx(
        { "btn-secondary": buttonType === "secondary", "btn-warning": buttonType === "warning" },
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
