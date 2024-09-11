import React, { useState, useEffect } from 'react';
import defaultImage from './default.jpg';

function Image({ setVal }) {
  const [image, setImage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // Set the value in the setVal function when the image changes
    setVal(image || defaultImage);
  }, [image, setVal]);

  return (
    <>
      <div className="card" id="img-place">
        {/* Display the uploaded image or the default image */}
        <img src={image || defaultImage} className="card-img-top" alt="..." />
      </div>

      <div className="input-group mb-3" id="upload-img">
        <label className="btn btn-outline-secondary">
          Choose file
          {/* File input element */}
          <input
            type="file"
            accept=".jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .webp"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </label>
        {/* Input field to display the image source */}
        <input className="form-control" aria-describedby="basic-addon2" readOnly value={image} />
      </div>
    </>
  );
}

export default Image;


