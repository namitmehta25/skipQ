import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      amount,
      merchantId,
      merchantTransactionId,
      merchantUserId,
      redirectUrl,
      redirectMode,
      callbackUrl,
      mobileNumber,
    } = body;

    // PhonePe API credentials
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;
    const baseUrl = process.env.PHONEPE_BASE_URL;

    // Prepare payload
    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId,
      amount: amount * 100, // Convert to paise
      redirectUrl,
      redirectMode,
      callbackUrl,
      mobileNumber,
      paymentInstrument: {
        type: 'UPI',
        targetApp: 'PHONEPE'
      }
    };

    // Create base64 encoded payload
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');

    // Create checksum
    const checksum = crypto
      .createHash('sha256')
      .update(base64Payload + '/pg/v1/pay' + saltKey)
      .digest('hex');

    // Make request to PhonePe API
    const response = await fetch(`${baseUrl}/pg/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': `${checksum}###${saltIndex}`,
      },
      body: JSON.stringify({
        request: base64Payload,
      }),
    });

    const data = await response.json();

    if (data.code === 'PAYMENT_INITIATED') {
      return NextResponse.json({
        success: true,
        paymentUrl: data.data.instrumentResponse.redirectInfo.url,
        qrCode: data.data.instrumentResponse.qrCode,
      });
    } else {
      throw new Error(data.message || 'Payment initiation failed');
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 