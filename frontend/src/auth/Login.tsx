import React, { useState } from 'react'
import { useAuth } from './AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
const { login } = useAuth()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState<string | null>(null)
const nav = useNavigate()

const onSubmit = async (e: React.FormEvent) => {
e.preventDefault()
try { await login(email, password); nav('/') }
catch (err: any) { setError(err?.response?.data?.detail ?? 'Login failed') }
}

return (
<form onSubmit={onSubmit} style={{display:'grid', gap:8, maxWidth:320}}>
<h2>Login</h2>
{error && <p style={{color:'red'}}>{error}</p>}
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
<button>Login</button>
<p>No account? <Link to="/register">Register</Link></p>
</form>
)
}