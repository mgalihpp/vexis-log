type FeedbackToastProps = {
  kind: 'success' | 'error'
  message: string
  onDismiss?: () => void
}

const kindStyles: Record<FeedbackToastProps['kind'], string> = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-destructive text-destructive-foreground',
}

export function FeedbackToast({
  kind,
  message,
  onDismiss,
}: FeedbackToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-lg px-4 py-3 shadow-lg ${kindStyles[kind]}`}
      role="status"
    >
      <p className="text-sm font-medium">{message}</p>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="text-sm font-semibold opacity-80 transition hover:opacity-100"
        >
          Close
        </button>
      ) : null}
    </div>
  )
}
