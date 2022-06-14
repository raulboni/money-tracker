import {useState, useEffect} from 'react'
import {projectAuth} from '../firebase/config'
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {
    const [isCancelled, setIsCancelled]= useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const {dispatch} = useAuthContext()

    const signup = async (email, password, displayName )=>{
        setError(null)
        setIsPending(true)

        try{
            //signup user
           const res = await projectAuth.createUserWithEmailAndPassword(email, password)
           
           if (!res){
               throw new Error('could not complete signup')
           }

           //add display name
           await res.user.updateProfile({displayName: displayName})

           //dispatch login action
           dispatch( {type: 'LOGIN', payload: res.user})

//(clean up) we only update state if isCancelled is false
           if(!isCancelled){
            setIsPending(false)
            setError(null)
           }
           
        }catch(err){
            if(!isCancelled){
                console.log(err)
            setError(err.message)
            setIsPending(false)
            }
        }
            
        
    }
    useEffect(()=>{
        return ()=>{
            setIsCancelled(true)
        }
    }, [])
  

    return {error, isPending, signup}
}
