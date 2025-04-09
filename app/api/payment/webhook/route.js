import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const body = await req.json();
    const { response } = body;

    // Verify checksum
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;

    const checksum = crypto
      .createHash('sha256')
      .update(response + '/pg/v1/status' + saltKey)
      .digest('hex');

    // Verify the checksum
    if (checksum !== body.checksum) {
      throw new Error('Invalid checksum');
    }

    // Decode the response
    const decodedResponse = JSON.parse(Buffer.from(response, 'base64').toString());

    // Handle different payment statuses
    switch (decodedResponse.code) {
      case 'PAYMENT_SUCCESS':
        // Payment successful
        // Update order status in your database
        // Send confirmation email/SMS
        return NextResponse.json({ success: true });

      case 'PAYMENT_ERROR':
        // Payment failed
        // Update order status in your database
        return NextResponse.json({ success: false, message: 'Payment failed' });

      case 'PAYMENT_PENDING':
        // Payment is pending
        // Update order status in your database
        return NextResponse.json({ success: true, message: 'Payment pending' });

      default:
        throw new Error('Unknown payment status');
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 