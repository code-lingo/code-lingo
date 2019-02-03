import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Navbar } from './Navbar';
import { Provider } from 'react-redux';
import store from '../store';
import {
  BrowserRouter as Router,
  MemoryRouter,
  NavLink,
} from 'react-router-dom';
// Testing packages
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon, { spy, mock } from 'sinon';
import chai, { expect, assert } from 'chai';
import sinonChai from 'sinon-chai';
// Test set-up
chai.use(sinonChai);
configure({ adapter: new Adapter() });
sinon.assert.expose(chai.assert, { prefix: '' });

describe('/Navbar', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );

  it('renders Navbar correctly', () => {
    expect(
      wrapper.contains(
        <NavLink className="navbar-item active" to={'/'}>
          Home
        </NavLink>
      )
    ).to.equal(true);
    expect(
      wrapper.contains(
        <NavLink className="navbar-item" to={'/login'}>
          Login
        </NavLink>
      )
    ).to.equal(true);
    expect(
      wrapper.contains(
        <NavLink className="navbar-item" to={'/signup'}>
          SignUp
        </NavLink>
      )
    ).to.equal(true);
  });

  xit('fires singout button', () => {
    const navbarComponent = shallow(<Navbar />);
    const instance = navbarComponent.instance();
    const handleSignOutSpy = sinon.spy(instance, 'handleSignOut');
    instance.forceUpdate();
    navbarComponent.find('form').simulate('submit');
    sinon.assert.calledOnce(handleSignOutSpy);
  });
});
