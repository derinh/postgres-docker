import { api } from './client'

export async function register(email: string, password: string) {
await api.post('/auth/register', { email, password })
}

export async function login(email: string, password: string) {
const { data } = await api.post('/auth/login', { email, password })
localStorage.setItem('access_token', data.access_token)
localStorage.setItem('refresh_token', data.refresh_token)
}

export async function refresh() {
const rt = localStorage.getItem('refresh_token')
if (!rt) throw new Error('no refresh token')
const { data } = await api.post('/auth/refresh', null, { params: { refresh_token: rt } })
localStorage.setItem('access_token', data.access_token)
localStorage.setItem('refresh_token', data.refresh_token)
}

export async function me() {
const { data } = await api.get('/users/me')
return data
}

export function logout() {
localStorage.removeItem('access_token')
localStorage.removeItem('refresh_token')
}