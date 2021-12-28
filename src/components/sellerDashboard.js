import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import { withAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap'
import Header from './header'


class SellerDashboard extends Component {
    //SellerDashboard class which is responsiable for rendring the seller dashboard with its information
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            showAlert: false

        }
    }

    componentDidMount = async () => {
        const { user } = this.props.auth0
        let appointmentsData = await axios.get(`http://localhost:3001/getseller/${user.email}`)

        await this.setState({
            data: appointmentsData.data
        })

    }
    acceptFunc = async (bookerEmail, id, index) => {
        swal({
            title: "Appointment Accepted",
            text: `The appointment for ${bookerEmail} has been accepted`,
            icon: "success",
            button: "Close",
        })


        const { user } = this.props.auth0
        let myOb = {
            booker: bookerEmail,
            booked: true,
            pending: false,
            accepted: true
        }

        await axios.put(`http://localhost:3001/update-app/${user.email}/${index}`, myOb)
        this.setState({
            data: this.state.data.filter(item => item._id !== id)
        })
    }
    rejectFunc = async (bookerEmail, id, index) => {
        swal({
            title: "Appointment Rejected",
            text: `The appointment for ${bookerEmail} has been rejected`,
            icon: "error",
            button: "Close",
        })
        const { user } = this.props.auth0
        let myOb = {
            booker: bookerEmail,
            booked: false,
            pending: false,
            accepted: false
        }

        await axios.put(`http://localhost:3001/update-app/${user.email}/${index}`, myOb)
        this.setState({
            showAlert: true,
            data: this.state.data.filter(item => item._id !== id)
        })
    }
    render() {

        return (
            <>
                <div>
                    <Header />
                    <h1 style={{ margin: '1rem', textAlign: 'center', fontSize: '2rem', fontFamily: 'sans-serif' }}>Seller Dashboard</h1>
                    <h1 style={{ margin: '1rem', fontSize: '1.5rem', fontFamily: 'sans-serif', color: 'green' }}>Booking Requests</h1>
                    <div style={{ marginTop: '1rem', borderStyle: 'outset', borderColor: 'lightgrey', borderRadius: '3px',borderBottom:'none' }} >
                        <div class="card-group" style={{ display: 'grid', gridTemplateColumns: '28rem 28rem 28rem', marginLeft: '7rem ',marginTop:'1rem' }}>
                            {this.state.data.map((element, index) => {
                                return (
                                    <div class="card" style={{ marginLeft: '2rem ', marginRight: '2rem ' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <img class="card-img-top" src="https://static.vecteezy.com/system/resources/previews/002/608/327/non_2x/mobile-application-avatar-web-button-menu-digital-silhouette-style-icon-free-vector.jpg" alt="wte" style={{ textAlign: 'center', width: '10rem', height: '10rem' }} />
                                        </div>
                                        <div class="card-body" style={{ textAlign: 'center' }}>
                                            <h5 class="card-title">Booker: {element.booker}</h5>
                                            <Button style={{ width: '50%' }} onClick={() => { this.acceptFunc(element.booker, element._id, index) }} variant="primary">Accept</Button>
                                            <Button style={{ width: '50%' }} onClick={() => { this.rejectFunc(element.booker, element._id, index) }}
                                                variant="danger">Reject</Button>
                                        </div>

                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
export default withAuth0(SellerDashboard)
