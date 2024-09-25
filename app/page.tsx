import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full min-h-page-content flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] text-center p-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl mb-4 text-blue-900">
          Your journal
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6">
          Improve your wellbeing by focusing on reasons to be grateful and
          satisfied!
        </p>
        <div>
          <Link href="/journal">
            <button
              type="button"
              className="bg-blue-900 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg sm:text-xl"
            >
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
