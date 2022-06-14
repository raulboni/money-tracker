import React from 'react'
import styles from './TransactionList.module.css'
import { useFirestore } from '../hooks/useFirestore'

export const TransactionList = ({documents}) => {
  
  const {deleteDocument}=useFirestore('transactions')
  
  return (
    <ul className={styles.transactions}>
        {documents.map((doc)=>(
            <li key={doc.id}>
                <p className={styles.name}>{doc.name}</p>
                <p className={styles.amount}>${doc.amount}</p>
                <button
                onClick={()=>(deleteDocument(doc.id))}>x</button>
                
            </li>
        ))}
    </ul>
  )
}
