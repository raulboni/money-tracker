import {useState, useEffect, useRef} from 'react'
import { projectFirestore } from '../firebase/config'


export const useCollection = (collection, _query, _orderBy)=>{
    
    
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const query = useRef(_query).current //Remember you can't use reference type data as a useEffect dependency, it causes infinite loop
    const orderBy = useRef(_orderBy).current
    useEffect(()=>{
        let ref = projectFirestore.collection(collection)
        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref= ref.orderBy(...orderBy)
        }
        //we create an array of objects where we destructure doc.data and add the document id(we'll use it as key)
        const unsubscribe = ref.onSnapshot((snapshot)=>{
            let results = []
            snapshot.docs.forEach(doc =>{
                console.log(doc)
                results.push({...doc.data(), id: doc.id})
            })
        //update state
        setDocuments(results)
        setError(null)
        }, (error)=>{
            console.log(error)
            setError(error.message)
        })

        //unsuscribe on unmount
        return ()=> unsubscribe()
    }, [collection, query, orderBy])

    return {documents, error}
}