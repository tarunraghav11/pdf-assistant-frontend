import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-700">PDF Assistant</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-900">Home</Link>
        <Link to="/dashboard/results" className="text-indigo-600 hover:text-indigo-900">Previous Results</Link>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}
