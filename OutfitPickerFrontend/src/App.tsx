import './App.css'
import LoginForm from './components/LoginForm'
import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/HomePage'

function App() {
  
  return (
    <>
      <div>

        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<LoginForm/>}></Route>
            <Route path ='/home' element = {<HomePage/>}></Route>
          </Route>
        </Routes>
      </div>
      
    </>
  )
}

export default App
