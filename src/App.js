import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const handleDelete = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    return setTours(newTours);
  };
  const fetchAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      throw new Error('unable to fetch API');
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!tours.length) {
    return (
      <main>
        <h2>No tour left</h2>
        <button className='btn' onClick={fetchAPI}>
          refresh
        </button>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} handleDelete={handleDelete} />
    </main>
  );
}
export default App;
