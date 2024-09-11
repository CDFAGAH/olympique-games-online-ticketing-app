'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState(null);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError(null);

    if (!email || !password) {
      setError('Email and password are required');
      setLoginInProgress(false);
      return;
    }

    try {
      console.log('Form submission started');
      console.log('Email:', email);
      console.log('Password:', password);

      const result = await signIn('credentials', {
        redirect: false,
        email, // Use 'email' key instead of 'username'
        password,
      });

      console.log('Sign in result:', result);

      setLoginInProgress(false);

      if (result.error) {
        setError(result.error);
      } else {
        // Redirect on successful login
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setLoginInProgress(false);
      setError('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}
        <button
          disabled={loginInProgress}
          type="submit"
          className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loginInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loginInProgress ? 'Logging in...' : 'Login'}
        </button>
        <div className="my-4 text-center text-gray-500">or login with provider</div>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-4 justify-center items-center w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <Image src="/google.png" alt="Google" width={24} height={24} />
          Login with Google
        </button>
      </form>
    </section>
  );
}
