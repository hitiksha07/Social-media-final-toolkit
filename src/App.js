import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router1 from './Component/Router';
import { useDispatch, useSelector } from 'react-redux';
import { getApidata } from './api/userApi';
import { useEffect } from 'react';
import { data, getUser } from './Store/Slice/UserSlice';
import './Component/Style.css'
import { getPostApi } from './api/postApi';

function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApidata())
    dispatch(getPostApi())
    // dispatch(data())
  }, [])

  // const state = useSelector(state => state.user)
  // console.log('app',state)
  
  return (
    <>
      <Router1/>
    </>
  );
}

export default App;
