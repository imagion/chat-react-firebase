'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import { useSignup } from '@/hooks/useSignup';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { error, isPending, login } = useLogin();
  const {
    error: gError,
    isPending: gIsPending,
    signupWithGoogle,
  } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  const handleGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signupWithGoogle();
  };

  return (
    <>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div>
          <label className='label' htmlFor='userEmail'>
            Адрес электронной почты
          </label>
          <input
            className='input'
            id='userEmail'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className='label' htmlFor='password'>
            Пароль
          </label>
          <input
            id='userPassword'
            type='password'
            autoComplete='off'
            className='input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Link href='/login' className='text-sky-400'>
            Забыли пароль?
          </Link> */}
        </div>
        <div className='flex flex-col justify-center gap-2'>
          <button
            type='submit'
            className='rounded bg-blue-500 p-2'
            disabled={isPending}>
            {isPending ? 'Входим...' : 'Вход'}
          </button>
          {error && <p>{error}</p>}
          <div className='flex items-center gap-2'>
            <span className='text-xs text-gray-400'>Нужна учётная запись?</span>
            <Link href='/signup' className='text-sky-400'>
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </form>
      <hr className='border-neutral-500' />
      <button
        onClick={handleGoogle}
        className='rounded bg-blue-500 p-2'
        disabled={gIsPending}>
        {gIsPending ? 'Входим через Google...' : 'Войти через Google'}
      </button>
      {gError && <p>{gError}</p>}
    </>
  );
}
