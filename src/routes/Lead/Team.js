import React, {Component} from 'react'
import './Lead.css'
import Select from 'react-select';
import classNames from 'classnames';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
    class Lead extends Component {

        constructor(props){
            super(props);
            this.valChange  = this.valChange.bind(this);
            this.updateTechnologyStack  = this.updateTechnologyStack.bind(this);
            this.state={users:[{name:'Abhay Patidar',email:'ap0011@zehntech.com',password:'indore',role:'developer',technologyStacks:[{value:'Nodejs',label:'Nodejs'}]},
                {name:'Meghana Singhal',email:'ms0028@zehntech.com',password:'indore',role:'developer',technologyStacks:[{value:'PHP',label:'PHP'}]}],
                multi: true,
			technologyStacks: [
				{label:'Java',value:'1',id:11},
                {label:'Hibernate',value:'2'},
                {label:'Nodejs',value:'3'},
                {label:'Angularjs',value:'4'}
			]
}
        }




        toggleColumn(e,column){
             this.state.columns[column] = !this.state.columns[column];
            this.setState({
                columns:this.state.columns
            })
            e.stopPropagation();
        }





         updateTechnologyStack (value,i) {
		      this.state.users[i].technologyStack=value;
			this.setState({ users: this.state.users });

}
        valChange(e,i,field){
            this.state.users[0][field]=e.target.value;
            this.setState({
                users:this.state.users
            })

        }

        updateLead(){
            //Call put /lead with lead id to update the lead data on server.
        }



        render(){
            const {  technologyStacks,users } = this.state;
            return(
    <div>

        <table className="table table-striped table-sm font-size-sm lead-table">
    <thead>
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Role</th>
    <th>Technology Stack</th>
    </tr>
    </thead>
    <tbody>
    {
        this.state.users.map((user,i)=>{
             return(
                 <tr key={i}>
    <td className='pl-0 pr-0'>
    <input className="w-100" type="text" value={user.name} onChange={(e)=>{this.valChange(e,i,'name')}}></input>
    </td>
    <td className='pl-0 pr-0'><input className="w-100" type="text" value={user.email} onChange={(e)=>this.valChange(e,i,'email')}></input></td>
    <td className='pl-0 pr-0'><input className="w-100" type="text" value={user.password} onChange={(e)=>this.valChange(e,i,'password')}></input></td>
    <td className='pl-0 pr-0'><input className="w-100" type="text" value={user.role} onChange={(e)=>this.valChange(e,i,'role')}></input></td>
    <td className='pl-0 pr-0'><Select.Creatable
					multi={true}
					options={technologyStacks}
					onChange={(value)=>this.updateTechnologyStack(value,i)}
					value={user.technologyStacks}
/></td>
    </tr>
             )
        })
        }


    </tbody>
    </table>
    </div>
    )}
    }






export default Lead