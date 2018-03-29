import React, {Component} from 'react'
import './Lead.css'
import Select from 'react-select';
import classNames from 'classnames';
import * as LeadService from '../../modules/lead/lead'

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
    class Lead extends Component {

        constructor(props){
            super(props);
            this.valChange  = this.valChange.bind(this);
            this.updateTechnologyStack  = this.updateTechnologyStack.bind(this);
            this.updateAssociates  = this.updateAssociates.bind(this);

            this.state={leads:[{name:'Jerry Homes',title:'Java project',description:'Java with spring and hibernate',url:'http://upwork.com',channel:'Upwork',
        technologyStacks:[{label:'Java',value:'1',id:11},{label:'Hibernate',value:'2'}],associates:[{label:'Abhay Patidar',value:'1'},{label:'Shashank Hardia',value:'2'}],created_at:'12-09-20107',created_by:'Ajay',updated_at:'12-09-20107',
        updated_by:'Ajay',status:'Opportunity'}],
                multi: true,
			multiValue: [],
			technologyStacks: [
				{label:'Java',value:'1',id:11},
                {label:'Hibernate',value:'2'},
                {label:'Nodejs',value:'3'},
                {label:'Angularjs',value:'4'}
			],
                associates: [{label:'Abhay Patidar',value:'1'},{label:'Shashank Hardia',value:'2'},{label:'Sourabh Agrawal',value:'3'},{label:'Vishal Shivhare',value:'4'}],
			value: undefined,
             columns:{Name:true,'Description':true,URL:true,Channel:true,'Technology Stack':true,'Associates':true,'Created At':false,'Created By':false, 'Updated At':true,
             'Updated By':true,Status:true,Action:true}
}
        }




        toggleColumn(e,column){
             this.state.columns[column] = !this.state.columns[column];
            this.setState({
                columns:this.state.columns
            })
            e.stopPropagation();
        }

        getAllLeads(){
            LeadService.getLeads(this.props.user.team_id).then((res)=>{

            }).catch((err)=>{

            })
        }

         updateLead(){
            LeadService.updateLead().then((res)=>{

            }).catch((err)=>{

            })
        }




        updateTechnologyStack (value,i) {
		      this.state.leads[i].technologyStacks=value;
			this.setState({ leads: this.state.leads });

}

         updateAssociates (value,i) {
		      this.state.leads[i].associates=value;
			this.setState({ leads: this.state.leads });

}
        valChange(e,i,field){
            this.state.leads[0][field]=e.target.value;
            this.setState({
                leads:this.state.leads
            })

        }

        updateLead(){
            //Call put /lead with lead id to update the lead data on server.
        }



        render(){
            const {  technologyStacks,associates,columns } = this.state;
            return(
    <div>
        <div className="dropdown float-right pb-2 ">
  <button className="btn btn-sm btn-sm font-size-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Show/Hide Column
  </button>
  <div className="dropdown-menu font-size-sm" aria-labelledby="dropdownMenuButton" >
  {
      Object.keys(columns).map((column,i)=>{
          return(
              <div className='dropdown-item' key={i}><input  type="checkbox" checked={this.state.columns[column]} onChange={(e)=>this.toggleColumn(e,column)}></input> <span className="align-text-bottom">{column}</span> </div>
          )
      })
      }
  </div>
</div>

        <table className="table table-striped table-sm table-responsive font-size-sm lead-table ">
    <thead>
    <tr>
    <th className={classNames({'d-none':!columns['Name'] })}>Name</th>
    <th className={classNames({'d-none':!columns['Description'] })}>Description</th>
    <th className={classNames({'d-none':!columns['URL'] })}>URL</th>
    <th className={classNames({'d-none':!columns['Channel'] })}>Channel</th>
    <th className={classNames({'d-none':!columns['Technology Stack'] })}>Technology Stack</th>
    <th className={classNames({'d-none':!columns['Associates'] })}>Associates</th>
    <th className={classNames({'d-none':!columns['Created At'] })}>Created At</th>
    <th className={classNames({'d-none':!columns['Created By'] })}>Created By</th>
    <th className={classNames({'d-none':!columns['Updated At'] })}>Updated At</th>
    <th className={classNames({'d-none':!columns['Updated By'] })}>Updated By</th>
    <th className={classNames({'d-none':!columns['Status'] })}>Status</th>
        <th className={classNames({'d-none':!columns['Action'] })}>Action</th>
    </tr>
    </thead>
    <tbody>
    {
        this.state.leads.map((lead,i)=>{
             return(
                 <tr key={i}>
    <td className={classNames({'pl-0 pr-0':true,'d-none':!columns['Name'] })}>
    <input className="w-100" type="text" value={lead.name} onChange={(e)=>{this.valChange(e,i,'name')}}></input>
    </td>
    <td className={classNames({'pl-0 pr-0':true,'d-none':!columns['Description'] })}><input className="w-100" type="text" value={lead.description} onChange={(e)=>this.valChange(e,i,'description')}></input></td>
    <td className={classNames({'pl-0 pr-0':true,'d-none':!columns['URL'] })}><input className="w-100" type="text" value={lead.url} onChange={(e)=>this.valChange(e,i,'url')}></input></td>
    <td className={classNames({'pl-0 pr-0':true,'d-none':!columns['Channel'] })}><input className="w-100" type="text" value={lead.channel} onChange={(e)=>this.valChange(e,i,'channel')}></input></td>
    <td className={classNames({'pl-0 pr-0':true,'d-none':!columns['Technology Stack'] })}><Select.Creatable
					multi={true}
					options={technologyStacks}
					onChange={(value)=>this.updateTechnologyStack(value,i)}
					value={lead.technologyStacks}
/></td>
    <td className={classNames({'pl-0 pr-0':true,'d-none':!columns['Associates'] })}><Select.Creatable
					multi={true}
					options={associates}
					onChange={(value)=>this.updateAssociates(value,i)}
					value={lead.associates}
/></td>
    <td className={classNames({'pl-1 pr-0':true,'d-none':!columns['Created At'] })}>{lead.created_at}</td>
    <td className={classNames({'pl-1 pr-0':true,'d-none':!columns['Created By'] })}>{lead.created_by}</td>
    <td className={classNames({'pl-1 pr-0':true,'d-none':!columns['Updated At'] })}>{lead.updated_at}</td>
    <td className={classNames({'pl-0 pr-0':true,'d-none':!columns['Updated By'] })}>{lead.updated_by}</td>
    <td className={classNames({'pl-0 pr-0':true,'d-none':!columns['Status'] })}><select value={lead.status} onChange={(e)=>this.valChange(e,i,'status')}>
      <option>Opportunity</option>
      <option>Bid</option>
      <option>Interview</option>
      <option>Done</option>
      <option>Job Closed</option>
    </select></td>
                     <td><a href="javascript:;"><i className="fa fa-file-o"></i></a></td>
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
