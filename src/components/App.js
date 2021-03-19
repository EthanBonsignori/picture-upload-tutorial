import React from 'react';

function App() {

  // Placeholder, will fetch url from Database when setup
  const profilePictureUrl = "https://placehold.it/200x200"

  const handleChange = (evt) => {
    const reader = new FileReader();
    const file = evt.target.files[0];

    reader.readAsDataURL(file);

    // when the file is converted
    reader.onload = () => {
      console.log(reader.result)
    }

    // log errors
    reader.onerror = (err) => {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <h3>Profile Picture Upload</h3>
      <img className="profile-picture" alt="profile" src={profilePictureUrl} />
      <label htmlFor="upload" className="upload-label">Change Profile Picture</label>
      <input // file upload
        type="file"
        accept="image/*"
        id="upload"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default App;