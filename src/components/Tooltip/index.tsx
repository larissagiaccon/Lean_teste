import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  return (
    <Container className="tooltip" data-testid="tooltip-container">
      {children}
      <span>{title}</span>
    </Container>
  );
};
