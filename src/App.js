import React from 'react';

import AppNavbar from './components/AppNavBar'
import ItemList from './components/ItemList';
import ItemModel from './components/ItemModel';
import AboutUs from './components/pages/AboutUs';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Container} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
      <Router><Provider store={store}>
    <div className="App">
      <h1>Welcome to HotSauce!</h1>
      <AppNavbar style={headerStyle}/>
      <Route exact path="/" render={props=>(
         <Container>
         <ItemModel/>
         <ItemList/>
      </Container>
      )}>
      </Route>
      
      <Route path="/about" component={AboutUs} />
      <footer style={{display:'block',float:'right',marginRight:'2rem'}}>
      <p>&copy; Khaled is Learning 2020</p>
      </footer>
      
    </div>
    </Provider></Router>
       
    );
}

const headerStyle={
  color: 'white',
  background: '#333',
  textAlign: 'center',
  padding:'10px'
}

export default App;