import React from 'react';
import { shallow, mount, render,configure } from 'enzyme';
import Lead from './Lead'
import Adapter from 'enzyme-adapter-react-15';
import ReactTestUtils from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

describe('A suite', function() {
  it('should render without throwing an error', ()=> {
    expect(shallow(<Lead />).contains(<button className="btn btn-sm btn-sm font-size-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Show/Hide Column
  </button>)).toBe(true);
  });

    it('should hide the URL column',()=>{
         const wrapper = shallow(<Lead />);
        ReactTestUtils.Simulate.click(wrapper.find('#dropdownMenuButton'));
    })

});