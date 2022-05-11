import { createContext, useState } from "react";

export const context = createContext('');

export default (props)=>{

	const[myTagss,setMyTagss]= useState([])
	console.log(myTagss,"toy context");

	return (
    <context.Provider value={myTagss,setMyTagss} >
      {props.children}
    </context.Provider>
  )
}

