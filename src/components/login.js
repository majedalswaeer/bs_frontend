import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import LoginButton from './LoginButton';

class Login extends React.Component {
    //This class creats the login component which apper one you open this website
    render() {

        return (
            <>
            <h1 style={{backgroundColor: 'black',textAlign: 'center',color: 'white',paddingBottom:'1rem'}}>Welcome Back!</h1>
            <div>
                <div class="card" style={{padding:'10rem',width:'50%', marginLeft: '24% ',marginTop: '10% ',backgroundImage:'url(https://i.gifer.com/J8L4.gif)',backgroundRepeat:'no-repeat',backgroundSize:'cover',color:'white',borderRadius:'2rem' }}>
                    <div class="card-body" style={{ textAlign: 'center',marginTop:'1rem' }}>
                        <h5 class="card-title">Click Below to Log In</h5>
                        <p class="card-text" ><LoginButton /></p>
                    </div>
                </div>

            </div>
            </>
        )
    }
}

export default Login;


