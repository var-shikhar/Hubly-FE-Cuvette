import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import AuthWrapper from "./pages/privateRoutes"

// Import Pages Dynamically (Lazy Loading for Better Performance)
const LANDING_PAGE = lazy(() => import("./pages/landing/landing"))
const PRIVACY_POLICY_PAGE = lazy(() => import("./pages/landing/privacy-poilcy"))
const TERMS_CONDITION_PAGE = lazy(
  () => import("./pages/landing/terms-condition")
)
const SIGN_IN_PAGE = lazy(() => import("./pages/auth/sign-in"))
const SIGN_UP_PAGE = lazy(() => import("./pages/auth/sign-up"))
const DASHBOARD_LAYOUT = lazy(() => import("./pages/dashboard/layout"))
const DASHBOARD_PAGE = lazy(() => import("./pages/dashboard/dashboard"))
const CHAT_PAGE = lazy(() => import("./pages/dashboard/chat"))
const ANALYTICS_PAGE = lazy(() => import("./pages/dashboard/analytics"))
const CHATBOT_SETTING_PAGE = lazy(
  () => import("./pages/dashboard/chat-bot-setting")
)
const TEAMS_PAGE = lazy(() => import("./pages/dashboard/teams"))
const SETTINGS_PAGE = lazy(() => import("./pages/dashboard/setting"))
const PUBLIC_ERROR_PAGE = lazy(() => import("./pages/landing/public-error"))
const PRIVATE_ERROR_PAGE = lazy(() => import("./pages/landing/private-error"))

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    errorElement: <PUBLIC_ERROR_PAGE />,
    children: [
      { index: true, element: <LANDING_PAGE /> },
      { path: "privacy-policy", element: <PRIVACY_POLICY_PAGE /> },
      { path: "terms-and-conditions", element: <TERMS_CONDITION_PAGE /> },
      {
        path: "auth/sign-in",
        element: <AuthWrapper mode="Auth" element={<SIGN_IN_PAGE />} />,
      },
      {
        path: "auth/sign-up",
        element: <AuthWrapper mode="Auth" element={<SIGN_UP_PAGE />} />,
      },
    ],
  },

  // Private Routes (Dashboard as Layout)
  {
    path: "/app",
    element: <AuthWrapper mode="Private" element={<DASHBOARD_LAYOUT />} />,
    errorElement: <PRIVATE_ERROR_PAGE />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DASHBOARD_PAGE />,
      },
      {
        path: "chat",
        element: <CHAT_PAGE />,
      },
      {
        path: "chat/:id",
        element: <CHAT_PAGE isDirect />,
      },
      {
        path: "analytics",
        element: <ANALYTICS_PAGE />,
      },
      {
        path: "chat-bot-settings",
        element: <CHATBOT_SETTING_PAGE />,
      },
      {
        path: "teams",
        element: <TEAMS_PAGE />,
      },
      {
        path: "teams/:id",
        element: <SETTINGS_PAGE isChild />,
      },
      {
        path: "settings",
        element: <SETTINGS_PAGE />,
      },
    ],
  },

  // Error Pages
  { path: "/404", element: <PUBLIC_ERROR_PAGE /> },
  // Redirect unknown routes to home
  { path: "*", element: <Navigate to="/404" replace /> },
])

export default router
