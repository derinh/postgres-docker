import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import Login from './auth/Login'
import Register from './auth/Register'

function Home() {
const { user, logout } = useAuth()
return (
<div style={{display:'grid', gap:12}}>
<h1>Home</h1>
{user ? (
<>
<p>Logged in as {user.email}</p>
<button onClick={logout}>Logout</button>
</>
) : (<Link to="/login">Login</Link>)}
</div>
)
}

export default function App() {
return (
<AuthProvider>
<BrowserRouter>
<Routes>
<Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />
</Routes>
</BrowserRouter>
</AuthProvider>
)
}
