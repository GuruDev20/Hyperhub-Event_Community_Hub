import {Routes,Route} from 'react-router-dom'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import NotFound from '../Pages/NotFound'
import Welcome from '../Pages/Welcome'
import Events from '../Pages/Events'
import Explore from '../Pages/Explore'
import Calender from '../Pages/Calender'
import LeaderBoard from '../Pages/LeaderBoard'
import Community from '../Pages/Community'
import Notifications from '../Pages/Notifications'
import ForgetPassword from '../Components/ForgetPassword'
import ResetPassword from './ResetPassword'
// import '../Styles/App.css'
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/notfound' element={<NotFound/>}/>
            <Route path='/events' element={<Events/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/calender' element={<Calender/>}/>
            <Route path='/leaderboard' element={<LeaderBoard/>}/>
            <Route path='/community' element={<Community/>}/>
            <Route path='/notification' element={<Notifications/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forget-password' element={<ForgetPassword/>}/>
            <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
        </Routes>
    )
}
