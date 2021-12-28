import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import swal from 'sweetalert';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap'
// import Footer from './footer'
import Header from './header.js'

class BuyerDashboard extends Component {
    // BuyerDashboard class which define the buyer interface
    constructor() {
        super()
        // BuyerDashboard states which contains all the data coming from the API, acceptedApp state which include the accepted appintments from the seller side
        this.state = {
            sellerInfo: [],
            mydata: [],
            acceptedApp: []
        }
    }
    componentDidMount = async () => {
        // To get the data from the API once the component mounted
        this.getfunc()
    }

    getfunc = async () => {
        let info = await axios.get('http://localhost:3001/getseller')
        //filtering the appointments depending on the (accepted value) which is existed in each appointment
        await info.data.forEach(element => {
            element.appointment.forEach(app => {
                if (app.accepted === true) {
                    this.state.acceptedApp.push(app.booker)
                }

            })

        });
        this.setState({
            sellerInfo: info.data,
            mydata: info.data
        })

    }

    searchUser = async (e) => {
        //This function is being called on every change happens in the search form also it filters the data depending on the seller name
        e.preventDefault()
        let searchData = await this.state.sellerInfo.filter((item) => item.email.toLowerCase() === e.target.value.toLowerCase())
        if (searchData.length > 0) {
            this.setState({
                mydata: searchData
            })
        } else if (searchData.length === 0) {

            this.setState({
                mydata: this.state.sellerInfo
            })

        }
    }
    postFunc = async (email, id, index) => {
        // this function is responsiable for changing the state of each appointment, one you requested an appointment to the seller, the pending will be true
        swal({
            title: "Appointment Requested",
            text: `The appointment request for ${email} has been sent, it will appear in the accepeted appointemt section once ${email} accept it`,
            icon: "success",
            button: "Close",
        })
        const { user } = this.props.auth0
        this.setState({
            mydata: this.state.mydata.filter(item => item._id !== id)
        })

        let myData = {
            booker: user.email,
            pending: true,
            accepted: false,
            booked: false,
        }
        await axios.post(`http://localhost:3001/book-app/${email}`, myData)

    }


    render() {
        //Rendring the data we have depinding on the state and what its containing 
        return (
            <>
                <div>
                    <Header />
                    <h1 style={{ margin: '1rem', textAlign: 'center', fontSize: '2rem', fontFamily: 'sans-serif' }}>Buyer Dashboard</h1>
                    {console.log(this.state.sellerInfo)}
                    <Form >
                        <Form.Group className="mb-3 " style={{ width: '30%', marginInline: '35%' }} controlId="formBasicEmail">
                            <Form.Control onChange={this.searchUser} type="text" name='fav' placeholder="Enter Seller Name/Email.." />
                        </Form.Group>

                    </Form>
                    <h1 style={{ margin: '1rem', fontSize: '1.5rem', fontFamily: 'sans-serif' }}>Avalilabe Sellers</h1>
                    <div style={{ borderStyle: 'outset', borderRadius: '3px', borderBottom: 'none' }}>
                        <div class="card-group" style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '28rem 28rem 28rem ', marginLeft: '7rem ' }}>

                            {this.state.mydata.map((element, index) => {
                                return (
                                    <div class="card" style={{ marginLeft: '2rem ', marginRight: '2rem ' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <img class="card-img-top" src="https://static.vecteezy.com/system/resources/previews/002/608/327/non_2x/mobile-application-avatar-web-button-menu-digital-silhouette-style-icon-free-vector.jpg" alt="wte" style={{ textAlign: 'center', width: '10rem', height: '10rem' }} />
                                        </div>
                                        <div class="card-body" style={{ textAlign: 'center' }}>
                                            <h5 class="card-title">Seller: {element.email}</h5>
                                            <p class="card-text" ><Button style={{ width: '8rem' }} key={element._id} onClick={() => { this.postFunc(element.email, element._id, index) }} variant="primary">Book!</Button></p>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <h1 style={{ margin: '1rem', fontSize: '1.5rem', fontFamily: 'sans-serif', color: 'green', border: '1px' }}>Accepted Appointments</h1>

                <div style={{ marginTop: '1rem', borderStyle: 'outset', borderColor: 'lightgrey', borderRadius: '3px', }}>
                    {this.state.acceptedApp.length > 0 ? <div style={{ display: 'grid', gridTemplateColumns: '28rem 28rem 28rem ', marginLeft: '7rem ' }} >{this.state.acceptedApp.map((element, index) => {
                        return (
                            <div class="card" key={index} style={{ marginLeft: '2rem ', marginRight: '2rem ', marginTop: '1rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <img class="card-img-top" src="https://static.vecteezy.com/system/resources/previews/002/608/327/non_2x/mobile-application-avatar-web-button-menu-digital-silhouette-style-icon-free-vector.jpg" alt="wte" style={{ textAlign: 'center', width: '10rem', height: '10rem' }} />
                                </div>
                                <div class="card-body" style={{ textAlign: 'center' }}>
                                    <h5 class="card-title">Seller: {element}</h5>
                                    <p class="card-text" style={{ color: 'green' }} >Accepted</p>
                                </div>

                            </div>
                        )
                    })}</div> : <p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'lightgrey' }}>No Accepted Appointments for Now</p>}

                </div>
            </>
        )
    }
}

export default withAuth0(BuyerDashboard);