import { notFound } from 'next/navigation'

// Block the /brain route from being accessible via the web
export default function BrainPage() {
  notFound()
}
