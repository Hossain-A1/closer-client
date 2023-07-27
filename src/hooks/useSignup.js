import { useState } from "react";
import { useUserContext } from "./useUserContext";
export const useSignup = ()=>{

  const {dispatch} = useUserContext()

  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)

  const signup = async (username,email,password)=>{
setLoading(true)
setError(null)

const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/signup`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({username,email,password})
})

const json = await res.json()

// res !== ok
if(!res.ok){
  setLoading(false)
  setError(json.error)
}
// res === ok

if(res.ok){
  dispatch({type:"LOGIN", payload:json})
  localStorage.setItem("user", JSON.stringify(json));
  

}

  }
  return {signup,error,loading}

}