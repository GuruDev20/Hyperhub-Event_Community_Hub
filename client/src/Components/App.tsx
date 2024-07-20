import {Routes,Route} from 'react-router-dom'
import Login from '../Pages/Login'
export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
        </Routes>
    )
}
