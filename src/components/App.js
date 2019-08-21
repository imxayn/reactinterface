import React, {Component} from 'react';
import '../css/App.css'
import ListAppointments from '../components/ListAppointments'
import AddAppointments from '../components/AddAppointments'
import SearchAppointments from './SearchAppointments';
import {without} from 'lodash'


class App extends Component {
  constructor(){
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false
    }

    this.deleteAppointments = this.deleteAppointments.bind(this)
    this.addAppointment = this.addAppointment.bind(this)
    this.toggleDisplay = this.toggleDisplay.bind(this)



  }

  toggleDisplay(){
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  deleteAppointments(apt){
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts,apt)  //lodash method to delete object
    this.setState({
      myAppointments: tempApts
    })
  }

  addAppointment(apts){
    let tempApts = this.state.myAppointments;
    tempApts.unshift(apts)
    this.setState({
      myAppointments: tempApts
    })
  }

   componentDidMount() {
     fetch('./data.json')
    .then(respone => respone.json())
    .then(result => {
      let apts = result.map(item=>{
        item.aptsId = this.state.lastIndex;  //adding new object keys and values in data
        this.setState({
          lastIndex: this.state.lastIndex +1
        })
        return item;
      })
      
      
      this.setState({
        myAppointments: apts
      })
    })
  }
  
  render() {
    
    return (
      <div>
      <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div classNameName="col-md-12 bg-white">
            <div classNameName="container">
              <div>
                <ListAppointments 
                appointments={this.state.myAppointments}
                lastIndex={this.state.lastIndex}
                delApts = {this.deleteAppointments}
                
                />
              
              </div>
              <div>
              <AddAppointments 
              addAppointment={this.addAppointment}
              formDisplay={this.state.formDisplay}
              toggleDisplay = {this.toggleDisplay}
              />
              
              </div>
              <div><SearchAppointments /></div>
            </div>
          </div>
        </div>
      </div>
    </main>
      </div>
    )
  }
}


export default App;
