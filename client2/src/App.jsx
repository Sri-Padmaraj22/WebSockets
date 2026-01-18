import { useState } from 'react'
import io from 'socket.io-client'
import './App.css'
import { useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';

function App() {
  const [formInputs,setFormInputs]=useState({});
  const [crudData,setCrudData]=useState([]);
  const [isEdit,setIsEdit]=useState(false);
  const socket=io('localhost:3000');
  const handleInput=(event)=>{
    const {name,value}=event.target;
    let obj={[name]:value};
    setFormInputs((prev)=>({...prev,...obj}));
  }

  const handleSubmit = ()=>{
    socket.emit('formData',{...formInputs,id: uuidv4()});
    socket.on('crudData',(crudData)=>{
      setCrudData(crudData);
    })
    
    setFormInputs({
      name:'',
      age:'',
      phone:''
    });
  };
  const getEditData=(data)=>{
    setFormInputs(data);
    setIsEdit(true);
  }

  const handleEdit=()=>{
    socket.emit('editData',formInputs);
    setIsEdit(false);
    setFormInputs({
      name:'',
      age:'',
      phone:''
    });
  }

  const handleDelete=(id)=>{
    socket.emit('deleteData',id);
  }
  useEffect(()=>{
    socket.on('crudData',(crudData)=>{
      setCrudData(crudData);
    });
  },[])
  return (
    <>
      <h1>CRUD operations</h1>

      <div className='form-fields'>
        <input onChange={handleInput} name='name'className='input-field' placeholder='Enter your name' value={formInputs.name} />
        <input onChange={handleInput} name='age'className='input-field' placeholder='Enter your age' value= {formInputs.age}/>
        <input onChange={handleInput} name='phone' className='input-field' placeholder='Enter your phone number' value= {formInputs.phone}/>


        <button onClick={isEdit? handleEdit:handleSubmit}>{isEdit? "Edit":"Add"} Data</button>
      </div>

      <div>
        {crudData.map((data)=>(
          <>
          <h1>{data.name}</h1>
          <p>{data.age}</p>
          <p>{data.phone}</p>
          <button onClick={()=>getEditData(data)}>Edit</button>
          <button onClick={()=> handleDelete(data?.id)}>Delete</button>
          </>
        ))}
      </div>
    </>
  )
}

export default App
