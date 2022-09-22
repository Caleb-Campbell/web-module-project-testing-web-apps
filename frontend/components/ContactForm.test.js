import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />)
    const header = screen.queryByText(/Contact Form/i)
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent


});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstName = screen.queryByLabelText(/first Name*/i)
    userEvent.type(firstName, "asd")

    const errorMessages = await screen.findAllByTestId('error')
    expect(errorMessages).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    await waitFor (()=>{
        const errorMessages = screen.queryAllByTestId('error')
        expect(errorMessages).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/First Name*/i)
    const lastName = screen.getByLabelText(/Last Name*/i)

        userEvent.type(firstName, "Caleb")
        userEvent.type(lastName, "Campbell")

        const button = screen.getByRole('button')
        userEvent.click(button)

        const errorMessages = await screen.getAllByTestId('error')
        expect(errorMessages).toHaveLength(1)        
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText(/email*/i)
    userEvent.type(email, "jasdfasdfd")

    const errorMessages = await screen.findByText(/email must be a valid email address./i)
    expect(errorMessages).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    const errorMessages = await screen.findByText(/lastName is a required field/i)
    expect(errorMessages).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/First Name */i)
    const lastName = screen.getByLabelText(/Last Name */i)
    const email = screen.getByLabelText(/email */i)
    const button = screen.getByRole('button')

    userEvent.type(firstName, 'Caleb')
    userEvent.type(lastName, 'Campbell')
    userEvent.type(email, 'piggywiggy@gmail.com')
    userEvent.click(button)

    await waitFor(() => {
        const fName = screen.queryByText('Caleb')
        const lName = screen.queryByText('Campbell')
        const email2 = screen.queryByText('piggywiggy@gmail.com')
        const messageDisplay = screen.queryByTestId('messageDisplay')

        expect(fName).toBeInTheDocument()
        expect(lName).toBeInTheDocument()
        expect(email2).toBeInTheDocument()
        expect(messageDisplay).not.toBeInTheDocument()
    })
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/First Name */i)
    const lastName = screen.getByLabelText(/Last Name */i)
    const email = screen.getByLabelText(/email */i)
    const button = screen.getByRole('button')

    userEvent.type(firstName, 'Caleb')
    userEvent.type(lastName, 'Campbell')
    userEvent.type(email, 'piggywiggy@gmail.com')
    userEvent.click(button)

    await waitFor(() => {
        const fName = screen.queryByText('Caleb')
        const lName = screen.queryByText('Campbell')
        const email2 = screen.queryByText('piggywiggy@gmail.com')
        const messageDisplay = screen.queryByTestId('messageDisplay')

        expect(fName).toBeInTheDocument()
        expect(lName).toBeInTheDocument()
        expect(email2).toBeInTheDocument()
        expect(messageDisplay).not.toBeInTheDocument()
    })
    
});
