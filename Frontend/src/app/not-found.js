import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming shadcn button

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-8">
        Page Not Found
      </h2>
      <p className="text-base text-muted-foreground mb-10 max-w-sm">
        The page you were looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link href="/" passHref>
        <Button variant="outline" className="text-lg">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
}