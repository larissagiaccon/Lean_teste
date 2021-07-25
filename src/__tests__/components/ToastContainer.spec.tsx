import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { ToastContainer } from '../../components/ToastContainer';

const mockedRemoveToast = jest.fn();

const mockedMessages = [
  {
    id: 'test_id',
    title: 'Test title',
    description: 'Test description',
  },
];

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      removeToast: mockedRemoveToast,
    }),
  };
});

describe('ToastContainer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to render a toast container', async () => {
    const { getByTestId } = render(
      <ToastContainer messages={mockedMessages} />,
    );

    expect(getByTestId('toast-container')).toBeTruthy();
  });

  it('should be able to remove toast with user close toast', async () => {
    const { getByTestId } = render(
      <ToastContainer messages={mockedMessages} />,
    );

    const buttonElement = getByTestId('toast-button');

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedRemoveToast).toHaveBeenCalled();
    });
  });

  it('should be able to remove toast after time defined', async () => {
    jest.useFakeTimers();

    render(<ToastContainer messages={mockedMessages} />);

    await waitFor(() => expect(mockedRemoveToast).toHaveBeenCalled(), {
      timeout: 5001,
    });
  });
});
