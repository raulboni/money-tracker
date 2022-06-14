import styles from './Navbar.module.css'

import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import {useLogout} from '../hooks/useLogout'

export const Navbar = () => {
  const {user}= useAuthContext()
  const {logout} = useLogout()
  
  
  
  
  return (
    <nav className={styles.navbar}
    >
        <ul>
          <li className={styles.title}>
            <Link to='/'>miMoney</Link></li>  
          {!user && 
          <>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          </>
          }
          {user && <>
          <p>Hola {user.displayName}</p>
            <button
          className='btn'
          onClick={logout}>Logout</button></>}
          
        </ul>
    </nav>
  )
}
