import React, {Component} from 'react'
import './Team.css'
import Select from 'react-select';
import classNames from 'classnames';
import {addUser,getUsers,deleteUser,editUser} from '../../modules/user/user';
import {connect} from 'react-redux';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
    class Team extends Component {
        constructor(props){
            super(props);
            this.valChange  = this.valChange.bind(this);
            this.updateTechnologyStack  = this.updateTechnologyStack.bind(this);
             this.addUser  = this.addUser.bind(this);
             this.getTeamMembers  = this.getTeamMembers.bind(this);
            this.state={users:[],
                multi: true,
			technologyStacks: [
				{label:'Java',value:'1',id:11},
                {label:'Hibernate',value:'2'},
                {label:'Nodejs',value:'3'},
                {label:'Angularjs',value:'4'}
			],
                new_user:{}
}

            this.getTeamMembers();
        }


        getTeamMembers(){
            getUsers(this.props.user.team_id).then((res)=>{
                console.log("res "+JSON.stringify(res));
                this.setState({
                    users:res.data.users
                })
            }).catch((err)=>{

            })
        }

        deleteUser(id){
            deleteUser(id).then((res)=>{
               this.getTeamMembers();
            }).catch((err)=>{

            });


        }


        toggleColumn(e,column){
             this.state.columns[column] = !this.state.columns[column];
            this.setState({
                columns:this.state.columns
            })
            e.stopPropagation();
        }


         updateTechnologyStack (value,i) {
		      this.state.users[i].technologyStacks=value;
			this.setState({ users: this.state.users });
             this.updateUserData(i);
}

          updateUserTechnologyStack (value) {
		      this.state.new_user.technology_stacks=value;
			this.setState({ new_user: this.state.new_user });


}
        valChange(e,i,field){
            this.state.users[i][field]=e.target.value;
            this.setState({
                users:this.state.users
            })
             this.updateUserData(i);

        }

         updateUser(e,field){
            this.state.new_user[field]=e.target.value;
            this.setState({
                new_user:this.state.new_user
            })



        }

         updateUserData(i){
             console.log("update "+JSON.stringify(this.state.users[i]));
            editUser(this.state.users[i]);

        }

        addUser(){
            if(!this.state.new_user.name || !this.state.new_user.email || !this.state.new_user.password){
                return;
            }
            addUser(this.state.new_user.name,this.state.new_user.email,this.state.new_user.password,
            this.state.new_user.role,this.state.new_user.technology_stacks,this.props.user.team_id).then((res)=>{
                this.getTeamMembers();
            }).catch((err)=>{

            })


        }
        updateLead(){
            //Call put /lead with lead id to update the lead data on server.
        }



        render(){
            const {  technologyStacks,users,new_user } = this.state;
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
        <th>Action</th>
    </tr>
    </thead>
    <tbody>
    {
        users.map((user,i)=>{
             return(
                 <tr key={i}>
    <td className='pl-0 pr-1'>
    <input className="w-100" type="text" value={user.name} onChange={(e)=>{this.valChange(e,i,'name')}}></input>
    </td>
    <td className='pl-0 pr-1'><input className="w-100" type="text" value={user.email} onChange={(e)=>this.valChange(e,i,'email')}></input></td>
    <td className='pl-0 pr-1'><input className="w-100" type="password" value={user.password} readOnly></input></td>
    <td className='pl-0 pr-1'> <select  value={user.role} onChange={(e)=>{this.valChange(e,i,'role')}}>
      <option value="bdm">BDM</option>
        <option value="developer">Developer</option>
      </select></td>
    <td className='pl-0 pr-1'><Select.Creatable
					multi={true}
					options={technologyStacks}
					onChange={(value)=>this.updateTechnologyStack(value,i)}
					value={user.technology_stacks}
/></td>
                     <td><a href="javascript:;"><i className="fa fa-trash-o"></i></a></td>
    </tr>
             )
        })
        }

         <tr >

    <td className='pl-0 pr-1'>
    <input className="w-100" type="text" value={new_user.name} onChange={(e)=>{this.updateUser(e,'name')}}></input>
    </td>
    <td className='pl-0 pr-1'><input className="w-100" type="email" value={new_user.email} onChange={(e)=>this.updateUser(e,'email')}></input></td>
    <td className='pl-0 pr-1'><input className="w-100" type="password" value={new_user.password} onChange={(e)=>this.updateUser(e,'password')} ></input></td>
    <td className='pl-0 pr-1'> <select  value={new_user.role} onChange={(e)=>{this.updateUser(e,'role')}}>
      <option value="bdm">BDM</option>
        <option value="developer">Developer</option>
      </select></td>
    <td className='pl-0 pr-1'><Select.Creatable
					multi={true}
					options={technologyStacks}
					onChange={(value)=>this.updateUserTechnologyStack(value)}
					value={new_user.technology_stacks}
/></td>
                     <td><a href="javascript:;" className={classNames({'disabled':!new_user.name})} onClick={this.addUser}><i className="fa fa-plus-circle"></i></a></td>

    </tr>


    </tbody>
    </table>
    </div>
    )}
    }






export default connect((state,ownProps)=>{
 return{
     user:state.leadApp.user
 }
})(Team)