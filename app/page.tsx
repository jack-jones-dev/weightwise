import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Weightwise</h1>
      <p className="text-gray-500 mb-8">Track your weight and reach your goals!</p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Register
        </Link>
      </div>
    </main>
  );
}