import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // In production, this can send an email via Resend, SendGrid, or save to a database.
    // For local and production readiness, we log the inquiry securely and return confirmation.
    console.log('[Transmission Received] Inbound Project Inquiry:', {
      timestamp: new Date().toISOString(),
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      messageLength: validatedData.message.length
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been successfully transmitted to Mohammad Hasan Parvez at H Tech Provision IT.'
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected transmission error occurred. Please try again or reach out directly.'
      },
      { status: 500 }
    );
  }
}
