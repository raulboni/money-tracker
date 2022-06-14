import styles from './Home.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import {useCollection} from '../../hooks/useCollection'
import React from 'react'
import { TransactionForm } from './TransactionForm'
import { TransactionList } from '../../components/TransactionList'

export const Home = () => {
  const {user}= useAuthContext()
  console.log(user.uid)
  
  const {documents, error} =useCollection('transactions', 
  ["uid.uid", "==", user.uid],
  ["createdAt", "desc"]
  )
  console.log(documents)
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList documents={documents}/>}
      </div>
      <div className={styles.sidebar}>
      <TransactionForm uid={user.uid}/> </div>
    </div>
  )
}
