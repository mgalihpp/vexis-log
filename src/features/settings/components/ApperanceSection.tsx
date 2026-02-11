import { Globe, Moon, Palette } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/hooks/useAuth'
import { updatePreferences } from '@/utils/settings.functions'

type ThemePreference = 'dark' | 'light' | 'system'
type LanguagePreference = 'id' | 'en'

export const AppearanceSection = () => {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const userTheme = (user?.theme as ThemePreference | null) ?? null
  const userLanguage = (user?.language as LanguagePreference | null) ?? null

  useEffect(() => {
    if (userTheme) {
      setTheme(userTheme)
    }
  }, [setTheme, userTheme])

  const currentTheme =
    theme === 'dark' || theme === 'light' || theme === 'system'
      ? theme
      : (userTheme ?? 'dark')
  const currentLanguage = userLanguage ?? 'id'

  const preferencesMutation = useMutation({
    mutationFn: (data: {
      theme: ThemePreference
      language: LanguagePreference
    }) => updatePreferences({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'session'] })
    },
  })

  const isDarkMode = theme === 'dark'

  const toggleDarkMode = (checked: boolean) => {
    const newTheme: ThemePreference = checked ? 'dark' : 'light'
    setTheme(newTheme)

    preferencesMutation.mutate({
      theme: newTheme,
      language: currentLanguage,
    })
  }

  const handleLanguageChange = (value: string) => {
    const nextLanguage = value as LanguagePreference

    preferencesMutation.mutate({
      theme: currentTheme,
      language: nextLanguage,
    })
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            Theme & Display
          </CardTitle>
          <CardDescription>Customize application appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  Dark theme for your eyes
                </p>
              </div>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            defaultValue={currentLanguage}
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="trade-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">Indonesian</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
