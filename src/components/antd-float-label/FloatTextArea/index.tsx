import { Input } from "antd"
import type { TextAreaProps } from "antd/es/input"
import { useCallback } from "react"
import { useValueHandle } from "../../../hooks/use-value-handle"
import { FloatingLabelBox, type FloatingLabelBoxProps } from "../FloatingLabelBox"

const { TextArea } = Input

export interface FloatTextAreaProps extends TextAreaProps {
  required?: boolean
  labelBoxProps?: FloatingLabelBoxProps
}

export function FloatTextArea({
  placeholder,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  style,
  required,
  labelBoxProps,
  variant,
  ...restProps
}: FloatTextAreaProps) {
  const { hasValue, handleChange, handleBlur, handleFocus, isFocus } = useValueHandle({
    id: restProps.id,
    defaultValue,
    value,
    onFocus,
    onBlur,
  })

  const changeHandler = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    e => {
      handleChange(e.target.value)
      onChange?.(e)
    },
    [onChange]
  )

  return (
    <FloatingLabelBox
      label={placeholder}
      focused={isFocus}
      hasValue={hasValue}
      width={style?.width}
      height={style?.height || "auto"}
      required={required}
      status={restProps.status || (restProps["aria-invalid"] ? "error" : undefined)}
      variant={variant}
      labelPosition="top"
      {...labelBoxProps}
    >
      <TextArea
        {...restProps}
        style={{ height: style?.height || "auto", ...style, width: "100%", border: "none" }}
        variant="borderless"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        defaultValue={defaultValue}
        onChange={changeHandler}
      />
    </FloatingLabelBox>
  )
}
