import "@/styles/style.css"
import "@/styles/employeeTable.css"
import "@/styles/home.css"
import "@/styles/login.css"
import "@/styles/navbar.css"
import "@/styles/profile.css"
import "@/styles/toast.css"



import { GlobalProvider } from "@/context/global-context"
import { IntlProvider } from 'next-intl'
import { AuthProvider } from "@/context/AuthContext"
import ProtectedRoute from "@/utils/ProtectedRoute"


export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GlobalProvider>
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      </GlobalProvider>
    </AuthProvider>
  );
}
