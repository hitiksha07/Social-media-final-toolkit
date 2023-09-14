import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

function Login() {
    let blankLoginObj = {
        id: 0, email: '', password: ''
    }
    const [LoginObj, setLoginObj] = useState({ ...blankLoginObj });
    const [loginarray, setloginarray] = useState([]);
    const [count, setcount] = useState(0)

    let state = useSelector((state) =>state.user.user)

    const getvalue = (e) => {
        LoginObj[e.target.name] = e.target.value;
        setLoginObj({ ...LoginObj })
    }
    console.log('first', state)
    let match = state?.find(x => x.email == LoginObj?.email);
    console.log(match)
    const loginData = () => {
        if (match) {
            if (match?.password != LoginObj?.password) {
                Swal.fire('plz enter correct pass')
            }
            else if (match?.password == LoginObj?.password) {
                if (LoginObj.id == 0) {
                    let c1 = count + 1;
                    setcount(c1)
                    LoginObj.id = c1;
                    loginarray.push(LoginObj)
                    setloginarray([...loginarray]);
                    localStorage.setItem('login', JSON.stringify(LoginObj))
                    setLoginObj({ ...blankLoginObj })

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.href = '/account/Profile'
                    }, 1600);
                }
            }
        }
        else {
            Swal.fire('You are not Register')
        }
        // console.log(loginarray)
    }

    return (
        <div className='main'>
            <div className="login p-5">
                <div className='img-login'><img src={require('./../../Assets/login-removebg-preview.png')} alt="" /></div>
                <hr />
                <div className="p-2">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control inp1" id="floatingInput" placeholder="name@example.com" name='email' value={LoginObj.email} onChange={getvalue} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control inp1" id="floatingPassword" placeholder="Password" name='password' value={LoginObj.password} onChange={getvalue} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
                <hr />
                <div className="mt-4 text-center">
                    <button className='btn-main button curl-top-left' onClick={loginData}>Login...</button>
                </div>
                <br />
                <br />
                <p className='ps-2'>Don't Have An Acoount? <Link to='/Registration'>Register Now</Link></p>
            </div>
        </div>
    )

}

export default Login