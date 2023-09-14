import React from 'react'
import { useSelector } from 'react-redux';
import Like from '../EditPost/Like';
import { BsFillBookmarkFill, BsFillBookmarksFill } from 'react-icons/bs';
import EditPost from '../EditPost/EditPost';
import { Link } from 'react-router-dom';
import Comment from '../EditPost/Comment';
import SavePost from '../EditPost/SavePost';

function YourPosts() {
  let user = JSON.parse(localStorage.getItem("account"));
  let post = useSelector(state => state.user.post);
  let yourPost = post?.filter((x) => x.userId == user.id);
  console.log('user', user)
  return (
    <>
      <div className="container-fluid container-lg dashbord-post">
        <div className="row">
          {
            yourPost?.map((p, index) => {
              return <div className='col-12 col-md-6 col-lg-4 p-3' key={index}>
                <div className="post-main rounded-4 overflow-hidden shadow-white des-post position-relative">
                  <div className='main-post bg-white col-12  p-3'>
                    <ul className='row head-post list-unstyled'>
                      <li className='col overflow-hidden' >
                        {user?.file == '' ?
                          <>
                            <Link>
                              <img src={require('./../../Assets/profile-icon.webp')} alt="" height='50px' width='50px' className='shadow me-3 roun-img' />
                            </Link>
                          </>
                          :
                          <>
                            <Link>
                              <img src={user?.file} alt="" height='50px' width='50px' className='shadow  me-3 roun-img' />
                            </Link>
                          </>
                        }
                        <h5 className=' lh-sm d-inline-block'>{user?.fname}</h5>
                      </li>

                      <li className='position-absolute three-dot1 bg-white d-inline-block w-auto accordion-body fs-4'>
                        <EditPost postId={p.id} />
                      </li>
                    </ul>
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
                      <span><SavePost postId={p.id} save={p?.save}/></span>
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
    </>
  )
}

export default YourPosts