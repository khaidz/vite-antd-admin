import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Layout } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import React from "react"
import { Link } from "react-router"
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="dashboard-layout">
      <Header className="shadow-md">
        <div className="container mx-auto flex justify-between items-center px-3 md:px-8">
          <Link to="/" className="no-underline">
            <div className="left flex items-center gap-2 font-medium text-[16px] text-black">
              <div className="logo-symbol">
                <HomeOutlined />
              </div>
              <div className="logo-text hidden md:block">Hệ thống </div>
              <div className="logo-text block md:hidden">123123</div>
            </div>
          </Link>

          <div className="right">
            <Dropdown
              placement="bottomRight"
              menu={{
                items: [
                  { key: "1", label: "Welcome, ABC" },
                  { type: "divider" },
                  { key: "2", label: "Logout", icon: <LogoutOutlined /> },
                ],
                style: { minWidth: 120 },
              }}
            >
              <a onClick={e => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} size={40} className="!bg-gray-300" />
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content className="container mx-auto my-4 px-3">
        <Link to="/">Dashboard</Link>
        <Link to="/service" className="ml-4">
          Service
        </Link>
        <div className="content-area bg-white p-6 rounded-md shadow-sm min-h-[calc(100vh-100px)]">{children}</div>
      </Content>
    </Layout>
  )
}
export default DashboardLayout
