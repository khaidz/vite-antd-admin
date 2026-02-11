import { InputNumber, Space, type InputNumberProps } from "antd"
import { useCallback } from "react"
import { useValueHandle } from "../../../hooks/use-value-handle"
import { FloatingLabelBox, type FloatingLabelBoxProps } from "../FloatingLabelBox"
import { UserOutlined } from "@ant-design/icons"

export interface FloatInputMoneyProps extends InputNumberProps {
  required?: boolean
  labelBoxProps?: FloatingLabelBoxProps
}

export function FloatInputMoney({
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
}: FloatInputMoneyProps) {
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
      <Space.Compact block>
        <InputNumber
          style={{ ...style, width: "100%", border: "none" }}
          decimalSeparator=","
          step={1}
          precision={0}
          formatter={value => (value?.toString() || "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={value => (value?.replace(/,/g, "") ?? "") as string | number}
          onCopy={e => {
            e.preventDefault()
            const rawValue = e.currentTarget.value.replace(/,/g, "")
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
        <Space.Addon style={{ margin: 1, border: "none" }}>VNĐ</Space.Addon>
      </Space.Compact>
    </FloatingLabelBox>
  )
}
