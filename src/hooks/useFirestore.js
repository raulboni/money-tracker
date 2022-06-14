import {useReducer, useEffect, useState} from 'react'
import { projectFirestore, timestamp } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}
const firestoreReducer = (state, action) =>{
    switch(action.type){
        case 'IS_PENDING':
            return {isPending: true, document: null, success:false, error: null}
        case 'ADDED_DOCUMENT':
            return {isPending: false, document: action.payload, success: true, error: null}
        case 'DELETE':
            return {isPending: false, document: action.payload, success: true, error: null}
        case 'ERROR':
            return {isPending: false, document: null, succedd: false, error: action.payload}
        default: 
            return state
    }
}
export const useFirestore = (collection) =>{
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    const [isCancelled, setIsCancelled]= useState(false)

    //colecction ref
    const ref = projectFirestore.collection(collection)

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action)=>{
        if(!isCancelled){
            dispatch(action)
        }
    }

    //add document
    const addDocument = async (doc)=>{
        dispatch({type: 'IS_PENDING'})
        try{
        const createdAt = timestamp.fromDate(new Date()) //We store the date the document was created
        const addedDocument = await ref.add({...doc, createdAt})   
        dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }

    }
    //delete document
    const deleteDocument = async (id)=>{
        dispatch({type: "IS_PENDING"})
        try{
            const deletedDocument = await ref.doc(id).delete()
            dispatchIfNotCancelled({type: 'DELETE', payload: deletedDocument})
        }catch(err){
            dispatchIfNotCancelled({type: 'ERROR', payload: err.message})
        }

    }

    useEffect(()=>{
        return ()=>setIsCancelled(true)
    }, [])

    return {addDocument, deleteDocument, response}
}