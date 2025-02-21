import React from 'react';
import { render } from '@testing-library/react';
import Searchbar from './searchbar';

test('search bar render', () => {
  const { asFragment } = render(<Searchbar />);
  expect(asFragment()).toMatchSnapshot();
});
