import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home';

afterEach(cleanup);

describe('Home component', () => {

    it('renders', () => {
        render(<Home />);
    });

    it('matches snapshot', () => {
        const { asFragment } = render(<Home />);

        expect(asFragment()).toMatchSnapshot();
    });
})