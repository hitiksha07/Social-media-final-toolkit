import React from 'react'
import { BsFillBookmarkFill, BsFillBookmarksFill, BsFillCalendarHeartFill, BsFillPersonDashFill, BsFillPersonFill } from 'react-icons/bs';
import { MdAlternateEmail, MdOutlineAlternateEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Comment from '../EditPost/Comment';
import Like from '../EditPost/Like';
import EditPost from '../EditPost/EditPost';
import SavePost from '../EditPost/SavePost';

function OtherUser(props) {

  let { id } = useParams()
  console.log(id);
  let post = useSelector(state => state.user.post);
  let user = useSelector(state => state.user.user)
  let otherUser = user?.find(x => x.id == id);

  let otherUserPost = post?.filter(x => x.userId == id)
  // console.log(otherUser.fname)
  return (
    <>
      <div className="container-fluid container-lg ">
        <div className="bg-gradient p-1 row">
          <div className="col-12 col-lg-2">
            {otherUser.file == '' ?
              <img src={require('./../../Assets/profile-icon.webp')} alt="" height='100px' width='100px' className='img-fluid shadow roun-img' />
              :
              <img src={otherUser.file} alt="" height='100px' width='100px' className='shadow roun-img' />
            }
          </div>
          {/* <div className=""> */}
          <figure className="text-start align-self-center fs-4 col ms-2 ms-lg-0">
            <blockquote className="blockquote fs-2 text-white">
              <span className='fs-2 ms-2'>{otherUser?.fname}</span>
            </blockquote>
            <figcaption className="blockquote-footer text-light">
              {otherUser?.email}
            </figcaption>
          </figure>
          {/* </div> */}

        <div className="col  text-end m-auto">
          <Link to='/account/dashbord' className='profile-link d-inline-block me-2 text-decoration-none btn-main w-auto mb-2 h-auto'>DashBord</Link>
        </div>
        </div>

        {/* ================================================= */}
        <div className="container-fluid container-lg dashbord-post1">
          <div className="row">
            {
              otherUserPost?.map((p, index) => {
                return <div className='col-12 col-md-6 col-lg-4 p-3' key={index}>
                  <div className="post-main rounded-4 overflow-hidden shadow-white des-post position-relative">
                    <div className='main-post bg-white col-12  p-3'>
                      <div className="img-post">
                        <img src={p?.file} alt="" className='img-fluid' />
                      </div>
                    </div>
                    <ul className='d-flex bg-light list-unstyled p-2'>
                      <li className='col-2 me-4 fs-4'>
                        <Like postId={p.id} like={p?.like} ></Like>
                      </li>
                      <li className='col-1 fs-4'>
                        <span> <Comment postId={p.id} comments={p?.comments} userId={p.userId} /></span>
                      </li>
                      <li className='col-1 offset-7 fs-4'>
                      <span><SavePost postId={p.id} /></span>
                    </li>
                    </ul>
                    <div className="p-2 des-post">

                      <h4 className=''>{p.title}</h4>
                      <hr />

                      <div className='h-50 w-100 overflow-hidden'>
                        <p className='w-100 text-wrap'>{p.discription}</p>
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default OtherUser