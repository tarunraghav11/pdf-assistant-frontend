import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PreviousResults() {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('https://pdf-backend-new-hdcdgxh4bpe6e9fu.centralindia-01.azurewebsites.net/api/userdata/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    fetchHistory();
  }, [token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Previous Results</h2>
      {history.length > 0 ? (
        history.map((item, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <p><strong>Task:</strong> {item.task}</p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
            <pre className="mt-2 whitespace-pre-wrap text-sm break-words">
              {typeof item.result === 'string'
                ? item.result.replace(/\\n/g, '\n')
                : JSON.stringify(item.result, null, 2)}
            </pre>
          </div>
        ))
      ) : (
        <p>No previous results found.</p>
      )}
    </div>
  );
}
