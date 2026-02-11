import { Bell, Globe, Moon, Palette, Sun, TrendingUp } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
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

export const AppearanceSection = () => {
  const { theme, setTheme } = useTheme()
  const [compactMode, setCompactMode] = useState(false)
  const [showPnlColor, setShowPnlColor] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('id')

  const isDarkMode = theme === 'dark'

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
  }

  console.log(isDarkMode)

  return (
    <div className="space-y-6">
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            Tema & Display
          </CardTitle>
          <CardDescription>Sesuaikan tampilan aplikasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  Tema gelap untuk mata
                </p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={() => toggleDarkMode(!isDarkMode)}
            />
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Compact Mode</p>
                <p className="text-xs text-muted-foreground">
                  Tampilan lebih padat
                </p>
              </div>
            </div>
            <Switch checked={compactMode} onCheckedChange={setCompactMode} />
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Warna P&L</p>
                <p className="text-xs text-muted-foreground">
                  Hijau untuk profit, merah untuk loss
                </p>
              </div>
            </div>
            <Switch checked={showPnlColor} onCheckedChange={setShowPnlColor} />
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Notifikasi</p>
                <p className="text-xs text-muted-foreground">
                  Reminder & alert
                </p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Bahasa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="trade-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">Bahasa Indonesia</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
