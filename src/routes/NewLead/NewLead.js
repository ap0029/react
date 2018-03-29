import React, {Component} from 'react'
import {connect} from 'react-redux';
import './NewLead.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as LeadService from '../../modules/lead/lead'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as TemplateService from '../../modules/template/template';
class NewLead extends Component{

    constructor(props){
            super(props);
            this.updateChannel  = this.updateChannel.bind(this);
            this.updateTechnologyStacks  = this.updateTechnologyStacks.bind(this);
            this.updateAssociates  = this.updateAssociates.bind(this);
            this.suggestTechnologyStacks  = this.suggestTechnologyStacks.bind(this);
            this.valChange  = this.valChange.bind(this);
            this.addLead = this.addLead.bind(this);
            this.toggle = this.toggle.bind(this);
            this.updateCoverLetter = this.updateCoverLetter.bind(this);
            this.getChannels =this.getChannels.bind(this);
            this.getTechnologyStacks=this.getTechnologyStacks.bind(this);
            this.getAssociates=this.getAssociates.bind(this);
            this.getStatuses=this.getStatuses.bind(this);
            this.getTemplates=this.getTemplates.bind(this);
            this.getBillingTypes=this.getBillingTypes.bind(this);
            this.state={lead:{},
                statuses:[],
                billing_types:[],
                templates:[{id:1,name:'node-template'},{id:2,name:'java-template'}],
                showModal:false,
                cover_letter:undefined,
                // title:undefined,
                // description:undefined,
                // posted_by:undefined,
                // url:undefined,
                // budget:undefined

}

        }

    componentWillMount(){
         console.log('componentWillMount ');
         this.getChannels();
         this.getAssociates();
         this.getTechnologyStacks();
         this.getStatuses();
         this.getTemplates();
         this.getBillingTypes();
    }

    addLead(event){
        this.state.lead.team_id = this.props.user.team_id;
        this.state.lead.login_id = this.props.user.id;
         console.log('add lead '+JSON.stringify(this.state.lead));
        LeadService.addLead(this.state.lead).then(res=>{
        //  console.log(res.data);
        this.setState({
             lead:{title:"",posted_by:"",description:"",url:"",budget:""}
        })

         this.getCoverLetter(res.data.template);
       }).catch(err=>{

       })
       //console.log("show modal");
       this.toggle();
       event.preventDefault();
    }

    getChannels(){
         LeadService.getChannels().then((res)=>{
                this.setState({
                    channels:res.data,
                    lead:Object.assign(this.state.lead,{channel:res.data[0]})
                })
         }).catch((err)=>{

         })
    }

    getTechnologyStacks(){
         LeadService.getTechnologyStacks().then((res)=>{
                this.setState({
                    technology_stacks:res.data
                })
         }).catch((err)=>{

         })
    }

    getAssociates(){
         LeadService.getAssociates().then((res)=>{
                this.setState({
                    associates:res.data
                })
         }).catch((err)=>{

         })
    }

    getStatuses(){
         LeadService.getStatuses().then((res)=>{
                this.setState({
                    statuses:res.data,
                    lead:Object.assign(this.state.lead,{status:res.data[0].id})
                })
         }).catch((err)=>{

         })
    }

    getTemplates(){
         TemplateService.getTemplates(this.props.user.team_id).then((res)=>{
                this.setState({
                    templates:res.data,
                    lead:Object.assign(this.state.lead,{template:res.data[0].id})
                })
         }).catch((err)=>{

         })
    }

    getCoverLetter(template){
        this.setState({
           cover_letter:template
        });
    }
    getBillingTypes(){
         LeadService.getBillingTypes().then((res)=>{
                this.setState({
                    billing_types:res.data,
                    lead:Object.assign(this.state.lead,{billing_type:res.data[0].id})
                })
         }).catch((err)=>{

         })
    }


    toggle(){
        this.setState({
            showModal: !this.state.showModal
        })
    }



        updateChannel (value) {
            // console.log("value "+JSON.stringify(value));
            this.state.lead.channel=value;
			this.setState({ lead:this.state.lead });

}

    suggestTechnologyStacks(){
        // console.log("description "+this.state.lead.description);
        LeadService.suggestTechnologyStacks(this.state.lead).then((res)=>{
              this.updateTechnologyStacks(res.data);
               this.setState({
                   technology_stacks:res.data
               })
this.suggestAssociates();
        }).catch((err)=>{

        })


    }

    suggestAssociates(){
      // this.state.technology_stacks = {technology_stacks:this.state.lead.technology_stacks};
      //console.log({technology_stacks:this.state.lead.technology_stacks});
      LeadService.suggestAssociates({technology_stacks:this.state.lead.technology_stacks}).then((res)=>{
            this.updateAssociates(res.data);
             this.setState({
                 associates:res.data
             })
      }).catch((err)=>{

      })
    }


       updateTechnologyStacks (value) {
           this.state.lead.technology_stacks=value;
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
            },()=>console.log("leads "+JSON.stringify(this.state.lead)));


        }

    updateCoverLetter(e,field){
            this.setState({
                cover_letter:e.target.value
            });


        }

render(){
    const{lead,channels,technology_stacks,associates,templates,statuses,billing_types}=this.state;
    return(
        <div>   <form className="card font-size-md" onSubmit={this.addLead}>
            <div className="card-body">
      <div className="form-group row">
    <label htmlFor="name" className="col-sm-2 col-form-label">Title*</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="name" placeholder="Name" value={lead.title} onBlur={this.suggestTechnologyStacks} onChange={(e)=>{this.valChange(e,'title')}}></input>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
    <div className="col-sm-10">
      <textarea type="text" className="form-control" id="description" placeholder="Description" value={lead.description} onBlur={this.suggestTechnologyStacks} onChange={(e)=>{this.valChange(e,'description')}}></textarea>
    </div>
  </div>
                <div className="form-group row">
    <label htmlFor="posted_by" className="col-sm-2 col-form-label">Posted By</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="posted_by" placeholder="Posted By" value={lead.posted_by} onChange={(e)=>{this.valChange(e,'posted_by')}}></input>
    </div>
  </div>
                <div className="form-group row">
    <label htmlFor="name" className="col-sm-2 col-form-label">Channel*</label>
    <div className="col-sm-10">
      <Select.Creatable
					multi={false}
					options={channels}
					onChange={(value)=>this.updateChannel(value)}
					value={lead.channel}
/>
    </div>
  </div>
                <div className="form-group row">
    <label htmlFor="name" className="col-sm-2 col-form-label">URL*</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="name" placeholder="url" value={lead.url} onChange={(e)=>{this.valChange(e,'url')}}></input>
    </div>
  </div>
                <div className="form-group row">
    <label htmlFor="name" className="col-sm-2 col-form-label">Technology Stack</label>
    <div className="col-sm-10">
       <Select.Creatable
					multi={true}
					options={technology_stacks}
					onChange={(value)=>this.updateTechnologyStacks(value)}
					value={lead.technology_stacks}
/>
    </div>
  </div>
                <div className="form-group row">
    <label htmlFor="name" className="col-sm-2 col-form-label">Associates</label>
    <div className="col-sm-10">
      <Select.Creatable
					multi={true}
					options={associates}
					onChange={(value)=>this.updateAssociates(value)}
					value={lead.associates}
/>
    </div>
  </div>
                <div className="form-group row">
    <label htmlFor="name" className="col-sm-2 col-form-label">Status</label>
    <div className="col-sm-10">
      <select id="inputState" className="form-control" value={lead.status} onChange={(e)=>{this.valChange(e,'status')}}>
       {
          statuses.map((status,i)=>{
              return(<option key={i} value={status.id}>{status.name}</option>);
          })
          }
      </select>
    </div>
  </div>

                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Template</label>
                  <div className="col-sm-10">
                    <select id="inputState" className="form-control" value={lead.template} onChange={(e)=>{this.valChange(e,'template')}}>
                    {
                        templates.map((template,i)=>{
                            return(<option key={i} value={template.id}>{template.name}</option>);
                        })
                        }
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Billing Type</label>
                  <div className="col-sm-10">
                    <select id="inputState" className="form-control" value={lead.billing_type} onChange={(e)=>{this.valChange(e,'billing_type')}}>
                    {
                        billing_types.map((billing_type,i)=>{
                            return(<option key={i} value={billing_type.id}>{billing_type.name}</option>);
                        })
                        }
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="name" className="col-sm-2 col-form-label">Budget*</label>
                  <div className="col-sm-10">
                  <input type="text" className="form-control" id="budget" placeholder="budget" value={lead.budget} onChange={(e)=>{this.valChange(e,'budget')}}></input>
                  </div>
                </div>

                <div className="form-group row">
    <div className="col-sm-12 text-center">
     <input className="btn btn-md btn-primary " type="submit" disabled={!lead.title    || !lead.channel    || !lead.url} value="add"></input>
    </div>
  </div>


            </div>
      </form>
            <Modal isOpen={this.state.showModal} toggle={this.toggle} className={this.props.className} backdrop="false" >
          <ModalHeader toggle={this.toggle}>Cover Letter</ModalHeader>
          <ModalBody>
            <textarea value={this.state.cover_letter} onChange={this.updateCoverLetter} className="w-100" style={{height:'200px'}}></textarea>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-secondary" onClick={this.toggle}>Close</button>
          </ModalFooter>
        </Modal>

        </div>
    )
}
}

export default connect((state, ownProps)=> {
    return {
        user: state.leadApp.user
    }
})(NewLead)
