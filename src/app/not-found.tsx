import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex justify-center min-h-[60vh] items-center">
      <div className="w-3/5 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <p className="text-white/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="text-white/90 hover:text-white transition-colors duration-300 relative group inline-block"
        >
          Return Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
        </Link>
      </div>
    </div>
  );
} 