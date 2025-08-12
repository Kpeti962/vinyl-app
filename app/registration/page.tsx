import React from 'react';

const RegistrationForm = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
        <h1 className='text-3xl font-bold mb-4'>Registration</h1>
        <form className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              required
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-2 mt-4 '>
            <button
              type='submit'
              className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200'
            >
              Registration
            </button>
          </div>
        </form>
          <a href='/login'>
            <button
            className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 mt-4'
            >Login</button>
          </a>
      </div>
      <button className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200'>
        Registration
      </button>
    </div>
  );
};

export default RegistrationForm;
