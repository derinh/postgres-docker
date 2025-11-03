import React, { createContext, useContext, useEffect, useState } from 'react'
import { login as apiLogin, me as apiMe, refresh as apiRefresh, logout as apiLogout } from '../api/auth'

type User = { id: number; email: string; is_active: boolean }

type AuthCtx = {
user: User | null
login: (email: string, password: string) => Promise<void>
logout: () => void
loading: boolean
}

const Ctx = createContext<AuthCtx>({ user: null, login: async () => {}, logout: () => {}, loading: true })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [user, setUser] = useState<User | null>(null)
const [loading, setLoading] = useState(true)

async function bootstrap() {
try {
const u = await apiMe(); setUser(u)
} catch {
try {
await apiRefresh(); const u = await apiMe(); setUser(u)
} catch { setUser(null) }
} finally { setLoading(false) }
}

useEffect(() => { bootstrap() }, [])

const login = async (email: string, password: string) => {
await apiLogin(email, password)
const u = await apiMe(); setUser(u)
}

const logout = () => { apiLogout(); setUser(null) }

return <Ctx.Provider value={{ user, login, logout, loading }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)