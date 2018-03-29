import React, {Component} from 'react'
import './Template.css'
import Select from 'react-select';
import classNames from 'classnames';
import * as templateService from '../../modules/template/template';
import {connect} from 'react-redux';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
class Template extends Component {
    constructor(props) {
        super(props);
        this.valChange = this.valChange.bind(this);
        this.addTemplate = this.addTemplate.bind(this);
        this.getTemplates = this.getTemplates.bind(this);
        this.state = {
            templates: [],
            new_template: {}
        }

        this.getTemplates();
    }


    getTemplates() {
           templateService.getTemplates(this.props.user.team_id).then((res)=>{
               this.setState({
                   templates:res.data
               })
           }).catch((err)=>{

           })
    }

    deleteTemplate(e,i) {
        console.log("i "+i+" template "+JSON.stringify(this.state.templates[i]));
       templateService.deleteTemplate(this.state.templates[i]).then((res)=>{
               this.getTemplates() ;
           }).catch((err)=>{

           })
    }


    valChange(e, i, field) {
        this.state.templates[i][field] = e.target.value;
        this.setState({
            templates: this.state.templates
        })
        this.updateTemplateData(i);

    }

    updateTemplate(e, field) {
        this.setState({
            new_template: Object.assign(this.state.new_template,{[field]:e.target.value})
        })
        console.log("new template "+JSON.stringify(this.state.new_template));



    }

    updateTemplateData(i) {
        this.state.templates[i].updated_by=this.props.user.id;
        templateService.updateTemplate(this.state.templates[i]).then((res)=>{

        }).catch((err)=>{

        })


    }

    addTemplate() {
         this.state.new_template.created_by=this.props.user.id;
         this.state.new_template.team_id=this.props.user.team_id;
        templateService.addTemplate(this.state.new_template).then((res)=>{
            this.state.new_template={};
             this.setState({
            new_template:{name:'',template:'',description:''}
        })
            this.getTemplates() ;
        }).catch((err)=>{

        })
    }


    render() {
        const {  templates,new_template } = this.state;
        return (
            <div>

                <table className="table table-striped table-sm font-size-sm lead-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Template</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
    {
        templates.map((template, i)=> {
            return (
                <tr key={i}>
                    <td className='pl-0 pr-1'>
                        <input className="w-100" type="text" value={template.name} onChange={(e)=> {
                            this.valChange(e, i, 'name')
                        }}></input>
                    </td>
                    <td className='pl-0 pr-1'>
                        <textarea className="w-100" type="text" value={template.template} onChange={(e)=>this.valChange(e, i, 'template')}></textarea>
                    </td>
                    <td className='pl-0 pr-1'>
                        <textarea className="w-100" type="text" value={template.description} onChange={(e)=>this.valChange(e, i, 'description')}></textarea>
                    </td>
                    <td>
                        <a href="javascript:;" onClick={(e)=>this.deleteTemplate(e,i)}>
                            <i className="fa fa-trash-o"></i>
                        </a>
                    </td>
                </tr>
            )
        })
        }

                        <tr>
                            <td className='pl-0 pr-1'>
                                <input className="w-100" type="text" value={this.state.new_template.name} onChange={(e)=> {
                                    this.updateTemplate(e, 'name')
                                }}></input>
                            </td>
                            <td className='pl-0 pr-1'>
                                <textarea className="w-100" type="text" value={new_template.template} onChange={(e)=>this.updateTemplate(e, 'template')}></textarea>
                            </td>
                            <td className='pl-0 pr-1'>
                                <textarea className="w-100" type="password" value={new_template.description} onChange={(e)=>this.updateTemplate(e, 'description')} ></textarea>
                            </td>
                            <td>
                                <a href="javascript:;" className={classNames({'disabled': !new_template.name || !new_template.template})} onClick={this.addTemplate}>
                                    <i className="fa fa-plus-circle"></i>
                                </a>
                            </td>
                        </tr>


                    </tbody>
                </table>

            </div>
        )
    }
}


export default connect((state, ownProps)=> {
    return {
        user: state.leadApp.user
    }
})(Template)