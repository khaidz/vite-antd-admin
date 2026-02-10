import { ConfigProvider } from "antd"
import enUS from "antd/locale/en_US"
import React from "react"

function AntdTheme({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        token: {
          colorPrimary: "#0066b3",
          borderRadius: 6,
          colorLink: "#0066b3",
          colorLinkHover: "#005c99",
        },
        components: {
          Layout: {
            headerHeight: 60,
            headerBg: "#fff",
            headerPadding: 0,
          },
          Form: {
            itemMarginBottom: 20,
          },
          Table: {
            headerBg: "#0066b3",
            headerSortActiveBg: "#0066b3",
            headerSortHoverBg: "#005c99",
            rowHoverBg: "#f5f5f5",
            headerColor: "#fff",
            headerBorderRadius: 4,
            bodySortBg: "#fff",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntdTheme
