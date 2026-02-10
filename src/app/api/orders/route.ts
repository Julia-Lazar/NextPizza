import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createOrderSchema } from '@/schemas/order.schema';
import { z } from 'zod';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
        user: true,
        address: true, // Add this line to include address data
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = createOrderSchema.parse(body);

    // Prepare address data
    const addressData: any = {
      fullName: validatedData.address.fullName,
      street: validatedData.address.street,
      city: validatedData.address.city,
      postalCode: validatedData.address.postalCode,
      // country: validatedData.address.country,
    };
    if (validatedData.userId) {
      addressData.user = { connect: { id: validatedData.userId } };
    }

    // Create address first
    const newAddress = await prisma.address.create({
      data: addressData,
    });

    // Fetch prices for products based on size
    const productsWithPrices = await Promise.all(
      validatedData.products.map(async (item) => {
        const productSize = await prisma.productSize.findUnique({
          where: {
            productId_sizeName: {
              productId: item.productId,
              sizeName: item.size,
            },
          },
        });

        if (!productSize) {
          throw new Error(
            `Product size not found for productId: ${item.productId}, size: ${item.size}`,
          );
        }

        return {
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
          price: productSize.price, // Include the price for the selected size
        };
      })
    );

    // Create order with products
    const order = await prisma.order.create({
      data: {
        userId: validatedData.userId || null,
        status: 'PENDING',
        totalPrice: validatedData.totalPrice,
        paymentMethod: validatedData.paymentMethod,
        addressId: newAddress.id,
        orderProducts: {
          create: productsWithPrices.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
            price: item.price, // Save the price in the orderProducts table
          })),
        },
      },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
        user: true,
        address: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      const isKnown =
        error.message.startsWith('Product size not found') ||
        error.message.startsWith('Invalid `prisma.address.create`');
      return NextResponse.json(
        { error: error.message },
        { status: isKnown ? 400 : 500 },
      );
    }

    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 },
    );
  }
}
