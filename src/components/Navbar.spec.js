import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
configure({ adapter: new Adapter() });
sinon.assert.expose(chai.assert, { prefix: '' });

function handleSignOut(callback) {
  callback('SUCCESSFULLY LOGGED OUT USER!');
}

describe('/Navbar', () => {
  it('contains a list of navigation tabs', () => {
    // TODO: finish navbar tests
  });
});
