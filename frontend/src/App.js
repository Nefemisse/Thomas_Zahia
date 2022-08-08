
import { BrowserRouter , Routes, Route} from "react-router-dom"
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";

function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/*" element={<Home/>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
