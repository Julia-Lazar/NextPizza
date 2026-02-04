'use client';
import { auth } from '@/auth';
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const CheckoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push('/api/auth/signin');
  //   }
  // }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  // if (!isAuthenticated) return null; // or a spinner

  return <>{children}</>;
};

export default CheckoutWrapper;
