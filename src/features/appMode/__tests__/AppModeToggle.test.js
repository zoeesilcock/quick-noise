import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react'

import AppModeToggle from '../AppModeToggle';
import { AppModes } from '../appModeSlice';

const props = {
  appMode: AppModes.REMOTE,
  toggleMode: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppModeToggle {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls the toggleMode prop when clicked', () => {
  const toggleMode = jest.fn();
  const { container  } = render(
    <AppModeToggle toggleMode={toggleMode} appMode={props.appMode} />
  );

  const toggle = container.firstChild;
  fireEvent.click(toggle);
  expect(toggleMode).toHaveBeenCalledTimes(1);
});
