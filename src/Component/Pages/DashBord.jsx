import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BsFillBookmarkFill, BsFillBookmarksFill } from 'react-icons/bs';
import Comment from '../EditPost/Comment';
import Like from '../EditPost/Like';
import OtherUser from './OtherUser';
import SavePost from '../EditPost/SavePost';


function DashBord() {
  const post = useSelector(state => state.user.post);
  let allUser = useSelector(state => state.user.user);

  return (
    <>
      <div className="container-fluid container-lg dashbord-post">
        <div className="row ">
          {
            post?.map((p, index) => {
              return <div className='col-12 col-md-6 col-xl-4 p-3' key={index}>
                <div className="post-main shadow-white rounded-4 overflow-hidden des-post position-relative">
                  <div className='main-post bg-white col-12  p-3 position-relative'>
                    <ul className='row head-post list-unstyled'>
                      {
                        allUser?.map((x, i) => {
                          return p.userId == x.id ?
                            <li className='col  overflow-hidden' key={i}>
                              {x?.file == '' ?
                                <>
                                  <Link to={`/account/otherUser/${x.id}`}>
                                    <img src={require('./../../Assets/profile-icon.webp')} alt="" height='50px' width='50px' className='shadow me-3  roun-img' />
                                  </Link>
                                </>
                                :
                                <>
                                  <Link  to={`/account/otherUser/${x.id}`}>
                                    <img src={x?.file} alt="" height='50px' width='50px' className='shadow   me-3 roun-img' />
                                  </Link>
                                </>
                              }
                              {/* <OtherUser data={x} /> */}
                              <h5 className='lh-sm d-inline-block text-warp'>{x?.fname}</h5>
                            </li>
                            : ''
                        })
                      }
                      <FiMoreVertical style={{ cursor: 'pointer' }} className='position-absolute three-dot bg-white d-inline-block w-auto fs-4' />
                    </ul>
                    <div className="img-post">
                      <img src={p?.file} alt="" className='img-fluid' />
                    </div>

                  </div>
                  <ul className='d-flex bg-light list-unstyled p-2'>
                    <li className='col-2 col-lg-3 me-4 fs-4'>
                      <Like postId={p.id} like={p?.like} ></Like>
                    </li>
                    <li className='col-1 fs-4'>
                      <span> <Comment postId={p.id} comments={p?.comments} userId={p.userId} /></span>
                    </li>
                    <li className='col-1 offset-7 offset-lg-5 offset-xl-6 mt-2 fs-4'>
                      <span><SavePost postId={p.id} save={p?.save}/></span>
                    </li>
                  </ul>
                  <div className="p-2 px-3  des-post">
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
    </>
  )
}

export default DashBord