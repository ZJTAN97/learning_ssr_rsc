import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/error')({
  component: () => <div>Hello /error!</div>
})