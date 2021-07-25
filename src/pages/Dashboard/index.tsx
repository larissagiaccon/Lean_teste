import * as Yup from 'yup';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiTrash, FiEdit, FiX } from 'react-icons/fi';

import { Input } from '../../components/Input';
import { MaskedInput } from '../../components/MaskedInput';
import getValidationErrors from '../../utils/getValidationErros';

import {
  Container,
  Content,
  UserContainer,
  Overlay,
  OverlayContainer,
  ButtonCloseModal,
} from './styles';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export const Dashboard: React.FC = () => {
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);
  const [isClick, setIsClick] = useState(false);
  const [users, setUsers] = useState<SignUpFormData[]>([]);
  const [userSelected, setUserSelected] = useState<SignUpFormData>(
    {} as SignUpFormData,
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('@Lean:users') || '[]'));
  }, []);

  const handleClickUser = useCallback(
    user => {
      if (user.id === userSelected.id) {
        setIsClick(state => !state);
      } else {
        setIsClick(true);
      }
      setUserSelected(user);
    },
    [userSelected],
  );

  const handleDeleteUser = useCallback(async () => {
    const updatedUsers = users.filter(user => user.id !== userSelected.id);

    setUsers(updatedUsers);

    localStorage.setItem('@Lean:users', JSON.stringify(updatedUsers));

    addToast({
      type: 'success',
      title: 'Usuário excluído!',
      description: 'O usuário foi excluído com sucesso.',
    });
  }, [users, userSelected, addToast]);

  const handleUpdatedUser = useCallback(async () => {
    setIsEditing(true);
  }, []);

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

        const validData: SignUpFormData = {
          name: data.name,
          email: data.email,
          cpf: data.cpf.replaceAll(/[^0-9]/g, ''),
          phone: data.phone.replaceAll(/[^0-9]/g, ''),
        };

        await schema.validate(validData, {
          abortEarly: false,
        });

        const { name, email, cpf, phone } = data;

        const findUser = users.find(
          user => user.cpf === data.cpf && user.id !== userSelected.id,
        );

        if (!findUser) {
          const updatedUser = users.map(user => {
            if (
              user.id === userSelected.id &&
              (user.name !== data.name ||
                user.email !== data.email ||
                user.cpf !== data.cpf ||
                user.phone !== data.phone)
            ) {
              const user_id = user.id;

              addToast({
                type: 'success',
                title: 'Usuário atualizado!',
                description: 'O usuário foi atualizado com sucesso.',
              });

              return {
                id: user_id,
                name,
                email,
                cpf,
                phone: phone.replaceAll('_', ''),
              };
            }
            return {
              ...user,
            };
          });

          setUsers(updatedUser);

          localStorage.setItem('@Lean:users', JSON.stringify(updatedUser));

          setIsEditing(false);
        } else {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'O CPF informado já está cadastrado no sistema',
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [users, userSelected, addToast],
  );

  const handleCloseModalUpdatedUser = useCallback(async () => {
    setIsEditing(false);
  }, []);

  return (
    <Container>
      <Content>
        {users.map(user => (
          <UserContainer
            onClick={() => {
              handleClickUser(user);
            }}
            data-testid="user-container"
          >
            <span>{user.name}</span>
            <p>{user.email}</p>
            <p>{user.cpf}</p>
            <p>{user.phone}</p>
            {isClick && userSelected.id === user.id && (
              <>
                <button
                  type="button"
                  className="delete"
                  data-testid="user-delete"
                  onClick={handleDeleteUser}
                >
                  <FiTrash />
                </button>
                <button
                  type="button"
                  className="edit"
                  data-testid="user-edit"
                  onClick={handleUpdatedUser}
                >
                  <FiEdit />
                </button>
              </>
            )}
          </UserContainer>
        ))}
      </Content>
      {isEditing && (
        <Overlay data-testid="user-data">
          <OverlayContainer>
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={{
                name: userSelected.name,
                email: userSelected.email,
                cpf: userSelected.cpf,
                phone: userSelected.phone,
              }}
            >
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

              <button type="submit">Atualizar</button>
            </Form>

            <ButtonCloseModal
              onClick={handleCloseModalUpdatedUser}
              data-testid="user-edit-close"
            >
              <FiX />
            </ButtonCloseModal>
          </OverlayContainer>
        </Overlay>
      )}
    </Container>
  );
};
