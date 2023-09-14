import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { IoIosLogOut, IoMdPhotos } from 'react-icons/io';
import Swal from 'sweetalert2';

function Sidebar() {
    let user = JSON.parse(localStorage.getItem("account"));
    // console.log(user)
    function logOut() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger me-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, LogOut! ',
            cancelButtonText: 'No, cancel! ',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('login')
                swalWithBootstrapButtons.fire(
                    'LogOut!',
                    'Your Account has been LogOut',
                    'success'
                )
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000);
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your Account is not LogOut :)',
                    'error'
                )
            }
        })
    }
    return (
        <>
            <div className='col-3 bgc-blur-clr3 shadow text-center d-none d-lg-block '>
                <div className="">
                    <div>
                        <img src={require('./../../Assets/logo-removebg-preview.png')} alt="" className='' height='50px' />
                    </div>
                    {/* <hr /> */}

                    <div>
                        {user.file == '' ?
                            <img src={require('./../../Assets/profile-icon.webp')} alt="" height='100px' width='100px' className='shadow roun-img my-3 ' />
                            :
                            <img src={user.file} alt="" height='100px' width='100px' className='shadow roun-img my-3' />
                        }
                    </div>
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>{user?.fname}</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            {user?.email}
                        </figcaption>
                    </figure>
                    <hr />
                    <ul className='list-unstyled container-fluid container-lg text-center'>
                        <li>
                            <NavLink activeclassname="active" to='dashbord' className='row m-3 text-decoration-none fs-4  hov-link editPost'>
                                <AiFillHome className='col-4 fs-4 m-2 offset-3 d-inline-block' />
                                <p className='col-5 text-start'>Dashbord</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeclassname="active" to='Profile' className='row m-3 text-decoration-none fs-4  hov-link editPost'>
                                <CgProfile className='col-4 fs-4 m-2 offset-3' />
                                <p className='col-5 text-start'>Profile</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeclassname="active" to='yourPosts' className='row m-3 text-decoration-none fs-4  hov-link editPost'>
                                <MdOutlineInsertPhoto className='col-4 fs-4 m-2 offset-3' />
                                <p className='col-5 text-start'>Posts</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeclassname="active" to='save' className='row m-3 text-decoration-none fs-4  hov-link editPost'>
                                <IoMdPhotos className='col-4 fs-4 m-2 offset-3' />
                                <p className='col-5 text-start'>SavePost</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeclassname="active" to='settings' className='row m-3 text-decoration-none fs-4  hov-link editPost'>
                                <AiFillSetting className='col-4 fs-4 m-2 offset-3' />
                                <p className='col-5 text-start'>Settings</p>
                            </NavLink>
                        </li>
                    </ul>
                    <hr />
                    <ul className='list-unstyled container text-center'>
                        <li>
                            <Link activeclassname="active" onClick={logOut} className='row m-3 text-decoration-none fs-4  hov-link editPost'>
                                <IoIosLogOut className='col-4 fs-4 m-2 offset-3' />
                                <p className='col text-start'>Log Out</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar