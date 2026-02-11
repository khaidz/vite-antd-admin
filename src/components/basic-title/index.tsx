import { theme, Typography } from "antd"

function BasicTitle({ children, color, style, ...rest }: React.ComponentProps<typeof Typography.Title>) {
  const { token } = theme.useToken()
  const { Title } = Typography

  return (
    <Title level={5} style={{ color: color || token.colorPrimary, fontWeight: 500, ...style }} {...rest}>
      {children}
    </Title>
  )
}

export default BasicTitle
