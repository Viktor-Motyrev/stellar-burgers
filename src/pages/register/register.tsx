import { FC, SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../../services/store';
import { register as registerThunk } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerThunk({ name: userName, email, password })).then(
      (action: any) => {
        if (action.type.endsWith('fulfilled')) {
          navigate('/');
        }
      }
    );
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
