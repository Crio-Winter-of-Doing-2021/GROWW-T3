import React, { useState } from 'react';
import Header from './components/Header/Header';
import AuthContext from './context/AuthContext';
import Main from './screens/Main/Main';
import Welcome from './screens/Welcome/Welcome';

function App() {
  const [ isLog, toggleIsLog ]= useState(false);
  return (
    <AuthContext.Provider value={[isLog, toggleIsLog]}>
      <Header />
      <hr />
      { isLog ? <Main /> : <Welcome />}
    </AuthContext.Provider> 

  );
}

export default App;
