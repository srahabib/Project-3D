import {Route , BrowserRouter as Router , Routes} from 'react-router-dom';
import Navbar from './components/Navbar';

import { Home , Projects , About , Contact } from './pages';

const App =()=> {

  return (

    <main className='bg-slate-300/20'>
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        </Routes>
      </Router>
    </main>

  )
}

export default App
