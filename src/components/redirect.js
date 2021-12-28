import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import BuyerDashboard from './buyerDashboard'
import SellerDashboard from './sellerDashboard'
import Login from './login'

class Redirect extends Component {
    //Redirect Component which responsiable for render the buyer dashboard or seller dashboard depending on your role which existed in the API

    render() {
        const { user } = this.props.auth0
        return (
            
            <div>
                <div className='flex w-full h-full'>
                    {this.props.buyers.includes(user.email)? (
                        <BuyerDashboard email={user.email}/>
                    ) : this.props.sellers.includes(user.email) ? (
                        <SellerDashboard email={user.email} />
                    ) : (
                        <Login/>
                    )}
                </div>


            </div>
        )
    }
}
export default withAuth0(Redirect)

