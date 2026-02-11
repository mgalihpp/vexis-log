import { createServerFn } from '@tanstack/react-start'
import {
  deleteCookie,
  getCookie,
  setCookie,
} from '@tanstack/react-start/server'
import { loginSchema, registerSchema } from '@/utils/schema/authSchema'
import {
  authenticateUser,
  createUser,
  generateToken,
  getUserFromToken,
} from '@/utils/auth.server'

const COOKIE_NAME = 'auth_token'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
}

export const getAuthSession = createServerFn({
  method: 'GET',
}).handler(async () => {
  const token = getCookie(COOKIE_NAME)

  if (!token) {
    return null
  }

  return getUserFromToken(token)
})

export const register = createServerFn({
  method: 'POST',
})
  .inputValidator((data: unknown) => registerSchema.parse(data))
  .handler(async ({ data }) => {
    const user = await createUser(data)
    const token = generateToken(user)
    setCookie(COOKIE_NAME, token, COOKIE_OPTIONS)
    return user
  })

export const login = createServerFn({
  method: 'POST',
})
  .inputValidator((data: unknown) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    const user = await authenticateUser(data)
    const token = generateToken(user)
    setCookie(COOKIE_NAME, token, COOKIE_OPTIONS)
    return user
  })

export const logout = createServerFn({
  method: 'POST',
}).handler(() => {
  deleteCookie(COOKIE_NAME, COOKIE_OPTIONS)
  return { success: true }
})
