import React, {Component} from 'react';
import '../css/App.css'
import ListAppointments from '../components/ListAppointments'
import AddAppointments from '../components/AddAppointments'
import SearchAppointments from './SearchAppointments';
import {without, findIndex} from 'lodash'


class App extends Component {
  constructor(){
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      orderDir: 'desc',
      orderBy:'ownerName',
      formDisplay: false,
      queryTxt:''
    }

    this.deleteAppointments = this.deleteAppointments.bind(this)
    this.addAppointment = this.addAppointment.bind(this)
    this.toggleDisplay = this.toggleDisplay.bind(this)
    this.changeOrder = this.changeOrder.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateInfo = this.updateInfo.bind(this)


  }

  toggleDisplay(){
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  updateInfo(name,value,id){
    console.log("--")
    let tempApts = this.state.myAppointments
    let aptIndex = findIndex(this.state.myAppointments,{aptsId: id});
    tempApts[aptIndex][name] = value
    console.log(name,"tempApts[aptIndex][name]")
    this.setState({
      myAppointments: tempApts
    })

  }

  handleChange(e){
    console.log(e.target.value)
    this.setState({
      queryTxt: e.target.value
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

  changeOrder(order,dir){
    this.setState({
      orderBy: order,
      orderDir: dir
    })
  }
  
  render() {
    let order;
    let filteredApts = this.state.myAppointments;
    if(this.state.orderDir === 'asc'){
      order = 1
    }
    else{
      order = -1
    }

    filteredApts = filteredApts.sort((a,b) => {
        if(a[this.state.orderBy].toLowerCase() < 
          b[this.state.orderBy].toLowerCase()
        ){
        
          return -1 * order
        }
        else{
          return 1 * order
        }
    }).filter(item => {
      return(
        item['petName']
          .toLowerCase()
          .includes(this.state.queryTxt.toLowerCase()) ||
        item['ownerName']
          .toLowerCase()
          .includes(this.state.queryTxt.toLowerCase()) ||
        item['aptNotes']
          .toLowerCase()
          .includes(this.state.queryTxt.toLowerCase())
      )
    })
    return (
      <div>
      <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div classNameName="col-md-12 bg-white">
            <div classNameName="container">
            <div>
            <SearchAppointments
              orderBy={this.state.orderBy}
              orderDir={this.state.orderDir}
              changeOrder={this.changeOrder}
              handleChange={this.handleChange}

            />
            </div>
            <div>
              <AddAppointments 
              addAppointment={this.addAppointment}
              formDisplay={this.state.formDisplay}
              toggleDisplay = {this.toggleDisplay}
              />
              
              </div>
              <div>
                <ListAppointments 
                appointments={filteredApts}
                lastIndex={this.state.lastIndex}
                delApts = {this.deleteAppointments}
                updateInfo={this.updateInfo}
                
                />
              
              </div>
              
             
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
