import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react'

import AddRemoteButton from '../AddRemoteButton';

const props = {
  isFetching: false,
  addRemote: () => {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddRemoteButton {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calls the setConnectShow prop when clicked', () => {
  const addRemote = jest.fn();
  const { getByText } = render(
    <AddRemoteButton {...Object.assign({}, props, { addRemote })} />
  );

  const button = getByText('Add remote');
  fireEvent.click(button);

  expect(addRemote).toHaveBeenCalledTimes(1);
});
