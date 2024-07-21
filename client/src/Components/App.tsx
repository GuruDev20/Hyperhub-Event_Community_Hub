import {Routes,Route} from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import NotFound from '../Pages/NotFound'
import Welcome from '../Pages/Welcome'
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/notfound' element={<NotFound/>}/>
        </Routes>
    )
}
