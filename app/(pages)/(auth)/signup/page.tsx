'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSignup } from '@/hooks/useSignup';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { error, isPending, signupWithEmailAndPassword, signupWithGoogle } =
    useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupWithEmailAndPassword(email, password, displayName);
  };

  const handleGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signupWithGoogle();
  };

  return (
    <>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='userEmail' className='label label-star'>
            E-mail
          </label>
          <input
            required
            id='userEmail'
            type='email'
            className='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='displayName' className='label label-star'>
            Имя пользователя
          </label>
          <input
            required
            id='displayName'
            type='text'
            className='input'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password' className='label label-star'>
            Пароль
          </label>
          <input
            required
            id='userPassword'
            type='password'
            className='input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col justify-center gap-2'>
          <button
            type='submit'
            className='rounded bg-blue-500 p-2'
            disabled={isPending}>
            {isPending ? 'Регистристрируем...' : 'Зарегистрироваться'}
          </button>
          {error && <p>{error}</p>}
          <Link href='/login' className='text-sky-400'>
            Уже зарегистрированы?
          </Link>
        </div>
      </form>
      <hr className='border-neutral-500' />
      <button
        onClick={handleGoogle}
        className='rounded bg-blue-500 p-2'
        disabled={isPending}>
        {isPending
          ? 'Регистрируем через Google...'
          : 'Регистрация через Google'}
      </button>
      {error && <p>{error}</p>}
    </>
  );
}
