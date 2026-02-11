import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Route as RouteIcon,
  Server,
  Shield,
  Sparkles,
  Waves,
  Zap,
} from 'lucide-react'
import Header from '@/components/Header'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const features = [
    {
      icon: <Zap className="w-12 h-12 text-cyan-400" />,
      title: 'Quick Trade Entry',
      description:
        'Log your trades in seconds with smart forms. Auto-calculate risk/reward, position sizing, and more.',
    },
    {
      icon: <Server className="w-12 h-12 text-cyan-400" />,
      title: 'Detailed Analytics',
      description:
        'Track win rate, profit factor, equity curve, and performance metrics. All calculated automatically.',
    },
    {
      icon: <RouteIcon className="w-12 h-12 text-cyan-400" />,
      title: 'Trade Review',
      description:
        'Review each trade with pre and post analysis. Identify patterns and improve your strategy.',
    },
    {
      icon: <Shield className="w-12 h-12 text-cyan-400" />,
      title: 'Secure & Private',
      description:
        'Your data is encrypted and stored securely. Only you can access your trading journal.',
    },
    {
      icon: <Waves className="w-12 h-12 text-cyan-400" />,
      title: 'Multi-Market Support',
      description:
        'Track stocks, forex, crypto, and futures. All in one place with market-specific fields.',
    },
    {
      icon: <Sparkles className="w-12 h-12 text-cyan-400" />,
      title: 'Dark Mode Ready',
      description:
        'Beautiful dark and light themes. Comfortable trading journal for any time of day.',
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <section className="relative py-20 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
          <div className="relative max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-6 mb-6">
              <img
                src="/logo.png"
                alt="Vexis Log"
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl"
              />
              <h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
                <span className="text-gray-300">VEXIS</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  LOG
                </span>
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
              Your Trading Journal for Better Performance
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Track, analyze, and improve your trades with a professional
              journal that helps you identify patterns and grow as a trader.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/login"
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
