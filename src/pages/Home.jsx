import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landing from '../assets/admin.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import Header from '../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI'

function Home() {
  const [homeProjects,setHomeProjects] = useState([])
  const navigate = useNavigate()
  const [loginStatus,setLoginStatus] = useState(false)
 console.log(homeProjects);

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setLoginStatus(true)
    }else{
      setLoginStatus(false)

    }
  },[])

  const handleProjects=()=>{
    if(loginStatus){
      navigate('/projects')

    }else{
      toast.warning("Please login to get full access to our Projects!!!")
    }

  }

  const getHomeProjects = async ()=>{
    try{
      const result = await getHomeProjectsAPI()
      console.log(result);
      if(result.status==200){
        setHomeProjects(result.data)
      }

    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
    <Header/>
      <div style={{minHeight:'100vh'}} className='w-100 d-flex justify-content-center align-items-center rounded border border-shadow'>
          <div className='container'>
            <div className='row'>
                <div className="col-5">
                  <h1 style={{fontSize:"80px"}}> <i className='fa-brands fa-docker'></i>Project Fair</h1>
                  <p style={{textAlign:"justify"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus ducimus, quasi nam culpa, at vitae cupiditate facilis beatae tempora, dolore distinctio aliquid mollitia? Doloribus veniam magni eaque expedita quisquam hic?</p>

                 {
                 loginStatus?   

                 <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects<i className='fa-solid fa-arrow-right'></i></Link>
                 : 
                 <Link to={'/login'} className='btn btn-warning'>Starts to Explore <i className='fa-solid fa-arrow-right'></i></Link>
                 }
                </div>
                <div className="col-5">
                <img className='img-fluid' src={landing} alt="No Image" />
                </div>
  
  
            </div>

          </div>
  
      </div>
  
      <div className='text-center mt-5'> 
        <h1 className=' mb-5' >Explore Our Projects</h1>
        <marquee>
          <div style={{marginBottom:"80px"}} className='d-flex'>
          { 
            homeProjects?.length>0 &&
            homeProjects?.map(project=>( 
            <div key={project} className='me-5'>
              <ProjectCard displayData={project} />
            </div>)) 
          }
          </div>
        </marquee>
        <button onClick={handleProjects} className='btn btn-link mt-3'>Click Here To View More Projects</button>

      </div>

      <div className='d-flex align-items-center mb-5 mt-5 flex-column'>
          <h1>Our Testimonials</h1>
          <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>

          <Card style={{ width: '18rem',height:'22rem' }}>
         <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
         <span> BatMan</span>
         <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn-icons-png.flaticon.com/512/805/805385.png" alt="" srcset="" />
        </Card.Title>
        <Card.Text>
          <div className="d-flex">
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>

          </div>
          <p className='mt-1'> I am vengeance, I am the night, I am Batman!</p>
        </Card.Text>
      </Card.Body>
          </Card>

          <Card style={{ width: '18rem',height:'22rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
         <span>Arnold</span>
         <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="data:image/png;base64,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" alt="" srcset="" />
        </Card.Title>
        <Card.Text>
          <div className="d-flex">
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>

          </div>
          <p className='mt-1'> “Hasta la vista, baby.” </p>
        </Card.Text>
      </Card.Body>
          </Card>

          <Card style={{ width: '18rem',height:'22rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'>
         <span>Harley Quinn</span>
         <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://pbs.twimg.com/media/EzYN1aRVcAc7RCB.jpg:large" alt="" srcset="" />
        </Card.Title>
        <Card.Text>
          <div className="d-flex">
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>

          </div>
          <p className='mt-1'>"I'm Rubber, You're Glue, Whatever You Say Bounces Off Me And Makes A Six-Inch-Diameter Exit Wound In You."</p>
        </Card.Text>
      </Card.Body>
          </Card>

          </div>


      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Home