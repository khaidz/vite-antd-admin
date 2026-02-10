import type { InputProps } from "antd"
import { theme } from "antd"
import { useMemo } from "react"
import "./index.css"

const { useToken } = theme

export interface FloatingLabelBoxProps {
  focused?: boolean
  hasValue?: boolean
  label?: React.ReactNode
  children?: React.ReactNode
  width?: string | number
  height?: string | number
  status?: InputProps["status"]
  required?: boolean
  fieldsetStyle?: React.CSSProperties
  labelStyle?: React.CSSProperties
  variant?: InputProps["variant"]
  labelPosition?: "center" | "top"
}

export function FloatingLabelBox({
  focused,
  hasValue,
  label,
  children,
  width,
  height,
  status,
  required,
  fieldsetStyle,
  labelStyle,
  variant = "outlined",
  labelPosition = "center",
}: FloatingLabelBoxProps) {
  const { token } = useToken()

  const statusColor = useMemo(() => {
    const colors = {
      borderColorActive: token.colorPrimaryActive,
      textColorActive: "#000",
      textColor: "#000",
      borderColor: token.colorBorder,
    }
    if (status === "warning") {
      colors.borderColorActive = token.colorWarningActive
      colors.textColorActive = token.colorWarningTextActive
      colors.textColor = token.colorWarningText
      colors.borderColor = token.colorWarningBorder
    } else if (status === "error") {
      colors.borderColorActive = "#f00"
      colors.textColorActive = "#f00"
      colors.textColor = "#f00"
      colors.borderColor = "#f00"
    }
    return colors
  }, [status, token])

  const borderStyleMemo = useMemo(() => {
    const borderColor = focused ? statusColor.borderColorActive : statusColor.borderColor
    if (variant === "outlined") {
      return {
        border: "1px solid",
        borderColor,
      }
    } else if (variant === "underlined") {
      return {
        borderBottom: "1px solid",
        borderBottomColor: borderColor,
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderRadius: 0,
      }
    }
    return {
      border: "none",
      borderSize: 0,
      borderColor: "transparent",
    }
  }, [variant, focused, statusColor])

  return (
    <div
      className="ant-float-label-box ant-float-v2"
      style={{
        width: width ?? "100%",
        height,
        backgroundColor: focused ? "#fff" : "#f2f2f2",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: token.borderRadius,
        }}
      >
        {children}
      </div>
      <label
        className="ant-float-label-box-label"
        style={{
          position: "absolute",
          color: focused ? statusColor.textColorActive : statusColor.textColor,
          height: "100%",
          transform: focused || hasValue ? "scale(0.8) translate(0, -7px)" : "scale(1) translate(0, 0)",
          // transformOrigin: "top left",
          paddingLeft: focused || hasValue ? 13 : 11,
          paddingRight: focused || hasValue ? 13 : 11,
          maxWidth: focused || hasValue ? "120%" : "100%",
          ...labelStyle,
        }}
      >
        {required ? (
          <div
            style={{
              display: "flex",
              gap: "0.3em",
              alignItems: "center",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
            <span style={{ marginTop: "3px" }}>*</span>
          </div>
        ) : (
          <span style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
        )}
      </label>
      <span
        style={{
          borderRadius: token.borderRadius,
          ...borderStyleMemo,
          ...fieldsetStyle,
        }}
        className="ant-float-label-box-fieldset"
      >
        <legend
          className="ant-float-label-box-legend"
          style={{
            maxWidth: focused || hasValue ? "100%" : "0.01px",
          }}
        >
          {label}
        </legend>
      </span>
    </div>
  )
}
