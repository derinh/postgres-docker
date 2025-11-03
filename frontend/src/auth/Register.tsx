import React, { useState } from 'react'
import { register as apiRegister } from '../api/auth'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState<string | null>(null)
const nav = useNavigate()

const onSubmit = async (e: React.FormEvent) => {
e.preventDefault()
try { await apiRegister(email, password); nav('/login') }
catch (err: any) { setError(err?.response?.data?.detail ?? 'Registration failed') }
}

return (
<form onSubmit={onSubmit} style={{display:'grid', gap:8, maxWidth:320}}>
<h2>Register</h2>
{error && <p style={{color:'red'}}>{error}</p>}
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
<input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
<button>Create account</button>
<p>Have an account? <Link to="/login">Login</Link></p>
</form>
)
}