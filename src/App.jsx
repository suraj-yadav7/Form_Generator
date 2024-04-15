import React, { useState } from 'react';
import {jsPDF} from 'jspdf';
import './App.css'

function App() {
  // form data state
  const [formData, setFormData] = useState({
  })

  // generate btn disable state
  const [btnDisable, setBtnDisable]=useState(true)

console.log(formData)

// handle user input value
  const handleChange = (event)=>{
    const {name, value} = event.target
    setFormData({...formData,[event.target.name]:event.target.value})
    setBtnDisable(true);
  }

//Handle Form Submission 
  function handleSubmit(e){
    e.preventDefault();
    setBtnDisable(false);
  }

  // Form generator function
  const generatePdf = function pdfGenerator(data){
    const {name, course} = data
    const doc = new jsPDF()

    const now = new Date()
    const date = now.toLocaleString()
    console.log("generate form: ", name, course, date)
    doc.setFontSize(20)
    doc.setFont('bold')
    doc.text('Student Details',20,20)

    doc.setFontSize(16)
    doc.setFont('normal')
    doc.text(`Full Name: ${name}`, 20,30)
    doc.text(`Course: ${course}`, 20,40)

    doc.setFontSize(14)
    doc.text(`Date: ${date}`, 20,50)
    doc.save('Student_Form.pdf');
  }

  
  return (
    <>
    <div className='main'>
      <div className="form-container">
        <h3 className='formHeading'>Student Course Selection Form</h3>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input type="text" onChange={handleChange} name='name' value={formData.value} placeholder='Your Name' className="form-input"/>
        </label>
        <label className='form-label'>
        Course:
        <select className="dropdown-select" onChange={handleChange} name='course' value={formData.value}>
          <option value=''>--please select--</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
        </select>
        </label>  
        <button type='submit' className="form-button">Submit</button>
        <button type='button' disabled={btnDisable} onClick={()=>generatePdf(formData)}>Generate PDF</button>
        { !btnDisable?
          <h4 className='infoText' style={{color:'Green'}}>Form is submitted click on Generate for PDF</h4>
          :<h4 className='infoText'>PDF Form Creator</h4>
        }
      </form>
      </div>
    </div>
    </>
  )
}

export default App
