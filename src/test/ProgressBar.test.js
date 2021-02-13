import {render, screen} from "@testing-library/react";
import ProgressBar from "../components/ProgressBar";
import React from "react";

test('renders page and check props', () => {
    const {container} = render(<ProgressBar value={52}/>);
    screen.debug();
    expect(screen.getByText(/52%/)).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('progressBar')
    expect(container.firstChild).toHaveAttribute('data-percent',"52")
    expect(container.firstChild.firstChild).toHaveStyle('width:52%')
});
