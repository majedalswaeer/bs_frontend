import './App.css';
import React, { Fragment } from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './components/login'
import Redirect from './components/redirect'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sellers: [],
      buyers: []



    }
  }
  async componentDidMount() {
    let sellers = await axios.get('https://bs-api-agent.herokuapp.com/getseller')
    let buyers = await axios.get('https://bs-api-agent.herokuapp.com/getbuyers')
    
    await sellers.data.map(element => {
      return this.state.sellers.push(element.email)
    })
    await buyers.data.map(element => {
      return this.state.buyers.push(element.email)
    })
  }
  render() {
    return (
      <>
        <Router>
          <Fragment>
            <Routes>
              <Route path="/" element={this.props.auth0.isAuthenticated ? <Redirect sellers={this.state.sellers} buyers={this.state.buyers} /> : <Login />} />
            </Routes>
          </Fragment>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
