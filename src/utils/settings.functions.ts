import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { getUserFromToken } from '@/utils/auth.server'
import {
  changePasswordSchema,
  updatePreferencesSchema,
  updateProfileSchema,
} from '@/utils/schema/settingsSchema'
import {
  changeUserPassword,
  updateUserPreferences,
  updateUserProfile,
} from '@/utils/settings.server'

const COOKIE_NAME = 'auth_token'

async function requireAuth(): Promise<string> {
  const token = getCookie(COOKIE_NAME)

  if (!token) {
    throw new Error('Not authenticated')
  }

  const user = await getUserFromToken(token)

  if (!user) {
    throw new Error('Invalid session')
  }

  return user.id
}

export const updateProfile = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateProfileSchema.parse(data))
  .handler(async ({ data }) => {
    const userId = await requireAuth()
    return updateUserProfile(userId, data)
  })

export const changePassword = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => changePasswordSchema.parse(data))
  .handler(async ({ data }) => {
    const userId = await requireAuth()
    return changeUserPassword(userId, data)
  })

export const updatePreferences = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updatePreferencesSchema.parse(data))
  .handler(async ({ data }) => {
    const userId = await requireAuth()
    return updateUserPreferences(userId, data)
  })
