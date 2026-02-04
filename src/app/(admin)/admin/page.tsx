import { redirect } from 'next/dist/server/api-utils';
import React from 'react';
import OrdersList from '@/components/OrdersList';

const AdminMainPage = () => {
  return <OrdersList />;
};

export default AdminMainPage;
