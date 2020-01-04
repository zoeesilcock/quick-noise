import React from 'react';
import { render, fireEvent } from '@testing-library/react'

import AddRemoteButton from '../AddRemoteButton';

const props = {
  isFetching: false,
  addRemote: () => {},
};

it('renders without crashing', () => {
  render(<AddRemoteButton {...props} />);
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
