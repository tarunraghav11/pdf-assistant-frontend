import { useState } from 'react'
import FileUpload from './components/FileUpload'
import ResultsDisplay from './components/ResultsDisplay'
import './App.css'

function App() {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTask, setActiveTask] = useState(null)

  const handleProcess = async (file, task) => {
    setIsLoading(true)
    setError(null)
    setActiveTask(task)

    try {
      const formData = new FormData()
      formData.append('pdf', file)
      formData.append('task', task)

      const API_URL = process.env.REACT_APP_API_URL || 'https://your-vercel-backend.vercel.app';
      const response = await fetch(`${API_URL}/api/process`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Processing failed')
      
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="py-12 text-center">
        <h1 className="text-4xl font-bold text-indigo-800">PDF Learning Assistant</h1>
        <p className="mt-2 text-lg text-indigo-600">
          Upload a PDF to generate summaries, notes, or MCQs
        </p>
      </header>

      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <FileUpload onProcess={handleProcess} isLoading={isLoading} />
          
          {isLoading && (
            <div className="mt-8 text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
              <p className="mt-4 text-indigo-700">Processing your PDF...</p>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>Error: {error}</p>
            </div>
          )}

          {result && !isLoading && (
            <ResultsDisplay 
              result={result.result} 
              task={result.task || activeTask} 
            />
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-indigo-600">
        <p>Powered by TARUN-DON</p>
      </footer>
    </div>
  )
}

export default App