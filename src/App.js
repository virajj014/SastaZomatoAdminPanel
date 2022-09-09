
import './App.css';
import AddFoodData from './components/AddFoodData';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OrderSection from './components/Orders/OrderSection';
import ShowOrderSpecific from './components/Orders/ShowOrderSpecific';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderSection />} />
        <Route path="/orders" element={<OrderSection />} />

        <Route path="/addfood" element={<AddFoodData />} />
        <Route path="/orderdetails/:orderid" element={<ShowOrderSpecific />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
