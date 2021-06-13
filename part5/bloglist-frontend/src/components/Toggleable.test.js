import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Togglable from './Toggleable';

describe('<Toggleable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>,
    );
  });

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv'),
    ).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.toggleableContent');

    // Verify child component visibility by checking its style
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.toggleableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    // Not recommended to select elements with by depending on order.
    // const closeButton = component.container.querySelector('button:nth-child(2)');
    // Better to find element based on their text:
    const closeButton = component.getByText('Cancel');
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.toggleableContent');
    expect(div).toHaveStyle('display: none');
  });
});
