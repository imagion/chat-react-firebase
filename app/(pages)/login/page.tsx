'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-800 to-indigo-900'>
      <div className='flex min-w-[480px] flex-col gap-5 rounded bg-neutral-700 p-10 shadow-xl'>
        <form className='flex flex-col gap-5'>
          <div>
            <label className='label' htmlFor='userEmail'>
              Адрес электронной почты
            </label>
            <input className='input' id='userEmail' type='email' />
          </div>
          <div>
            <label className='label' htmlFor='password'>
              Пароль
            </label>
            <input
              className='input'
              id='userPassword'
              type='password'
              autoComplete='off'
            />
            {/* <Link href='/login' className='text-sky-400'>
            Забыли пароль?
          </Link> */}
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <button type='submit' className='rounded bg-blue-500 p-2'>
              Вход
            </button>
            <div className='flex items-center gap-2'>
              <span className='text-xs text-gray-400'>
                Нужна учётная запись?
              </span>
              <Link href='/signup' className='text-sky-400'>
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </form>
        <hr className='border-neutral-500' />
        <button type='submit' className='rounded bg-blue-500 p-2'>
          Войти через Google
        </button>
      </div>
    </div>
  );
}
