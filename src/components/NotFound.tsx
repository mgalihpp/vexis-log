import { Link } from '@tanstack/react-router'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 py-8 md:py-12">
      <Empty className="border-none">
        <EmptyHeader>
          <EmptyMedia
            variant="icon"
            className="size-20 rounded-2xl bg-muted/50"
          >
            <FileQuestion className="size-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle className="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">
            Page not found
          </EmptyTitle>
          <EmptyDescription className="mt-2 text-base text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have
            been removed, renamed, or doesn't exist.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/">Go back home</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to=".." onClick={() => window.history.back()}>
                Go back
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}
