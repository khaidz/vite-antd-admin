import { ConfigProvider } from "antd"
import enUS from "antd/locale/en_US"
import React from "react"

function AntdTheme({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        token: {
          borderRadius: 6,
          colorLink: "#0066b3",
          colorLinkHover: "#005c99",

          colorPrimary: "#0066b3",
          colorPrimaryBg: "#0066b3",
          colorPrimaryBgHover: "#1f7fbf",
          colorPrimaryBorder: "#005c99",
          colorPrimaryText: "#fff",
          colorPrimaryHover: "#1f7fbf",
          colorPrimaryActive: "#005c99",

          colorWarning: "#fdb913",
          colorWarningBg: "#fdb913",
          colorWarningBgHover: "#fdc22b",
          colorWarningBorder: "#f7b510",
          colorWarningText: "#000",
          colorWarningHover: "#fdc22b",
          colorWarningActive: "#f7b510",
        },
        components: {
          Layout: {
            headerHeight: 60,
            headerBg: "#fff",
            headerPadding: 0,
          },
          Form: {
            itemMarginBottom: 0,
          },
          Table: {
            headerBg: "#0066b3",
            headerSortActiveBg: "#0066b3",
            headerSortHoverBg: "#005c99",
            rowHoverBg: "#f5f5f5",
            headerColor: "#fff",
            headerBorderRadius: 4,
            bodySortBg: "#fff",
            cellPaddingBlockSM: 4,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntdTheme
