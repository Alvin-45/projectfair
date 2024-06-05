import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div style={{height:'400px',marginTop:"80px"}} className='w-100 container'>
        <div className="footer-content d-flex justify-content-between">
            <div className="media " style={{width:'400px'}}>
            
                <h5 className='fw-bolder d-flex'> <i className='fa-brands fa-docker' ></i> &nbsp;Project Fair</h5>
                <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi veniam ipsum ad nobis, iste, porro cumque dolores ut saepe in necessitatibus quidem nesciunt accusamus officiis voluptates assumenda, provident eum dolore. </p>
                <div className='d-flex flex-column'>
                    <span className='text-secondary'>Code licensed MIT, docs CC BY 3.0</span>
                    <span className='text-secondary'>Currently v5.3.2</span>
                </div>
            </div>
            <div className="links d-flex flex-column">
                <h5>Links</h5>
                <ul style={{listStyle:'none'}}>
                    <li>Landing Page</li>
                    <li>Home Page</li>
                    <li>Watch History</li>
                </ul>

            </div>
            <div className="guides">
                <h5>Guides</h5>
            <ul style={{listStyle:'none'}}>
                    <li>React JS</li>
                    <li>React Router</li>
                    <li>React BootStrap</li>
                </ul>
            </div>
            <div className="contact">
                <h5>Contact</h5>
                <div className='d-flex'>
                    <input type="text" className="form-control me-1" placeholder='Email address' />
                    <div className='bg-info' style={{width:'40px',height:'40px',}}><i class="fa-solid fa-magnifying-glass sbut " style={{color:'black',width:'40px'}}></i></div>
                    </div>
                    <div className="icons d-flex justify-center-evenly">
                    <i className="fa-brands fa-twitter me-5 mt-2 mt-3" style={{color: '#f5f5f5',height:'50px'}}></i>
                    <i className="fa-brands fa-facebook me-5 mt-2 mt-3" style={{color: '#ffffff',height:'50px'}}></i>
                    <i className="fa-brands fa-instagram mt-3" style={{color: '#f5f5f5',height:'50px',width:'50px'}}></i>
                    </div>
            </div>
        </div>
        </div>
  )
}

export default Footer