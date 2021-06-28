import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../Login';

afterEach(cleanup);

describe('Login component', () => {

    it('renders', () => {
        render(<Login />);
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Login />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders', () => {
        const { getByTestId } = render(<Login />)
        expect(getByTestId('button')).toHaveTextContent('Login')
    });
})