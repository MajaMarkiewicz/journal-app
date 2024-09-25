import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-page-content flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto flex flex-col items-center text-center">
        <FaExclamationTriangle className="fa-5x text-8xl text-yellow-400 mb-4" />
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-xl mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link href="/">
          <button
            type="button"
            className="bg-blue-900 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg sm:text-xl text-white"
          >
            Go home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
