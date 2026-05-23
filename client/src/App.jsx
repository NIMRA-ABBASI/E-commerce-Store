
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Authlayout from './components/auth/layout'
import Authlogin from './pages/auth/login'
import Authregister from './pages/auth/register'
import Adminlayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShopingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
function App() {

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/auth' element={<Authlayout/>}>
          <Route path='login' element={<Authlogin/>}/>
          <Route path='register' element={<Authregister/>}/>
        </Route>
        <Route path='/admin' element={<Adminlayout/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
          <Route path='features' element={<AdminFeatures/>}/>
          <Route path='products' element={<AdminProducts/>}/>
        </Route>
        <Route path='/shop' element={<ShoppingLayout/>}>
          <Route path='home' element={<ShoppingHome/>}/>
          <Route path='listing' element={<ShoppingListing/>}/>
          <Route path='checkout' element={<ShopingCheckout/>}/>
          <Route path='account' element={<ShoppingAccount/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
