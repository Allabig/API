import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponent';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && data.length === 0 && <p>No posts available.</p>}
      {!loading && !error && data.length > 0 && (
        <ListComponent
          items={data}
          renderItem={(item) => (
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default App;
