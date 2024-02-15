import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar.tsx';
import React from 'react';
import BookPage from './pages/Book/BookPage.tsx';
import GenrePage from './pages/Genre/GenrePage.tsx';
import AuthorPage from './pages/Author/AuthorPage.tsx';
import LibraryPage from './pages/Library/LibraryPage.tsx';
import LoginPage from './pages/Auth/LoginPage.tsx'
import RegisterPage from './pages/Auth/RegisterPage.tsx'
import PublicOutlet from './auth/PublicOutlet.tsx'
import PrivateOutlet from './auth/PrivateOutlet.tsx'

function App() {
    return (
      <>
        <ResponsiveAppBar/>
        <div className='mt-10'>
      <Routes>

        <Route
          path="/"
          element={<PrivateOutlet />}
        >
          <Route path="Books" element={<BookPage />} />
          <Route path="Genres" element={<GenrePage />} />
          <Route path="Authors" element={<AuthorPage />} />
          <Route path="Libraries" element={<LibraryPage />} />
          <Route path="*" element={<Navigate to="Books"/>} />
        </Route>

        <Route path="/" element={<PublicOutlet />}>
          <Route path='Login' element={<LoginPage/>}/>
          <Route path='Register' element={<RegisterPage />}/>
          <Route path="*" element={<Navigate to="/Login" replace/>} />        
        </Route>
      </Routes>
    </div>
      </>
    );
  
}

export default App;



