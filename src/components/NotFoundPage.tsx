import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-2xl place-content-center p-8 text-center">
      <p aria-hidden="true" className="font-display text-8xl text-gold/40">
        ☾
      </p>
      <h1 className="mt-4 text-4xl text-parchment">
        This page isn’t in our stars
      </h1>
      <p className="mt-4 mb-8 text-parchment/65">
        The page or consultation you were looking for doesn’t exist.
      </p>
      <Link to="/" className="action mx-auto">
        Return home
      </Link>
    </main>
  )
}
