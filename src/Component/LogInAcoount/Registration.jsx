import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { addUser, data } from '../../Store/Slice/UserSlice';
import { addApiData, getApidata } from '../../api/userApi';
import { Link } from 'react-router-dom';


function Registration() {

    let blankObj = {
        id: 0, fname: '', lname: '', email: '', password: '', file: '', date: '',save:[]
    };
    const [obj, setobj] = useState({ ...blankObj });
    const [count, setcount] = useState(0);
    const [emailError, setemailError] = useState(true);
    const [passError, setpassError] = useState(true);

    let state = useSelector(state => state.user.user);
    let dispatch = useDispatch();
    // console.log(state)
    const getValue = async (e) => {
        if (e.target.name == 'file') {
            let file = e.target.files[0];
            obj.file = file ? await toBase64(file) : ''
        }
        else {
            obj[e.target.name] = e.target.value;
        }

        if ((obj.email.includes('@') && obj.email.includes('.com')) && obj.email == obj.email.toLowerCase()) {
            setemailError(false);
        }
        else {
            setemailError(true)
        }

        if ((obj.password.length < 9 || obj.password.length > 9) && obj.password == '') {
            setpassError(true);
        }
        else {
            setpassError(false)
        }
        setobj({ ...obj })
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });


    let match = state?.find(x => x.email == obj.email);
    const saveData = () => {
        if (passError || emailError) {
            Swal.fire('plz enter correct details')
        }
        else {
            if (match?.email == obj.email) {
                Swal.fire('You are allready Register')
            }
            else {
                if (obj.id == 0) {
                    let c = uuidv4()
                    setcount(c);
                    obj.id = c;
                    dispatch(addApiData(obj));
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 1500);
                    setobj({ ...blankObj })
                }
            }
        }

    }

    return (
        <>
            <div className="main">
                <div className="login1 p-5">
                    <div className='img-login'><img src={require('./../../Assets/login-removebg-preview.png')} alt="" /></div>
                    <hr />
                    <div className="p-2">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control inp1" id="name" value={obj.fname} name='fname' placeholder="First Name" onChange={getValue} />
                            <label htmlFor="name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control inp1" id="lastName" value={obj.lname} name='lname' placeholder="Last Name" onChange={getValue} />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control inp1" id="floatingInput" value={obj.email} name='email' placeholder="name@example.com" onChange={getValue} />
                            <label htmlFor="floatingInput">Email address</label>
                            {
                                emailError == true ? <span className='text-danger'>Enter valid email</span> : <span></span>
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <input type="date" className="form-control inp1" id="date" value={obj.date} name='date' placeholder="Birth-Date" onChange={getValue} />
                            <label htmlFor="date">Birth-Date</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control inp1" id="floatingPassword" value={obj.password} name='password' placeholder="Password" onChange={getValue} />
                            <label htmlFor="floatingPassword">Password</label>
                            {
                                passError == true ? <span className='text-danger'>Enter valid pass</span> : <span></span>
                            }
                        </div>
                        <input className="form-control inp1 mt-3" name='file' type="file" id="formFile" onChange={getValue}></input>
                    </div>
                    <hr />
                    <div className="mt-4 text-center">
                        <button className='btn-main button curl-top-left' onClick={saveData}>Register Now</button>
                    </div>
                    <br />
                    <br />
                    <p className='ps-2'>Allready have an Account <Link to='/login'>Login.</Link></p>
                </div>
            </div>
        </>
    )
}

export default Registration