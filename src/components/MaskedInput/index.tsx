import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import InputMask from 'react-input-mask';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask: string;
}

export const MaskedInput: React.FC<InputMaskProps> = ({
  name,
  mask,
  ...rest
}) => {
  const inputRef = useRef<InputMask>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.props.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      className="maskedInput"
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input-container"
    >
      <InputMask
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        mask={mask}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#C21" size={20} />
        </Error>
      )}
    </Container>
  );
};
