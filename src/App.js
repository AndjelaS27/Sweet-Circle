import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CreateDonutPage from './pages/CreateDonutPage';
import CreateBoxPage from './pages/CreateBoxPage';
import CartPage from './pages/CartPage';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from './store/slices/languageSlice';

function App() {
  const dispatch = useDispatch();

  const selectedLanguage = useSelector((state) => {
    return state.language.selectedLanguage;
  })

  const handleSelectedLanguage = (language) => {
    dispatch(setLanguage(language))
  }

  return (
    <BrowserRouter>
      <Header selectedLanguage={selectedLanguage} onSelect={handleSelectedLanguage}/>
      <Routes>
        <Route path='/' element={<HomePage selectedLanguage={selectedLanguage}/>} />
        <Route path='/shop' element={<ShopPage selectedLanguage={selectedLanguage}/>} />
        <Route path='/about' element={<AboutPage selectedLanguage={selectedLanguage}/>} />
        <Route path='/contact' element={<ContactPage selectedLanguage={selectedLanguage}/>} />
        <Route path='/createDonut' element={<CreateDonutPage selectedLanguage={selectedLanguage}/>}/>
        <Route path='/createBox' element={<CreateBoxPage selectedLanguage={selectedLanguage}/>}/>
        <Route path='/cart' element={<CartPage selectedLanguage={selectedLanguage}/>}/>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
