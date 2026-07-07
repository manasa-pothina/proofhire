import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get('/auth/me')
      .then(({ data }) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  async function testAI() {
    setError('');
    setAiResponse('Thinking...');
    try {
      const { data } = await axiosClient.post('/ai/generate', {
        prompt: 'Say hello in one sentence.',
      });
      setAiResponse(data.text);
    } catch (err) {
      setError(err.response?.data?.message || 'AI call failed');
      setAiResponse('');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {user && (
        <p>
          Logged in as <strong>{user.name}</strong> ({user.email})
        </p>
      )}
      <button onClick={testAI}>Test Gemini API call</button>
      {aiResponse && <p>{aiResponse}</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={logout}>Log out</button>
    </div>
  );
}
