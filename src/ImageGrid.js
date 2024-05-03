import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageGrid.css'; // Import custom CSS for styling

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handlePrevious = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1)); // Ensure page number doesn't go below 1
  };

  const handleNext = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {images.map(image => (
          <div key={image.id} className="col-md-4 mb-3">
            <img src={image.download_url} alt={image.author} className="img-fluid" />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <button onClick={handlePrevious} className="btn btn-primary mr-2" disabled={page === 1}>Previous</button>
        <button onClick={handleNext} className="btn btn-primary">Next</button>
      </div>
      {loading && <p className="text-center mt-3">Loading...</p>}
    </div>
  );
};

export default ImageGrid;


