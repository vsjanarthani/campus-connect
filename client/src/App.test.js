import { render } from '@testing-library/react';
import App from './App';
import React from 'react';

describe('renders app', () => {
  it('renders', () => {
    render(<App />);
  })
});
