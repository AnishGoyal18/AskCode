import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { QuestionContextProvider } from './context/QuestionContext';
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './components/SignUp';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import AskHumanPage from './pages/AskHumanPage';
import AskAiPage from './pages/AskAiPage';

function App() {
  return (
    <div className='bg-color1 h-screen'>
      <UserAuthContextProvider>
        <QuestionContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/community' element={<ProtectedRoute><AskHumanPage /></ProtectedRoute>} />
              <Route path='/ai' element={<ProtectedRoute><AskAiPage /></ProtectedRoute>} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </BrowserRouter>
        </QuestionContextProvider>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;