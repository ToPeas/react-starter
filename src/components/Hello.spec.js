/**
 * Created by topeas on 2017/6/2.
 */

/* eslint-disable */

import React from 'react'
import Hello from './Hello'
// import { expect } from 'chai';
// var expect = require('chai').expect;
import { shallow } from 'enzyme'
// import { expect } from 'chai'

describe('this component rightly className cc', () => {
  it('this component  should render rightly', () => {
    const wrapper = shallow(<Hello cc="裴大哥"/>)
    expect(wrapper.find('.cc').length).toBe(1)
  }),
    // it('this component should render 2 <p>', () => {
    //   const wrapper = shallow(<Hello cc="裴大哥"/>)
    //   // expect(wrapper.text()).to.equal('topeas')
    //   // expect(wrapper.find('.cc').hasClass('cc')).toEqual(true)
    //   expect(wrapper.contains([<p>s</p>])).toEqual(true)
    // }),
  it('this', () => {
    const wrapper = shallow(<Hello cc="裴大哥"/>)
    wrapper.find('.topeas').simulate('click')
    expect('handleClick').toBeChecked()

  })
})