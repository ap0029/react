import React, {Component} from 'react'
import './TechnologyStack.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class TechnologyStack extends Component{

    constructor(props){
            super(props);
            this.updateChannel  = this.updateChannel.bind(this);
             this.updateTechnologyStacks  = this.updateTechnologyStacks.bind(this);
            this.updateAssociates  = this.updateAssociates.bind(this);
        this.valChange  = this.valChange.bind(this);
            this.state={lead:{channel:{label:'Upwork',value:'1'}},
			technologyStacks: [
				{label:'Java',value:'1',id:11},
                {label:'Hibernate',value:'2'},
                {label:'Nodejs',value:'3'},
                {label:'Angularjs',value:'4'}
			],
                associates: [{label:'Abhay Patidar',value:'1'},{label:'Shashank Hardia',value:'2'},{label:'Sourabh Agrawal',value:'3'},{label:'Vishal Shivhare',value:'4'}],
                channels:[{label:'Upwork',value:'1'},{label:'Guru',value:'2'}]

}
        }



        updateChannel (value) {
            console.log("value "+JSON.stringify(value));
            this.state.lead.channel=value;
			this.setState({ lead:this.state.lead });

}

       updateTechnologyStacks (value) {
           this.state.lead.technologyStack=value;
			this.setState({ lead:this.state.lead });

}

         updateAssociates (value,i) {
		      this.state.lead.associates=value;
			this.setState({ lead:this.state.lead });

}

     valChange(e,field){
             this.state.lead[field]=e.target.value;
            this.setState({
                lead:this.state.lead
            },()=>console.log("leads "+JSON.stringify(this.state.lead)))

        }

render(){
    const{lead,channels,technologyStacks,associates}=this.state;
    return(
        <div className="font-size-md">
            <div className="row mb-3">
                <div className="col-sm-12 ">
                    <div className="card">

                    <div className="card-body">
<h4 class="card-title">Technologies</h4>
                    <span className="badge badge-dark">Java</span>
                        </div>
                        </div>
                </div>
                </div>

            <form className="card font-size-md" >
            <div className="card-body">
                <h4 class="card-title">Add new</h4>
      <div className="form-group row">
    <label for="name" className="col-sm-2 col-form-label">Name*</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="name" placeholder="Name" value={lead.title} onChange={(e)=>{this.valChange(e,'title')}}></input>
    </div>
  </div>
  <div className="form-group row">
    <label for="description" className="col-sm-2 col-form-label">Description</label>
    <div className="col-sm-10">
      <textarea type="text" className="form-control" id="description" placeholder="Description" value={lead.description} onChange={(e)=>{this.valChange(e,'description')}}></textarea>
    </div>
  </div>


                <div className="form-group row">
    <div className="col-sm-12 text-center">
     <button className="btn btn-md btn-primary " type="submit" disabled={!lead.title    || !lead.channel    || !lead.url}>Add</button>
    </div>
  </div>



            </div>
      </form></div>
    )
}
}

export default TechnologyStack