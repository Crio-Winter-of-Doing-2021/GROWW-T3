import React, { useState } from 'react';
import Header from './components/Header/Header';
import AuthContext from './context/AuthContext';
import Main from './screens/Main/Main';
import Welcome from './screens/Welcome/Welcome';



import GrowwChatbot from './components/Chatbot/GrowwChatbot';
import { ConditionallyRender } from "react-util-kit";
import ChatBotButton from './assets/groww-logo.png';
import './App.css';


function App() {
  const [ isLog, toggleIsLog ]= useState(false);
  const [showChatbot, toggleChatbot] = useState(true);


  return (
    <AuthContext.Provider value={[isLog, toggleIsLog]}>
      <Header />
      <hr />
      { isLog ? <Main /> : <Welcome />}
      <ConditionallyRender
            ifTrue={showChatbot}
            show={
              <GrowwChatbot/>
            }
          />

      <button className='text-center' style={{
        width: '50px', 
        height: '50px',
        borderRadius: '25px',
        border: 'none',
        position: 'fixed',
        bottom: '15px',
        zIndex: '9999',
        right: '40px' 
        }}
          onClick={() => toggleChatbot((prev) => !prev)}
        >
          <img src={ChatBotButton} width='50px' height='50px' alt='chatbot logo' />
        </button>
    </AuthContext.Provider> 

  );
}

export default App;
