import { useRouteContext } from '@tanstack/react-router'

type Props = {
  children: React.ReactNode
}

export const AuthComponent = ({ children }: Props) => {
  const auth = useRouteContext({
    from: '/',
    select: (ctx) => ctx.auth,
  })

  if (!auth.user) return null

  return <> {children} </>
}

export const UnAuthComponent = ({ children }: Props) => {
  const auth = useRouteContext({
    from: '/',
    select: (ctx) => ctx.auth,
  })

  if (auth.user) return null

  return <> {children} </>
}
