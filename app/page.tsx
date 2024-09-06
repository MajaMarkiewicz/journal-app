import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white bg-red-400/50">
      <div className="w-full max-w-[600px]">
        <h1 className="text-6xl mb-4 text-blue-900">Your journal</h1>
        <p className="text-2xl mb-4">
          Improve your wellbeing by focusing on reasons to be grateful and
          satisfied!
        </p>
        <div>
          <Link href="/journal">
            <button
              type="button"
              className="bg-blue-900 px-4 py-2 rounded-lg text-xl"
            >
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
