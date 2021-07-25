import React from 'react';
import { render } from '@testing-library/react';

import { Tooltip } from '../../components/Tooltip';

describe('Tooltip Component', () => {
  it('should be able to render a tooltip container', async () => {
    const { getByTestId } = render(<Tooltip title="Test" />);

    expect(getByTestId('tooltip-container')).toBeTruthy();
  });
});
