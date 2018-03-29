import React, {Component} from 'react'
import { Switch, Route } from 'react-router'
import Lead from '../Lead/Lead';
import Template from '../Template/Template';
import Team from '../Team/Team';
import NewLead from '../NewLead/NewLead';
import Dashboard from '../Dashboard/Dashboard';
import Header from '../../componets/Header';
import TechnologyStack from '../TechnologyStack/TechnologyStack';
    const Home = ({match})=>(

        <div><Header/>
             <div>

      <div className="starter-template">
             <Switch>
             <Route  path="/new_lead" component={NewLead}/>
                  <Route  path="/template" component={Template}/>
                 <Route  path="/team" component={Team}/>
                  <Route  path="/technology_stacks" component={TechnologyStack}/>
            <Route  path="/" component={Lead}/>
            </Switch>
      </div>

    </div>

        </div>
    )


export default Home