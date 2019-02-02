import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Login from './Login';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
configure({ adapter: new Adapter() });
sinon.assert.expose(chai.assert, { prefix: '' });

function handleLogin(callback) {
  callback('Login Successful!');
}

describe('/Login', () => {
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

  xit('renders the login title', () => {
    // TODO: FIX THIS TEST SO THAT IT CHECKS FOR PROPER RENDERING UI
    const wrapper = mount(
      <Provider context={store}>
        <Login context={store} />
      </Provider>
    );
    // chai.assert(wrapper.hasClass('auth-method'));
    chai.assert.equal(wrapper.find('.auth-method').text(), Login);
    // expect(wrapper.contains(<h2 className="auth-method">Login</h2>)).to.equal(
    //   true
    // );
  });

  it('renders a form', () => {
    const wrapper = shallow(
      <form>
        <input type="email" />
        <input type="password" />
        <button>Login</button>
      </form>
    );

    expect(wrapper.contains(<input type="email" />)).to.equal(true);
    expect(wrapper.contains(<input type="text" />)).to.equal(false);
  });

  it('it fires form submit', () => {
    const callback = sinon.spy();
    const wrapper = mount(
      <form onSubmit={handleLogin(callback)}>
        <input type="email" />
        <input type="password" />
        <button type="submit">Login</button>
      </form>
    );
    wrapper.find('[type="submit"]').simulate('click');
    expect(callback).to.have.been.calledWith('Login Successful!');
  });
});
