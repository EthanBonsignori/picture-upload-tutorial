import React, { useState } from 'react';
import CropModal from './CropModal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState('');

  // Placeholder, will fetch url from Database when setup
  const profilePictureUrl = "https://placehold.it/200x200"

  const toggleModal = () => {
    setIsOpen(!isOpen)
  };

  const handleChange = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageBase64(reader.result)
      toggleModal();
    }

    reader.onerror = (err) => {
      console.error(err)
    }
  };

  return (
    <div className="App">
      <CropModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        imageBase64={imageBase64}
      />
      <h3>Profile Picture Upload</h3>
      <img className="profile-picture" alt="profile" src={profilePictureUrl} />
      <label className="upload-label" htmlFor="upload">Change Profile Picture</label>
      <input
        id="upload"
        type="file"
        accept="image/*" // Only accept image files (.jpg, .png, .gif, etc)
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
