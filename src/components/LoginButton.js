import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Button} from 'react-bootstrap'
function LoginButton() {
    //Login component which use the isAuthenticated hook to be able to Login from the website
    const {
      isAuthenticated,
      loginWithRedirect,
    } = useAuth0();
  
    return !isAuthenticated && (
      <Button variant="light" style={{width:'40%'}} onClick={loginWithRedirect}>Log in</Button>
    );
  }
  
  export default LoginButton;
