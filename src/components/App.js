import React from 'react';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
      <h3>Profile Picture Upload</h3>
      <img className="profile-picture" alt="profile" src="https://placehold.it/200x200"/>
      <div className="button-wrapper">
        <button>Upload</button>
        <button>Delete</button>
      </div>
     </div>
    </div>
  );
};

export default App;
