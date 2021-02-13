import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import Home from '../pages/Home.js';
import React from "react";
import api from '../config/axios';

jest.mock('../config/axios')

describe('App', () => {
    afterEach(() => {
        api.get.mockClear();
    });
    beforeEach(() => {
        const data = {status: 200, data: {"buttons": [47, 9, -28, -23], "bars": [12, 86, 43], "limit": 150}}
        api.get.mockResolvedValueOnce(data);
    })
    test('renders page', async() => {
        render(<Home/>);
        await waitFor(() => expect(screen.getByText(/Progress Bar Demo/)).toBeInTheDocument());
        screen.debug();
    });

    test('fetches data from an API and displays them', async () => {
        let {container, getByText} = render(<Home/>)
        await waitFor(() => expect(getByText(/Progress Bar Demo/)).toBeInTheDocument());
        expect(api.get).toHaveBeenCalledTimes(1);
        expect(api.get).toHaveBeenCalledWith('/bars');

        //check bars and buttons
        expect(container.getElementsByClassName('progressBar').length).toBe(3);
        expect(screen.getAllByRole('button').length).toBe(4);
        expect(screen.getByRole('alert')).toHaveTextContent('#progress1');
    });

    test('increment progress bar to limit', async () => {
        let {container, getByText} = render(<Home/>);
        await waitFor(() => expect(getByText(/Progress Bar Demo/)).toBeInTheDocument());

        fireEvent.click(getByText("47"));

        //first bar increments
        expect(container.getElementsByClassName('progressBar')[0]).toHaveTextContent('59%')

        fireEvent.click(getByText("47"));
        //first bar increments again beyond 100
        expect(container.getElementsByClassName('progressBar')[0]).toHaveTextContent('106%')
        expect(container.getElementsByClassName('progressBar')[0]).toHaveClass('error')

        fireEvent.click(getByText("47"));
        //first bar increments again beyond limit of 150
        expect(container.getElementsByClassName('progressBar')[0]).not.toHaveTextContent('153%')
        expect(container.getElementsByClassName('progressBar')[0]).toHaveTextContent('150%')
        expect(container.getElementsByClassName('progressBar')[0]).toHaveClass('error')
    })

    test('decrement progress ba to 0', async () => {
        let {container, getByText} = render(<Home/>);
        await waitFor(() => expect(getByText(/Progress Bar Demo/)).toBeInTheDocument());

        fireEvent.click(getByText("-28"));
        //first bar decrements
        expect(container.getElementsByClassName('progressBar')[0]).not.toHaveTextContent('-14%')
        expect(container.getElementsByClassName('progressBar')[0]).toHaveTextContent('0%')
    })

    test('change progress bar', async () => {
        let {container, getByText} = render(<Home/>);
        await waitFor(() => expect(getByText(/Progress Bar Demo/)).toBeInTheDocument());

        fireEvent.click(screen.getByRole('listbox'))
        fireEvent.click(screen.getAllByRole('option')[2])
        expect(screen.getByRole('alert')).toHaveTextContent('#progress3');

        //test increment after change

        fireEvent.click(getByText("9"));
        expect(container.getElementsByClassName('progressBar')[1]).not.toHaveTextContent('95%')
    })
});
