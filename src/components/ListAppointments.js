import React, { Component } from 'react'
import '../css/App.css'
import Moment from 'react-moment'


 class ListAppointments extends Component {
    render() {
        const data = localStorage.getItem('tempApt');
        const newData = JSON.parse(data)

        return (
            <div className="appointment-list item-list mb-3">
            

                <br />
                {this.props.appointments.map(item=>(
                
                <div className="pet-item col media py-3" key={item.aptsId}>
                    <div className="mr-3">
                        <button className="pet-delete btn btn-sm btn-danger" onClick={()=>this.props.delApts(item)}>X</button>
                    </div>
    
                <div className="pet-info media-body">
                    <div className="pet-head d-flex">
                    <span className="pet-name" contentEditable suppressContentEditableWarning 
                        onBlur={
                            e=> this.props.updateInfo('petName', e.target.innerText,item.aptsId)
                        }
                    >
                    {item.petName}</span>
                    &nbsp;
                    <span className="apt-date ml-auto">
                    <Moment 
                        date={item.aptDate}
                        parse="YYYY-MM-dd hh:mm"
                        format="d-MMM-YYYY h:mma"
                    />
                    </span>
                    </div>
  
                    <div className="owner-name">
                        <span className="label-item">Owner: </span>
                        <span className="pet-name" contentEditable suppressContentEditableWarning 
                        onBlur={
                            e=> this.props.updateInfo('ownerName', e.target.innerText,item.aptsId)
                        }
                    > {item.ownerName}</span>
                    </div>
                    <div className="apt-notes">{item.aptNotes}</div>
                    </div>
                   
                </div>
                
                
            ))}
            
        </div>
        )
    }
}

export default ListAppointments
