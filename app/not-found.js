import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">404 - Food Not Found</h1>
      <p className="text-lg">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link href="/">
        <span className="text-indigo-400 hover:text-indigo-300 mt-4 cursor-pointer transition-all duration-300 hover:underline">
             Go back home
        </span>
      </Link>
    </div>
  );
}
