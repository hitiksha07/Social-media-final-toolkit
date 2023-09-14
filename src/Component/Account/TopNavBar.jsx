import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import { BsList, BsPlusSquare } from 'react-icons/bs';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import React, { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { Overlay, Popover } from 'react-bootstrap';
import { IoIosLogOut, IoMdPhotos } from 'react-icons/io';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import Swal from 'sweetalert2';
import { addPostApiData } from '../../api/postApi';

function TopNavBar() {
    let user = JSON.parse(localStorage.getItem('account'));
    let blankObj = {
        id: 0, title: '', discription: '', file: '', MediaType: '', like: [], save: []
    }
    const [show1, setShow1] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow1(!show1);
        setTarget(event.target);
    };
    const [obj, setobj] = useState({ ...blankObj });
    const [count, setcount] = useState(0);
    const [show, setShow] = useState(false);

    let dispatch = useDispatch();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getValue = async (e) => {
        if (e.target.name == 'file') {
            let file = e.target.files[0];
            obj.file = file ? await toBase64(file) : ''
        }
        else {
            obj[e.target.name] = e.target.value;
        }
        setobj({ ...obj })
    }
    const savePost = () => {
        if (obj.id == 0) {
            let c = uuidv4()
            setcount(c);
            obj.id = c;
            obj.userId = user.id;
            obj.userEmail = user.email;
            dispatch(addPostApiData(obj));
        }
        setobj({ ...blankObj })
        handleClose()
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    // ======log-Out---in mobile======
    function logOut() {
        setShow1(false)
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

    let path = useLocation();
    let head = path.pathname.split('/')[2]
    console.log('path', path.pathname.split('/')[2])
    return (
        <>
            <div className="col">
                <div className="top shadow p-2 d-flex justify-content-between bgc-blur-clr1 position-relative">
                    <img src={require('./../../Assets/logo-removebg-preview.png')} alt="" className='text-start img-fluid' />
                    <span className='fs-4 d-none d-sm-block text-start position-absolute headTop'>{head}</span>
                    <ul className='row list-unstyled mt-3'>
                        <li className='col'><Link to='dashbord'><AiFillHome className='fs-3 scal text-dark mt-2' /> </Link></li>
                        <li className='col'><Link onClick={handleShow}><BsPlusSquare className='fs-3 scal text-dark mt-2' /> </Link></li>
                        <li className='col d-none d-lg-block'><h5 className=' lh-sm'>{user.email}</h5></li>
                        <li className='col d-none d-lg-block'><Link to='Profile'>
                            {user.file == '' ?
                                <img src={require('./../../Assets/profile-icon.webp')} alt="" height='50px' width='50px' className='shadow me-5 roun-img' />
                                :
                                <img src={user.file} alt="" height='50px' width='50px' className='shadow roun-img' />
                            }
                        </Link></li>
                        <li className='col d-block d-lg-none'>
                            <Link ref={ref}>
                                <BsList onClick={handleClick} className='fs-3 scal text-dark mt-2' />
                                <Overlay
                                    show={show1}
                                    target={target}
                                    placement="bottom"
                                    container={ref}
                                    containerPadding={20}
                                >
                                    <Popover id="popover-contained">
                                        <Popover.Body>
                                            <ul className='list-unstyled  text-center'>
                                                <li>
                                                    <NavLink activeClassName="active" onClick={() => setShow1(false)} to='dashbord' className='d-flex text-decoration-none fs-4  hov-link editPost'>
                                                        <AiFillHome className=' fs-4 d-inline-block me-2 mt-1' />
                                                        <p className='text-start'>Dashbord</p>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink activeClassName="active" to='Profile' onClick={() => setShow1(false)} className='d-flex text-decoration-none fs-4  hov-link editPost'>
                                                        <CgProfile className=' fs-4 d-inline-block me-2 mt-1' />
                                                        <p className='text-start'>Profile</p>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink activeClassName="active" to='yourPosts' onClick={() => setShow1(false)} className='d-flex text-decoration-none fs-4  hov-link editPost'>
                                                        <MdOutlineInsertPhoto className=' fs-4 d-inline-block me-2 mt-1' />
                                                        <p className='text-start'>Posts</p>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink activeclassname="active" to='save' onClick={() => setShow1(false)}  className='d-flex text-decoration-none fs-4  hov-link editPost'>
                                                        <IoMdPhotos className='fs-4 d-inline-block me-2 mt-1' />
                                                        <p className='text-start'>SavePost</p>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink activeClassName="active" to='settings' onClick={() => setShow1(false)} className='d-flex text-decoration-none fs-4  hov-link editPost'>
                                                        <AiFillSetting className=' fs-4 d-inline-block me-2 mt-1' />
                                                        <p className='text-start'>Settings</p>
                                                    </NavLink>
                                                </li>
                                            </ul>
                                            <hr />
                                            <ul className='list-unstyled container text-center'>
                                                <li>
                                                    <NavLink activeClassName="active" onClick={logOut} to='dashbord' className='d-flex text-decoration-none fs-4  hov-link editPost'>
                                                        <IoIosLogOut className=' fs-4 d-inline-block me-2 mt-1' />
                                                        <p className='text-start'>LogOut</p>
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </Popover.Body>
                                    </Popover>
                                </Overlay>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="dash mb-1 shadow py-5 bgc-blur-clr2">
                    <Outlet />
                </div>
            </div>
            <>

                {/* =====post======== */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action="">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="title" placeholder="Title" name='title' onChange={getValue} />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea className="form-control" placeholder="Description" id="discription" name='discription' value={obj.discription} style={{ height: "100px" }} onChange={getValue}></textarea>
                                <label htmlFor="discription">Description</label>
                            </div>
                            <div className="mb-3">
                                <input className="form-control" type="file" id="formFile" name='file' onChange={getValue} />
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="Media-Type" className='col-3'>Media-Type:</label>
                                <div className="col">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="MediaType" id="Image" value="Image" checked={obj.MediaType?.includes('Image')} onChange={getValue} />
                                        <label className="form-check-label" htmlFor="Image">Image</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="MediaType" id="Video" value="Video" checked={obj.MediaType?.includes('Image')} onChange={getValue} />
                                        <label className="form-check-label" htmlFor="Video">Video</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <Link to='/account/dashBord' className='btn-main text-decoration-none text-center' type='button' onClick={savePost}>Save Post</Link>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </>
        </>)
}

export default TopNavBar