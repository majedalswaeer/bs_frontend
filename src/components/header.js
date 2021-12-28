import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import './header.css'
import LogoutButton from './logout'


class Header extends Component {
    //Header class which creating the header component and render it in both buyer and seller sides
    render() {
        const { user } = this.props.auth0

        return (
            <>
                <header class="header">
                    <p style={{ color: 'white', marginLeft: '3px' }} class="navbar-brand  font-weight-bold color-white">Hello {user.name}</p>
                    <LogoutButton />
                </header>
                <div class="container">
                    <div class="pt-5 mb-2 text-white">
                    </div>
                </div>

            </>
        )
    }
}

export default withAuth0(Header)
