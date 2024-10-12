import React from 'react';
import SignUp from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';


function App() {
    return (
      <Router>
      <Routes>
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          {/* Add other routes as needed */}
      </Routes>
  </Router>
    );
}

export default App;
