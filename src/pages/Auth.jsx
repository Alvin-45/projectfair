import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import loginimg from '../assets/login.jpg' 
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function Auth({insideRegister}) {
  const navigate = useNavigate()
  const [userInputs ,setUserInputs] = useState({
    username:"",email:"",password:""
  })
  console.log(userInputs);

  const handleRegister = async (e)=>{
    e.preventDefault()
    if(userInputs.username && userInputs.email && userInputs.password){
      //api call
      try{
          const result = await registerAPI(userInputs)
          console.log(result);
          if (result.status==200){
            toast.success(`Welcome ${result.data.username}...please login to Explore More`)
            setUserInputs({username:"",email:"",password:""})
            setTimeout(()=>{
              navigate('/login')
            },2000);
          }else{
             toast.error(result.response.data)
             setTimeout(()=>{
             setUserInputs({username:"",email:"",password:""})
          },2000);
          }
      }catch(err){
          console.log(err);
         
      }
    }else {
      toast.info("Please fill the Form Completely")
    }


  }


  const handleLogin = async (e)=>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
      try{
        const result = await loginAPI(userInputs)
        if (result.status==200){
           sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
           sessionStorage.setItem("token",result.data.token)
          toast.success(`Welcome ${result.data.existingUser.username}...`)
          setUserInputs({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/')
          },2000);
        }else{
           toast.error(result.response.data)
           
        }
      }
      catch(err){
        console.log(err);
      }
    }else{
        toast.warning("Please Fill The Form Completely!!!")
      }
  }

   
  // console.log(userInputs);
  return (
    <div style={{width:"100%",height:"100vh"}} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
      <Link to={'/'} style={{textDecoration:"none"}} className='fw-bolder'><i className='fa-solid fa-arrow-left'></i>Back To Home</Link>
      <div className='card shadow p-5'>
        <div className='row align-items-center'>
          <div className="col-lg-6">
            <img className='w-100' src={loginimg} alt="" srcset="" />
          </div>
          <div className="col-lg-6">
          <h1 className="fw-bolder mt-2">
          <i className='fa-brands fa-docker'></i> Project Fair
          </h1>
          <h5 className="fw-bolder mt-2">
            <p>Sign {insideRegister? "Up" :"In"} To Your Account</p>
          </h5>

         <Form>

          { insideRegister &&  <FloatingLabel
          controlId="floatingInput1"
          label="Username"
          className="mb-3"
        >
          <Form.Control value={userInputs.username} onChange={ e=>setUserInputs({...userInputs,username:e.target.value})} type="text" placeholder="Username" />
        </FloatingLabel>}
            <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control value={userInputs.email} onChange={ e=>setUserInputs({...userInputs,email:e.target.value})}  type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">

          <Form.Control value={userInputs.password} onChange={ e=>setUserInputs({...userInputs,password:e.target.value})}  type="password" placeholder="Password" />
        </FloatingLabel>

        {
          insideRegister ? 
          <div>
            <button onClick={handleRegister} className='btn btn-primary mt-2 mb-2'>Register</button>
            <p>Already Have An Account ? Click here to <Link style={{textDecoration:"none"}} to={'/login'}>Login</Link> </p>
          </div> : 
           <div>
           <button onClick={handleLogin} className='btn btn-primary mt-2 mb-2'>Login</button>
           <p>New User ? Click here to <Link style={{textDecoration:"none"}} to={'/register'}>Register</Link> </p>
         </div>
        }
  
         </Form>
          </div>
        </div>
      </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
  );
}

export default Auth