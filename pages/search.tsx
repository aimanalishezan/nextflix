import { useState } from 'react';
import Layout from '../components/Layout'; // adjust path if needed
import { Media } from '../types';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Media[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.type === 'Success') {
        setResults(data.data);
      } else {
        setError('Something went wrong.');
      }
    } catch (err) {
      setError('Failed to fetch.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Search TMDB</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies, TV shows, or people..."
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul className="grid gap-4">
        {results.map((item) => (
        <li key={item.id} className="border p-3 rounded shadow">
        <h3 className="font-semibold">{item.title || item.name}</h3>
        <p className="text-sm text-gray-500">{item.media_type}</p>
        </li>
    ))}
</ul>

      </div>
    </Layout>
  );
}
