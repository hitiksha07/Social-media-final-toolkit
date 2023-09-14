import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { deletePostApiData, editPostApidata } from '../../api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Overlay, Popover } from 'react-bootstrap';
import { FiMoreVertical } from 'react-icons/fi';

function EditPost(props) {
  let user = JSON.parse(localStorage.getItem('account'));
  let post = useSelector(state => state.user.post);
  let editPost = post?.find(x => x.id == props.postId);
  let blankObj = {
      id: 0, title: '', discription: '', file: '', MediaType: '', like: []
  }
  const [obj, setobj] = useState({ ...blankObj });
  const [show1, setShow1] = useState(false);
  let dispatch = useDispatch()

  // =============-----------delete post================
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
  };

  function deletePost() {
      setShow(false)
      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
              confirmButton: 'btn btn-success me-2',
              cancelButton: 'btn btn-danger me-2'
          },
          buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
      }).then((result) => {
          if (result.isConfirmed) {
              dispatch(deletePostApiData(props.postId))
              setShow1(false)
              swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
              )
          } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
          ) {
              swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
              )
          }
      })
  }

  // ==========----------------editPodt-------------==========
  const handleClose = () => setShow1(false);
  const handleShow = () => {
      setShow(!show);
      setShow1(true)
      setobj({ ...editPost })
  };
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
  const savePost = (e) => {
      e.preventDefault();
      setShow(false)

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
                  Swal.fire('Saved!', '', 'success')
                  dispatch(editPostApidata(obj));
              } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
              }
              handleClose()
          })
      }
      setobj({ ...blankObj })
  }
  const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
  });
  return (
    <>
    <FiMoreVertical style={{
        cursor: 'pointer',
    }} onClick={handleClick} />
    <div ref={ref}>

        <Overlay
            show={show}
            target={target}
            placement="bottom"
            container={ref}
            containerPadding={20}
        >
            <Popover id="popover-contained">
                {/* <Popover.Header as="h3">Edit</Popover.Header> */}
                <Popover.Body>
                    <h5 style={{
                        cursor: 'pointer',
                    }} className='editPost' onClick={handleShow}><strong>Edit</strong></h5><hr />
                    <h5 style={{
                        cursor: 'pointer',
                    }} className='editPost' onClick={deletePost}><strong>Delete</strong></h5>
                </Popover.Body>
            </Popover>
        </Overlay>
    </div>

    {/* =====Edit-post======== */}
    <Modal show={show1} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form action="">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="title" placeholder="Title" name='title' value={obj.title} onChange={getValue} />
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
                    <button className='btn-main' onClick={(e) => savePost(e)}>Save Post</button>
                </div>
            </form>
        </Modal.Body>
    </Modal>
</>
  )
}

export default EditPost