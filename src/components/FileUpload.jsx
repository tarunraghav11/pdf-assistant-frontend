import { useState } from 'react'
import { FiUpload, FiFile, FiCheck } from 'react-icons/fi'

const FileUpload = ({ onProcess, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleTaskClick = (task) => {
    if (selectedFile) onProcess(selectedFile, task)
  }

  return (
    <div>
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="pdf-upload" 
          accept=".pdf" 
          onChange={handleFileChange} 
          className="hidden"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <FiUpload className="h-10 w-10 text-indigo-500 mb-3" />
            {selectedFile ? (
              <div className="flex items-center text-green-600">
                <FiCheck className="mr-2" />
                <span className="font-medium">{selectedFile.name}</span>
              </div>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-700">
                  Drag & drop a PDF file here
                </p>
                <p className="mt-1 text-gray-500">or click to browse files</p>
                <p className="mt-2 text-sm text-gray-400">Supports PDF files only</p>
              </>
            )}
          </div>
        </label>
      </div>

      {selectedFile && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
            Select Task:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['summary', 'notes', 'mcqs'].map((task) => (
              <button
                key={task}
                onClick={() => handleTaskClick(task)}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isLoading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : task === 'summary'
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : task === 'notes'
                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                {task === 'summary' && 'Generate Summary'}
                {task === 'notes' && 'Generate Notes'}
                {task === 'mcqs' && 'Generate MCQs'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload