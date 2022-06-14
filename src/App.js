import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './pages/home/Home';
import { Signup } from './pages/signup/Signup';
import { Login } from './pages/login/Login';
import { Navbar } from './components/Navbar';

import {useAuthContext} from './hooks/useAuthContext'



function App() {
  const {authIsReady, user} = useAuthContext()
  return (
    
    <div className="App">
      {authIsReady && (      //do not render anything until we know a user is logged in or not
        <BrowserRouter>
        <Navbar/>
          <Switch>
           
            <Route exact path="/">
            {!user && <Redirect to="/login"/>}
              {user && <Home />}
              
            </Route>
            <Route path="/signup">
            {!user && <Signup/>}
              {user && user.displayName && <Redirect to="/"/>}
            </Route>
            <Route path="/login">
              {!user && <Login/>}
              {user && <Redirect to="/"/>}
            </Route>
            
          </Switch>
        
        </BrowserRouter>
      ) }
      
    </div>
  );
}

export default App
