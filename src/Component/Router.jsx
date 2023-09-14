import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Registration from './LogInAcoount/Registration'
import Login from './LogInAcoount/Login'
import Account from './Account/Account';
import DashBord from './Pages/DashBord';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import YourPosts from './Pages/YourPosts';
import NotFounded from './NotFounded';
import { useSelector } from 'react-redux';
import OtherUser from './Pages/OtherUser';
import Save from './Pages/Save';

function Router1() {
    let state = useSelector((state) => state.user.user);
    let login = JSON.parse(localStorage.getItem('login'));
    let match = state?.find(x => x.email == login?.email);
    localStorage.setItem('account', JSON.stringify(match))
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {
                        match == null ?
                            <>
                                <Route path='/' element={<Navigate to='/login' />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/Registration' element={<Registration />} />
                                <Route path='*' element={<NotFounded />} />
                            </> :
                            <>
                                <Route path='/' element={<Navigate to='/account/Profile' />}></Route>
                                <Route path='/account' element={<Account />} >
                                    <Route path='dashbord' element={<DashBord/>}/>
                                    <Route path='Profile' element={<Profile/>}/>
                                    <Route path='settings' element={<Settings/>}/>
                                    <Route path='yourPosts' element={<YourPosts/>}/>
                                    <Route path='otherUser' element={<OtherUser />}>
                                        <Route path=':id' element={<OtherUser/>}/>
                                    </Route>
                                    <Route path='save' element={<Save />}>
                                        <Route path=':id' element={<Save/>}/>
                                    </Route>
                                </Route>
                                <Route path='*' element={<NotFounded />} />
                                </>
                    }
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router1