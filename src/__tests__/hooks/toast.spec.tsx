import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { ToastProvider, useToast } from '../../hooks/toast';

describe('Toast hook', () => {
  it('should be able to add toast', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast({
        type: 'error',
        title: 'Test error',
        description: 'Test error',
      });
    });

    expect(result.current.messages[0].title).toEqual('Test error');
  });

  it('should be able to remove toast', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast({
        type: 'error',
        title: 'Test error',
        description: 'Test error',
      });
    });

    act(() => {
      result.current.removeToast(result.current.messages[0].id);
    });

    expect(result.current.messages.length).toEqual(0);
  });
});
