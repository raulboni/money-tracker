import styles from './Login.module.css'


import {useState , useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import { useAuthContext } from '../../hooks/useAuthContext'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isPending} = useLogin()
  const history = useHistory()
  const {user} = useAuthContext()

  const handleSubmit = (e)=>{
    e.preventDefault()
    login(email, password)
    
  }
  
  useEffect(() => {
    user && history.push('/')

  }, [user])
  
  
  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}
    >
      <h2>Login</h2>
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
      {!isPending && <button className='btn'>Login</button>}
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
    </form>
  )
}
