import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = ()=>{
  const [error,setError] = useState(null)
const [loading,setLoading] = useState()
const {dispatch} = useUserContext()

  const login = async(email,password)=>{
setLoading(true)
setError(null)
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },body:JSON.stringify({email,password})
  })

  const json = await res.json()

  if(!res.ok){
    setLoading(false)
    setError(json.error)
  }

  if(res.ok){
dispatch({type:"LOGIN",payload:json})
localStorage.setItem("user", JSON.stringify(json));
setLoading(false)

  }
  }
  return {login,error,loading}
}