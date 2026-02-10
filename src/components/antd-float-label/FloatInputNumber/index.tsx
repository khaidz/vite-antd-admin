import { InputNumber, type InputNumberProps } from "antd"
import { useCallback } from "react"
import { useValueHandle } from "../../../hooks/use-value-handle"
import { FloatingLabelBox, type FloatingLabelBoxProps } from "../FloatingLabelBox"

export interface FloatInputNumberProps extends InputNumberProps {
  required?: boolean
  labelBoxProps?: FloatingLabelBoxProps
}

export function FloatInputNumber({
  placeholder,
  onFocus,
  onBlur,
  value,
  defaultValue,
  style,
  onChange,
  required,
  labelBoxProps,
  variant,
  ...restProps
}: FloatInputNumberProps) {
  const { hasValue, handleChange, handleBlur, handleFocus, isFocus } = useValueHandle({
    id: restProps.id,
    defaultValue,
    value,
    onFocus,
    onBlur,
  })

  const changeHanlder = useCallback<Exclude<InputNumberProps["onChange"], undefined>>(
    value => {
      handleChange(value)
      if (onChange) {
        onChange(value)
      }
    },
    [onChange]
  )

  return (
    <FloatingLabelBox
      label={placeholder}
      focused={isFocus}
      hasValue={hasValue}
      width={style?.width}
      height={style?.height}
      required={required}
      status={restProps.status || (restProps["aria-invalid"] ? "error" : undefined)}
      {...labelBoxProps}
      variant={variant}
    >
      <InputNumber
        style={{ ...style, width: "100%", border: "none" }}
        decimalSeparator=","
        formatter={value => {
          if (value === undefined || value === null) return ""
          const [int, dec] = value.toString().split(".")
          return int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (dec !== undefined ? `.${dec}` : "")
        }}
        parser={value => {
          if (!value) return ""
          return value.replace(/,/g, "")
        }}
        onCopy={e => {
          e.preventDefault()
          const rawValue = e.currentTarget.value.replace(/[.,]/g, "")
          e.clipboardData.setData("text/plain", rawValue)
        }}
        {...restProps}
        variant="borderless"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        defaultValue={defaultValue}
        onChange={changeHanlder}
        rootClassName="ant-float-label-form-input-number"
      />
    </FloatingLabelBox>
  )
}
