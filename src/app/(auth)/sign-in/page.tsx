import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const SignIn = async () => {
  const session = await auth();
  if (session) redirect('/');

  return <div>SignIn</div>;
};

export default SignIn;
