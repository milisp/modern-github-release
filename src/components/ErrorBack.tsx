import { useNavigate } from 'react-router-dom'

function ErrorBack({ message }: { message: string }) {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading repository data</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{message}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/')}
                  className="bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition duration-200"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorBack
