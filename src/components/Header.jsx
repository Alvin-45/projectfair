import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Header({insideDashBoard}) {
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem("existingUser")
           sessionStorage.removeItem("token")
           navigate('/login')
  }
  return (
    <>
    <Navbar style={{zIndex:"1"}} className="card border shadow top-0 position-fixed w-100 ">
        <Container>
          <Navbar.Brand>
            <Link style={{textDecoration:"none"}} className='fw-bolder' to={'/'} ><i className='fa-brands fa-docker' ></i>&nbsp;&nbsp;Project Fair</Link>
          </Navbar.Brand>
         { insideDashBoard && <div className='ms-auto'>
            <button onClick={handleLogout} className='btn btn-link'>LogOut <i className='fa-solid fa-arrow-right'></i></button>
          </div>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header