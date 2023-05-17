import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './blog/Create';
import BlogDetails from './blog/BlogDetails';
import NotFound from './blog/NotFound';
import Update from './blog/Update';
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/create" element={<Create />}/>
            <Route path="/blogs/:id" element={<BlogDetails />}/>
            <Route path="/update/:id" element={<Update />}/>

            {/* Has to be at bottom, catches all other urls */}
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
