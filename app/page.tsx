import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center max-w-2xl px-8">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">
          Weight<span className="text-blue-500">wise</span>
        </h1>
        <p className="text-xl text-slate-500 mb-12">
          Track your weight, monitor your body fat, and reach your goals!
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="bg-white text-slate-800 px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors font-medium border border-slate-200"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}