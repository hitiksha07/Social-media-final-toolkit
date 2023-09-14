import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { editApidata } from '../../api/userApi';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Settings() {
    let state = useSelector(state => state.user.user)
    // console.log('setting', state);
    let user = JSON.parse(localStorage.getItem('account'))
    let match = state?.find(x => x.email == user.email);
    // console.log('findmatch', match)

    let dispatch = useDispatch()

    const [obj, setobj] = useState({ ...match })

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

    const saveData = () => {
        if (obj.id != 0) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(editApidata(obj))
                    localStorage.setItem('account', JSON.stringify(obj))
                    Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })

        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    return (
        <div className="container fs-4 bg-white p-5 h-100">
            <h2><AiFillEdit className='me-2'/>Edit Your Informatio</h2>
            <hr />
            <div className="row m-4">
                <label htmlFor='fname' className="col-4 col-md-2 setting-lable">First Name:</label>
                <input type="text" className='col setting-inp' name='fname' value={obj.fname} onChange={getValue} />
            </div>
            <div className="row m-4">
                <label htmlFor='lname' className="col-4 col-md-2 setting-lable">Last Name:</label>
                <input type="text" className='col setting-inp' name='lname' value={obj.lname} onChange={getValue} />
            </div>
            <div className="row m-4">
                <label htmlFor='date' className="col-4 col-md-2 setting-lable">Birth-Date:</label>
                <input type="text" className='col setting-inp' name='date' value={obj.date} onChange={getValue} />
            </div>
            <div className="row m-4">
                <label htmlFor='file' className="col-4 col-md-2 setting-lable">Change Profile:</label>
                <input type="file" className='col setting-inp' name='file' onChange={getValue} />
            </div>
            <Link to='/account/Profile' className='m-4 btn-main w-25 text-decoration-none text-center' onClick={saveData}>save</Link>
        </div>
    )
}

export default Settings