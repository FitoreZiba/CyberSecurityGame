import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider }  from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute    from './components/ProtectedRoute'
import Navbar            from './components/Navbar'

import AuthPage        from './pages/AuthPage'
import Dashboard       from './pages/Dashboard'
import CategoriesPage  from './pages/CategoriesPage'
import GamePage        from './pages/GamePage'
import MissionsPage    from './pages/MissionsPage'
import LeaderboardPage from './pages/LeaderboardPage'
import ProfilePage     from './pages/ProfilePage'
import LearnPage       from './pages/LearnPage'

function Layout({ children }) {
    return (
        <div className="min-h-screen font-body transition-colors duration-300">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>                    <Routes>
                        <Route path="/login"    element={<AuthPage />} />
                        <Route path="/register" element={<AuthPage />} />

                        <Route path="/dashboard"   element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
                        <Route path="/learn"       element={<ProtectedRoute><Layout><LearnPage /></Layout></ProtectedRoute>} />
                        <Route path="/categories"  element={<ProtectedRoute><Layout><CategoriesPage /></Layout></ProtectedRoute>} />
                        <Route path="/game/:id"    element={<ProtectedRoute><Layout><GamePage /></Layout></ProtectedRoute>} />
                        <Route path="/missions"    element={<ProtectedRoute><Layout><MissionsPage /></Layout></ProtectedRoute>} />
                        <Route path="/leaderboard" element={<ProtectedRoute><Layout><LeaderboardPage /></Layout></ProtectedRoute>} />
                        <Route path="/profile"     element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />

                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    )
}