import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button} from 'react-bootstrap'
const LogoutButton = () => {
    //Logout component which use the logout hook to be able to logout from the website
    const { logout } = useAuth0();

    return (
        <Button style={{position:"absolute",left:'89rem',top:'1.1rem'}} variant="primary" className="logOutBtn" onClick={() => {logout({ returnTo: window.location.origin })}}>
            Log Out
        </Button>
    );
};

export default LogoutButton;