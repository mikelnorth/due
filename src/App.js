import React, { Component } from 'react';
import router from './router.js'
import './App.css';
import { connect } from 'react-redux';
import { getUser, getClassInfo } from './ducks/reducer.js';

class App extends Component {
  constructor(props){
    super(props)


  }

  componentDidMount(){
    this.props.getUser().then(res => {
      console.log('faslkdfjaosifjhaosdifjasdo',res)
      this.props.getClassInfo(res.value.user_id);
    })
    
    
  }
 

  render() {
    return (
      <div className="App">
        {router}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    calId: state.calId,
    classInfo: state.classInfo
  }
}
export default connect(mapStateToProps, { getUser, getClassInfo })(App);
