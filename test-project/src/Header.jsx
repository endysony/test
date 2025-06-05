import React, {useState, useRef} from 'react'
import Audio from './assets/audio.mp3'


function Header(){
   
const items = [
{name :"apple" , quantity : 30,},
{name :"banama" , quantity : 10,},
{name :"pineapple" , quantity : 20,},
]

return (
  <div className="container">
    {items.map((item, index) => (
      <div key={index} className="box">
        <h3>{item.name}</h3>
        <p>{item.quantity}</p>
      </div>
    ))}
  </div>
);

 

  
}

export default Header