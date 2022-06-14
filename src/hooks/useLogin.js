import { useState } from "react"
import { useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = ()=>{
    const [isCancelled, setIsCancelled]= useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password)=>{
    setError(null)
    setIsPending(true)

    try{
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        
        if (!res){throw new Error('could not login')}
        dispatch({type: 'LOGIN', payload: res.user})

        if(!isCancelled){
            setIsPending(false)
            setError(null)
           }

    }catch(err){
        setError(err.message)
        console.log(err.message)
        setIsPending(false)
    }
    

    }
    //In case the component unmounts this cleanup function sets isCancelled to true  and we dont update data in the component
    useEffect(()=>{
        return ()=>{
            setIsCancelled(true)
        }
    }, [])
    
    return {login, error, isPending}
}