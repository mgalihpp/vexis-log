import { useState } from 'react'
import { Shield, User } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const ProfileSection = () => {
  // Profile state
  const [profileName, setProfileName] = useState('Trader')
  const [profileEmail, setProfileEmail] = useState('trader@example.com')

  return (
    <div className="space-y-6">
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Informasi Profil
          </CardTitle>
          <CardDescription>Atur nama dan email akun kamu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="trade-input"
              placeholder="Nama kamu"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              className="trade-input"
              placeholder="email@example.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Keamanan
          </CardTitle>
          <CardDescription>Ubah password akun</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-pw">Password Saat Ini</Label>
            <Input
              id="current-pw"
              type="password"
              className="trade-input"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-pw">Password Baru</Label>
            <Input
              id="new-pw"
              type="password"
              className="trade-input"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-pw">Konfirmasi Password</Label>
            <Input
              id="confirm-pw"
              type="password"
              className="trade-input"
              placeholder="••••••••"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
