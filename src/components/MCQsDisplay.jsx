import { useState } from 'react'

const MCQsDisplay = ({ content }) => {
  const parseMCQs = (text) => {
    return text.split('\n\n').filter(q => q.trim()).slice(0, 10)
  }

  const [selectedOptions, setSelectedOptions] = useState({})
  const [showAnswers, setShowAnswers] = useState(false)

  const mcqs = parseMCQs(content)

  const handleOptionSelect = (qIndex, oIndex) => {
    setSelectedOptions(prev => ({ ...prev, [qIndex]: oIndex }))
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
      >
        {showAnswers ? 'Hide Answers' : 'Show Answers'}
      </button>

      {mcqs.map((question, qIndex) => {
        const lines = question.split('\n').filter(l => l.trim())
        const qText = lines[0]?.replace(/^Q\d+\.\s*/, '')
        const options = lines.slice(1, 5)
        const answerLine = lines.find(l => l.startsWith('Answer:'))
        const correctAnswer = answerLine?.split(':')[1]?.trim()

        return (
          <div key={qIndex} className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {qIndex + 1}. {qText}
            </h3>
            
            <div className="space-y-3">
              {options.map((option, oIndex) => {
                const optionLetter = String.fromCharCode(65 + oIndex)
                const isSelected = selectedOptions[qIndex] === oIndex
                const isCorrect = optionLetter === correctAnswer
                
                return (
                  <div
                    key={oIndex}
                    onClick={() => handleOptionSelect(qIndex, oIndex)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
                    } ${
                      showAnswers && isCorrect ? 'bg-green-50 border-green-500' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                        isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-gray-400'
                      } ${
                        showAnswers && isCorrect ? 'bg-green-500 border-green-500' : ''
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span>{option}</span>
                      {showAnswers && isCorrect && (
                        <span className="ml-auto text-green-600">✓ Correct</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {showAnswers && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
                Correct answer: <span className="font-medium">{correctAnswer}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MCQsDisplay