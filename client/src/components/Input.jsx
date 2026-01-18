import React from 'react'

const Input = (props) => {
  let {name,placeholder,handleInput}=props;
  return (
    <div>
      <input name={name} onChange={handleInput} className='input-field' placeholder={placeholder}/>
    </div>
  )
}

export default Input
