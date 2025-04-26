import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./bootstrap.css"
import LoadingSpinner from "./components/spinner.tsx"
import "./index.css"
import { store } from "./redux/store.ts"
import router from "./router.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<LoadingSpinner />}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="colored"
          draggable
          transition={Slide}
        />
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
)
