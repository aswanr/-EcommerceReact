import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders SignUp component for the root route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const signUpElement = screen.getByText('/sign up'); 
    expect(signUpElement).toBeInTheDocument();
  });
});


