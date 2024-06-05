import React, { useState, useEffect, useContext } from 'react'
import Edit from './Edit'
import Add from './Add'
import { getUserProjectsAPI, removeProjectAPI } from "../services/allAPI";
import Projects from '../pages/Projects';
import { addResponseContext, editResponseContext } from '../contexts/ContextAPI';

function View() {
  const { addResponse, setAddResponse } = useContext(addResponseContext)
  const {editResponse,setEditResponse}=useContext(editResponseContext)

  const [userProjects, setUserProjects] = useState([])

  console.log(userProjects);
  useEffect(() => {
    getUserProjects()
  }, [addResponse,editResponse])

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await getUserProjectsAPI(reqHeader)
      console.log(result);
      if (result.status == 200) {
        setUserProjects(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteProject=async (projectId)=>{
    const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader ={
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
        //api call
        try{
          const result = await removeProjectAPI(projectId,reqHeader)
          console.log(result);
          if (result.status==200) {
            getUserProjects()
          }else{
            console.log(result)
          }
        }catch(err){
          console.log(err);
        }

      }
  }

  return (
    <>
      <div className="d-flex justify-content-between w-100">
        <h2 className='text-warning'>
          All Projects
        </h2>
        <button className='btn'>
          <Add />
        </button>
      </div>
      <div className="mt-4">
        {
          userProjects?.length > 0 ?

            userProjects?.map(project => (
              <div className="d-flex justify-content-between border p-2 rounded mb-2">
                <h3>{project?.title}</h3>
                <div className="icons d-flex">
                  <div className='btn'><Edit project={project} /></div>
                  <div className='btn'> <a href={project?.github} target='_blank'><i className="fa-brands fa-github"></i></a></div>
                  <button className='btn' onClick={()=>handleDeleteProject(project?._id)}><i className="fa-solid fa-trash text-danger"></i></button>
                </div>
              </div>
            ))
            :
            <div className=' fw-bolder text-danger text-center'>No Projects Uploaded Yet !!!</div>
        }
      </div>
    </>
  )
}

export default View