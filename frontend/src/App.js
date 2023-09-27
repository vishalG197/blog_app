import logo from './logo.svg';
import './App.css';

import Navbar from './Routes/Navbar';
import AllRoutes from './Routes/AllRoutes';
import SignUp from './pages/Signup';

function App() {
  return (
    <div className="App">
    <Navbar/>
     <AllRoutes/>
     {/* <SignUp/> */}
    </div>
  );
}

export default App;
