import { render, screen } from '@testing-library/react';
import ProgressButton from '../components/ProgressButton.js';
import React from "react";

test('renders page and check props', () => {
    render(<ProgressButton value={45} handleButtonClick={() => null}/>);
    screen.debug();
    expect(screen.getByText(/45/)).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('value',"45")
});
