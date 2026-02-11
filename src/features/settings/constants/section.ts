import { Palette, User } from 'lucide-react'

export const SECTIONS = [
  { value: 'profile', label: 'Profile & Account', icon: User },
  // { value: 'trading', label: 'Trading Preferences', icon: TrendingUp },
  { value: 'appearance', label: 'Appearance & Theme', icon: Palette },
  // { value: 'data', label: 'Data Management', icon: Database },
] as const
