import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadpic from '../assets/uploadpic.png'
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../services/allAPI';
import ContextAPI, { editResponseContext } from '../contexts/ContextAPI';



function Edit({ project }) {
  const { editResponse, setEditResponse } = useContext(editResponseContext)
  console.log(project);
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("")
  
  const [projectData, setProjectData] = useState({
    id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectImage: "" //projectimage kept empty to find whether updated or not
  })
  const handleClose = () => {
    setShow(false);
    setProjectData({ _id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectImage: "" })
    setPreview()
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage))
    } else {
      setPreview("")
    }
  }, [projectData.projectImage])

  const handleupdateProject = async () => {
    const { title, language, github, website, overview } = projectData
    if (!title || !language || !overview || !github || !website) {
      toast.warning("Please fill the form completely!!!")
    } else {

      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        //api call
        try {
          const result = await editProjectAPI(projectData.id, reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            setEditResponse(result)  //new change
            handleClose()
          } else {
            console.log(result.response)
          }
        } catch (err) {
          console.log(err);
        }

      }
    }

  }
  return (
    <>
      <button onClick={handleShow} className='btn'><i className="fa-solid fa-edit"></i></button>

      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} type="file" style={{ display: "none" }} />
                <img style={{ height: "200px" }} className='img-fluid' src={preview ? preview : `${SERVER_URL}/uploads/${project.projectImage}`} alt="" srcset="" />
              </label>
            </div>
            <div className="col-lg-8">
              <div className='mb-2'><input value={projectData.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })} type="text" className="form-control" placeholder='Project Title' /></div>
              <div className='mb-2'><input value={projectData.language} onChange={e => setProjectData({ ...projectData, language: e.target.value })} type="text" className="form-control" placeholder='Languages Used' /></div>
              <div className='mb-2'><input value={projectData.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })} type="text" className="form-control" placeholder='Project GitHub Link' /></div>
              <div className='mb-2'><input value={projectData.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} type="text" className="form-control" placeholder='Project Website Link' /></div>
              <div className=''><input value={projectData.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })} type="text" className="form-control" placeholder='Project Overview' /></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleupdateProject}>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Edit