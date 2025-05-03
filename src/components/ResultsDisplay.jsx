import MCQsDisplay from './MCQsDisplay'

const ResultsDisplay = ({ result, task }) => {
  const renderContent = () => {
    if (task === 'mcqs') {
      return <MCQsDisplay content={result} />
    } else {
      return (
        <div className={`mt-6 p-6 bg-gray-50 rounded-lg ${
          task === 'notes' ? 'prose-ul:list-disc prose-li:my-1' : ''
        }`}>
          {result.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      )
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {task === 'summary' && 'Summary'}
        {task === 'notes' && 'Key Notes'}
        {task === 'mcqs' && 'Multiple Choice Questions'}
      </h2>
      {renderContent()}
    </div>
  )
}

export default ResultsDisplay