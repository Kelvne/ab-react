/* tslint:disable:no-var-requires */

import { render, shallow } from 'enzyme';
import * as React from 'react';

const Cookies = require('universal-cookie');

import { ABTesting } from '../ABTesting';

describe('ABTesting Component', () => {
  it('should render', () => {
    const component = shallow(<ABTesting cookieName='ab-testing' />);

    expect(component).toMatchSnapshot();
  });

  it('show render a child if one child', () => {
    const component = shallow(
      <ABTesting cookieName='ab-testing'>
        <div>Hello</div>
      </ABTesting>,
    );

    expect(component).toMatchSnapshot();
  });

  it('show set a cookie using the cookie name', () => {
    const cookies = new Cookies();
    cookies.set = jest.fn();

    const cookieName = 'ab-testing-cookie';

    shallow(
      <ABTesting cookies={cookies} cookieName={cookieName}>
        <div>Hi!</div>
      </ABTesting>,
    );

    expect(cookies.set).toBeCalledWith(cookieName, '0', { maxAge: 86400 * 7 });
  });

  it('show always render same version if cookie is set', () => {
    const cookies = new Cookies();
    cookies.get = jest.fn(() => '1');

    const cookieName = 'ab-testing-ok';

    const component = shallow(
      <ABTesting cookies={cookies} cookieName={cookieName}>
        <div>This should not be rendered.</div>
        <div>This should be rendered.</div>
      </ABTesting>,
    );

    expect(component).toMatchSnapshot();
  });
});
