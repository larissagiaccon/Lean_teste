import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

import { Input } from '../../components/Input';
import { MaskedInput } from '../../components/MaskedInput';
import getValidationErrors from '../../utils/getValidationErros';

import { Container, Content, Background } from './styles';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export const SignUp: React.FC = () => {
  const { addToast } = useToast();

  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const cpfRegExp = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/;

        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          email: Yup.string()
            .required('Campo obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string()
            .required('Campo obrigatório')
            .matches(cpfRegExp, 'CPF inválido'),
          phone: Yup.string()
            .required('Campo obrigatório')
            .min(10, 'Deve ter no mínimo 10 dígitos'),
        });

        const id = uuid();

        const validData: SignUpFormData = {
          name: data.name,
          email: data.email,
          cpf: data.cpf.replaceAll(/[^0-9]/g, ''),
          phone: data.phone.replaceAll(/[^0-9]/g, ''),
        };

        await schema.validate(validData, {
          abortEarly: false,
        });

        const formattedData: SignUpFormData = {
          id,
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          phone: data.phone.replaceAll('_', ''),
        };

        const users: SignUpFormData[] = JSON.parse(
          localStorage.getItem('@Lean:users') || '[]',
        );

        const findUser = users.find(user => user.cpf === formattedData.cpf);

        if (findUser) {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'O CPF informado já está cadastrado no sistema',
          });
        } else {
          users.push(formattedData);

          localStorage.setItem('@Lean:users', JSON.stringify(users));

          setIsSubmit(true);

          addToast({
            type: 'success',
            title: 'Usuário cadastrado!',
            description: 'O usuário foi cadastrado com sucesso.',
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [addToast],
  );

  const handleSignUp = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  return (
    <Container>
      <Background />
      <Content isSubmit={isSubmit}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Lean Cadastro</h1>

          <p>Nome Completo</p>
          <Input name="name" data-testid="input-name" />

          <p>E-mail</p>
          <Input name="email" data-testid="input-email" />

          <p>CPF</p>
          <MaskedInput
            name="cpf"
            mask="999.999.999-99"
            data-testid="input-cpf"
          />

          <p>Telefone</p>
          <MaskedInput
            name="phone"
            mask="(99) 99999-9999"
            data-testid="input-phone"
          />

          <div className="buttons">
            <button type="submit" className="cadastrar">
              Cadastrar
            </button>

            <button type="button" className="login" onClick={handleSignUp}>
              Login
              <BsArrowRight />
            </button>
          </div>
        </Form>
      </Content>
    </Container>
  );
};
