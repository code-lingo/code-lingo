import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Login } from './Login';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon, { spy, mock } from 'sinon';
import chai, { expect, assert } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
configure({ adapter: new Adapter() });
sinon.assert.expose(chai.assert, { prefix: '' });

describe('/Login', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
      div
    );
  });

  it('renders the Login style & format correctly', () => {
    expect(wrapper.find('h2').text()).to.equal('Login');
    expect(wrapper.find('input')).to.have.lengthOf(2);
    expect(wrapper.find('.auth-input')).to.have.lengthOf(2);
  });

  it('renders a form', () => {
    expect(wrapper.find('input')).to.have.lengthOf(2);
    expect(
      wrapper.contains(<label className="auth-label">Email:</label>)
    ).to.equal(true);
    expect(
      wrapper.contains(<label className="auth-label">Password:</label>)
    ).to.equal(true);
  });

  it('it fires form submit', () => {
    const loginComponent = shallow(<Login />);
    const instance = loginComponent.instance();
    const handleLoginSpy = sinon.spy(instance, 'handleLogin');
    instance.forceUpdate();
    loginComponent.find('form').simulate('submit');
    sinon.assert.calledOnce(handleLoginSpy);
  });
});
