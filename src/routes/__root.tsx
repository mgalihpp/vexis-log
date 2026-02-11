import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import appCss from '../styles.css?url'
import type { QueryClient } from '@tanstack/react-query'
import '@fontsource/geist-sans'
import '@fontsource/geist-mono'
import type { SafeUser } from '@/utils/auth.server'
import { ThemeProvider } from '@/components/Theme-Provider'
import {
  FeedbackToastHost,
  FeedbackToastProvider,
} from '@/hooks/use-feedback-toast'
import { NotFound } from '@/components/NotFound'
import { getAuthSession } from '@/utils/auth.functions'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  auth: { user: SafeUser | null }
}>()({
  beforeLoad: async () => {
    const user = await getAuthSession()
    return {
      auth: { user },
    }
  },
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Vexis Log',
      },
      {
        name: 'description',
        content:
          'Vexis Log - Trading Journal that help you track your trades and improve your trading performance.',
      },
      {
        name: 'keywords',
        content: 'Vexis Log, Trading Journal, Trading, Journal',
      },
      {
        name: 'author',
        content: 'mgalihpp',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/logo.png',
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vite-ui-theme')||'system';if(t==='system'){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.classList.add(t)}catch(e){}})()`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <FeedbackToastProvider>
            {children}
            <FeedbackToastHost />
          </FeedbackToastProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            {
              name: 'React Query',
              render: <ReactQueryDevtools initialIsOpen={false} />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
