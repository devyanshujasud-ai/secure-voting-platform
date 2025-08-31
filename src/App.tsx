import { useState, useEffect, createContext, useContext } from 'react'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthService } from "@/lib/auth";
import { supabase } from "@/lib/supabase"; // Add this import

// Your existing imports...
import Home from "./pages/Home";
import Register from "./pages/Register";
import FaceVerification from "./pages/FaceVerification";
import Dashboard from "./pages/Dashboard";
import Polls from "./pages/Polls";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Info from "./pages/Info";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Auth Context
export const AuthContext = createContext<{
  user: any | null
  loading: boolean
  signOut: () => Promise<void>
}>({
  user: null,
  loading: true,
  signOut: async () => {}
})

export const useAuth = () => useContext(AuthContext)

const App = () => {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TEST SUPABASE CONNECTION ON APP LOAD
    const testSupabaseConnection = async () => {
      try {
        console.log('🧪 Testing Supabase connection...')
        console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
        console.log('Key exists:', !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
        
        // Test database connection
        const { data, error } = await supabase.from('users').select('count')
        
        if (error) {
          console.error('❌ Database connection failed:', error)
        } else {
          console.log('✅ Database connection successful!', data)
        }

        // Test auth connection
        const { data: authData, error: authError } = await supabase.auth.getSession()
        
        if (authError) {
          console.error('❌ Auth connection failed:', authError)
        } else {
          console.log('✅ Auth connection successful!')
        }

      } catch (error) {
        console.error('❌ Supabase connection test failed:', error)
      }
    }

    testSupabaseConnection()

    // Initialize auth state
    AuthService.getCurrentUser()
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false))

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const contextValue = {
    user,
    loading,
    signOut: async () => {
      await AuthService.signOut()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/face-verification" element={<FaceVerification />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/polls" element={<Polls />} />
              <Route path="/vote/:pollId" element={<Vote />} />
              <Route path="/results" element={<Results />} />
              <Route path="/info" element={<Info />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  )
}

export default App;
