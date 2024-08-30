
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';
import Header from './components/Header';
import FindMovie from './components/FindMovie';
import SignUp from './components/SignUp';
import FavoriteMovies from './components/FavoriteMovies';
import Profile from './components/Profile';


import './App.css';

function App() {

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>
       <div className="App container mx-auto px-4 py-3 ">
      
      <Router>
        <Header />
        <Routes>
          <Route path='/myFavorites' element={<FavoriteMovies />} />
          <Route path='/' 
            element={<Home  />} 
          />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/findMovie/:title' element={<FindMovie />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='myProfile' element={<Profile />} />
      </Routes>
      </Router>
      <Footer />
    </div>
    </div>
  );
   
   
}

export default App;


//<MovieDetails id={27205}/>