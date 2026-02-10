import PageTransition from "@/components/page-transition"
import BlankLayout from "@/layout/blank-layout"
import DashboardLayout from "@/layout/dashboard-layout"
import Dashboard from "@/pages/dashboard"
import Service from "@/pages/service"
import { ErrorBoundary } from "@ant-design/pro-components"
import { AnimatePresence } from "framer-motion"
import React from "react"
import { Route, Routes, useLocation } from "react-router"

type RouteType = {
  path: string
  component?: React.ReactNode
}

const privateRoutes: RouteType[] = [
  { path: "/", component: <Dashboard /> },
  { path: "/service", component: <Service /> },
]
const publicRoutes: RouteType[] = []

function AppRoutes() {
  const location = useLocation()
  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {privateRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <DashboardLayout>
                  <PageTransition>{route.component ? route.component : undefined}</PageTransition>
                </DashboardLayout>
              }
            />
          ))}
          {publicRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PageTransition>
                  <BlankLayout>{route.component ? route.component : undefined}</BlankLayout>
                </PageTransition>
              }
            />
          ))}

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

export default AppRoutes
