import {useEffect, useState} from 'react'
import { useFirestore } from '../../hooks/useFirestore'


export const TransactionForm = (uid) => {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  
  const {addDocument, response} = useFirestore('transactions')
  
  
  
  const handleSubmit = async (e)=>{

    e.preventDefault();

    addDocument({
        uid,
        name, 
        amount, 
    })}


    //reset form when document added
    useEffect(() => {
      if(response.success){
        setAmount('')
        setName('')
      }
    }, [response.success])
    
  
  

  return (
    <>
    <h3>Añadir transacción</h3>
    <form onSubmit={handleSubmit}>
        <label>
            <span>Nombre</span>
            <input
            type='text'
            required
            onChange={(e)=>setName(e.target.value)}
            value={name}
            />
        </label>

        <label>
            <span>Cantidad($):</span>
            <input
            type='number'
            required
            onChange={(e)=>setAmount(e.target.value)}
            value={amount}
            />

        </label>
        <button>Añadir transacción</button>
    </form>
    </>
  )
}
