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

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
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
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
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
