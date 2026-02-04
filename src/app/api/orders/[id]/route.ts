import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Zod schema for updating order status
const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED']),
});

export async function GET(request: Request, context: any) {
  const { id } = await context.params;
  try {
    console.log('Order ID:', id); // Debug log
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        orderProducts: { include: { product: true } },
        user: true,
        address: true,
      },
    });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error); // Debug log
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 },
    );
  }
}

// POST is not typical for a single resource, but here is a placeholder
export async function POST(
  request: Request,
  context: { params: { id: string } },
) {
  return NextResponse.json(
    { error: 'POST not supported on this endpoint' },
    { status: 405 },
  );
}

export async function PUT(request: Request, context: any) {
  const { id } = await context.params;
  console.log('PUT order id:', id);
  try {
    const body = await request.json();
    console.log('PUT body:', body);
    const { status } = updateStatusSchema.parse(body);

    // Try to update the order
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { status: status as any },
      include: {
        orderProducts: { include: { product: true } },
        user: true,
        address: true,
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    // Prisma error for "Record to update does not exist."
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    console.error('Failed to update order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: any) {
  const { id } = await context.params;
  console.log('DELETE order id:', id);
  try {
    // Delete related orderProducts first
    await prisma.orderProduct.deleteMany({
      where: { orderId: Number(id) },
    });

    // Now delete the order
    await prisma.order.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Order deleted' });
  } catch (error) {
    console.error('Failed to delete order:', error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
