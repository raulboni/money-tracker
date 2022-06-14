import styles from './Signup.module.css'


import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'
import { useAuthContext } from '../../hooks/useAuthContext'
export const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const {signup, isPending, error} = useSignup()
  const history = useHistory()
  const {user} = useAuthContext()

  const handleSubmit = (e)=>{
    e.preventDefault()
    signup(email, password, displayName)
    
  }

  useEffect(() => {
    user && history.push('/')

  }, [user])

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
       <h2>Sign Up</h2>
      <label>
        <span>Email:</span>
        <input
        type='email'
        onChange={(e)=>(setEmail(e.target.value))}
        value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
        type='password'
        onChange={(e)=>(setPassword(e.target.value))}
        value={password}
        />
      </label>

      <label>
        <span>Display Name:</span>
        <input
        type='text'
        onChange={(e)=>(setDisplayName(e.target.value))}
        value={displayName}
        />
      </label>

      {!isPending && <button className='btn'>Sign Up</button>}
      {isPending && <button className='btn' disabled>Loading</button>}

      {error && <p>{error}</p>}
    </form>
  )
}
