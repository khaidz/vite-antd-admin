import { InputNumber, type InputNumberProps } from "antd";
import { useCallback } from "react";
import { FloatingLabelBox, type FloatingLabelBoxProps } from "../FloatingLabelBox";
import { useValueHandle } from "../../../hooks/use-value-handle";

export interface FloatInputNumberProps extends InputNumberProps {
  required?: boolean
  labelBoxProps?: FloatingLabelBoxProps;
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
  const { hasValue, handleChange, handleBlur, handleFocus, isFocus } =
    useValueHandle({
      id: restProps.id,
      defaultValue,
      value,
      onFocus,
      onBlur,
    });

  const changeHanlder = useCallback<
    Exclude<InputNumberProps["onChange"], undefined>
  >(
    (value) => {
      handleChange(value);
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <FloatingLabelBox
      label={placeholder}
      focused={isFocus}
      hasValue={hasValue}
      width={style?.width}
      height={style?.height}
      required={required}
      status={
        restProps.status || (restProps["aria-invalid"] ? "error" : undefined)
      }
      {...labelBoxProps}
      variant={variant}
    >
      <InputNumber
        style={{ ...style, width: "100%", border: "none" }}
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
  );
}
