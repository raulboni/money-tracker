import React from 'react'
import { useFirestore } from '../hooks/useFirestore'

export const Delete = ({id}) => {
    const {deleteDocument}=useFirestore('transactions')
    
    const handleClick = async () =>{
        deleteDocument(id)
    }
  return (
    <div
    onClick={handleClick}>Delete</div>
  )
}
