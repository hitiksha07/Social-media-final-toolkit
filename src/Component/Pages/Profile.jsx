import React from 'react'
import { BsFillCalendar2HeartFill, BsFillCalendarHeartFill, BsFillPersonFill } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Profile() {
  let state = useSelector(state => state.user.user);
  let user = JSON.parse(localStorage.getItem('account'))

  function logOut() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'LogOut',
      denyButtonText: `Cancle`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.removeItem('login')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 1600);
        Swal.fire('LogOut!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Cancle', '', 'info')
      }
    })

  }
  return (
    <>
      <div className="container-fluid container-lg  bg-light h-100">
        <div className="bg-white p-4 row">
          <div className="col-12 col-lg-4">
            {user.file == '' ?
              <img src={require('./../../Assets/profile-icon.webp')} alt="" height='200px' width='200px' className='img-fluid shadow roun-img' />
              :
              <img src={user.file} alt="" height='200px' width='200px' className='shadow roun-img' />
            }
          </div>
          {/* <div className=""> */}
          <figure className="text-start align-self-center fs-4 col ms-2 ms-lg-0">
            <blockquote className="blockquote fs-2">
              <span className='fs-2 ms-2'>{user?.fname}</span>
            </blockquote>
            <figcaption className="blockquote-footer">
              {user?.email}
            </figcaption>
          </figure>
          {/* </div> */}
          <div className="col  text-end m-auto">
            <Link to='/account/settings' className='profile-link d-inline-block me-2 text-decoration-none btn-main w-auto mb-2 h-auto'>Edit Profile</Link>
          </div>
        </div>
        <div className="Profile-text p-5">
          <div className="row">
            <h3 className='col-6 col-md-4 fw-light fs-4'><MdAlternateEmail className='me-4' /> Email :-</h3>
            <h2 className='col fw-normal fs-4'>{user.email}</h2>
          </div>
          <hr />
          <div className="row">
            <h3 className='col-6 col-md-4  fw-light fs-4'><BsFillPersonFill className='me-4' /> First Name :-</h3>
            <h2 className='col fw-normal fs-4'>{user.fname}</h2>
          </div>
          <hr />
          <div className="row">
            <h3 className='col-6 col-md-4  fw-light fs-4'><BsFillPersonFill className='me-4' /> Last Name :-</h3>
            <h2 className='col fw-normal fs-4'>{user.lname}</h2>
          </div>
          <hr />
          <div className="row">
            <h3 className='col-6 col-md-4  fw-light fs-4'><BsFillCalendarHeartFill className='me-4' /> Birth-Date :-</h3>
            <h2 className='col fw-normal fs-4'>{user.date}</h2>
          </div>
          <hr />
          <div className="m-3">
            <button onClick={logOut} className='btn-main w-auto'>Log Out</button>
          </div>
          <div className="m-3">
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile