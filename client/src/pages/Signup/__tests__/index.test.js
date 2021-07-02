import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Signup from '../Signup';

afterEach(cleanup);

describe('Signup component', () => {

    it('renders', () => {
        render(<Signup />);
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Signup />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders', () => {
        const { getByTestId } = render(<Signup />)
        expect(getByTestId('button')).toHaveTextContent('Signup')
    });
})