import React, { useEffect, useState } from 'react';
import {jsPDF} from 'jspdf';
import './App.scss'

function App() {
  // form data state
  const [formData, setFormData] = useState({
    Name:'',
    DOB:'',
    Gender:"",
    Address:'',
    SSC:'',
    MPC:'',
    Rank:'',
    Caste:'',
    Course:'',
    Specialization:''
  });

  // generate btn disable state
  const [btnDisable, setBtnDisable]=useState(true);
  // submit btn disable state
  const [submitBtn, setSubmitBtn]=useState(true);

// handle user input value
  const handleChange = (event)=>{
    const {name, value} = event.target
    setFormData({...formData,[name]:value})
    setBtnDisable(true);
  };

//Handle Form Submission 
  function handleSubmit(e){
    e.preventDefault();
    setBtnDisable(false);
  };
  // Form generator function
  const generatePdf = function pdfGenerator(data){
    const {Name, Course, Address, Caste,DOB, Rank,Gender
          ,MPC, SSC,Nationality,Specialization} = data
    const doc = new jsPDF();

    const now = new Date()
    const date = now.toLocaleString()
    doc.setFontSize(22)
    doc.setFont('bold')
    doc.text('Student Details',20,20)

    doc.setFontSize(16)
    doc.setFont('normal')
    doc.text(`Full Name: ${Name}`, 20,30)
    doc.text(`Course: ${Course}`, 20,40)
    doc.text(`D.O.B: ${DOB}`, 20,50)
    doc.text(`Gender: ${Gender}`, 20,60)
    doc.text(`Nationality: ${Nationality}`, 20,70)
    doc.text(`Address: ${Address}`, 20,80)
    doc.text(`SCC CGPA: ${SSC}`, 20,90)
    doc.text(`MPC Score: ${MPC}`, 20,100)
    doc.text(`Entrance Rank: ${Rank}`, 20,110)
    doc.text(`Caste: ${Caste}`, 20,120)
    doc.text(`Course: ${Course}`, 20,130)
    doc.text(`Specialization: ${Specialization}`, 20,140)

    doc.setFontSize(12)
    doc.text(`Date: ${date}`, 150,160)
    doc.save('Student_Form.pdf');
  };

  useEffect(()=>{
    // submit handled
    const isFormCompleted = Object.values(formData)
    let index = isFormCompleted.includes('')
    if(index)setSubmitBtn(true)
    else setSubmitBtn(false)
  },[formData]);

  return (
    <>
    <div className='main'>
      <div className="form-container">
        <h3 className='formHeading'>Student Course Selection Form</h3>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Full Name:
          <input type="text" onChange={handleChange} name='Name' value={formData.value} placeholder='Your Name' className="form-input"/>
        </label>
        <div className='introDetails'> 
          <lable className='form-label'>
            Date of Birth
          <input  type='text' name='DOB' placeholder='date of birth' onChange={handleChange} value={formData.value}/>
          </lable>
          <label className='form-label'>
          Gender:
          <select className="dropdown" onChange={handleChange} name='Gender' value={formData.value}>
            <option value=''>please select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="others">Others</option>
          </select>
        </label>
        <lable className='form-label'>
          Nationality:
          <input  type='text' name='Nationality' placeholder='nationality' onChange={handleChange} value={formData.value}/>
          </lable>
        </div>
        <label className='form-label'>
          Address:
          <input className="form-input" type='text' name="Address" placeholder='address'onChange={handleChange} value={formData.value} />
        </label>
        <div className='marks'>
          <label className="form-label">
            SSC CGPA:
            <input type="float" onChange={handleChange} name='SSC' value={formData.value} placeholder='10th cgpa' className="form-input"/>
          </label>
          <label className="form-label">
            MPC Score:
            <input type="float" onChange={handleChange} name='MPC' value={formData.value} placeholder='10+2 score' className="form-input"/>
          </label>
        </div>
        <div className='middleDetails'>
          <label className="entrancelabel">
            Entrance Test Rank:
            <input type="number" onChange={handleChange} name='Rank' value={formData.value} placeholder='rank' className="entranceInput"/>
          </label>
          <label className='castelabel'>
          Category:
          <select className="dropdown-select" onChange={handleChange} name='Caste' value={formData.value}>
            <option value=''>--please select--</option>
            <option value="OC">OC</option>
            <option value="EBC">EBC</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
          </label>
        </div>
        <div className='form-label radioIp'>
          <span style={{fontWeight:"bold",fontSize:'1.1rem'}}>Course:</span>
          <label>
            <input type='radio' name='Course' onChange={handleChange} value='B.Tech'/>B.Tech
          </label>
          <label>
            <input type='radio' name='Course' onChange={handleChange} value='B.E' />B.E
          </label>
        </div>
        <label className='form-label'>
        <span style={{fontSize:'1.1rem',letterSpacing:'1px'}}>Specialization: </span>
        <select className="dropdown-select" onChange={handleChange} name='Specialization' value={formData.value}>
          <option value=''>--please select--</option>
          <option value="Computer Science Engineering">Computer Science Engineering</option>
          <option value="Data Science Engineering">Data Science Engineering</option>
          <option value="Electronics & Communication Engineerin">Electronics & Communication Engineering</option>
          <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Chemical Engineering">Chemical Engineering</option>
        </select>
        </label>   
        <button type='submit' className="form-button" disabled={submitBtn}>Submit</button>
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
};
export default App;
