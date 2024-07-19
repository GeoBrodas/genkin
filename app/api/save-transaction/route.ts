import { formCreateTransaction } from '@/schemas/form';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();

  console.log('data recieved in api', res);

  const data = res.transactions.map((item) => ({
    description: item.description,
    category: item.category,
    date: item.date,
    amount: item.amount,
  }));

  const supabase = createClient();

  try {
    const response = await supabase.from('main').insert(data);

    console.log('saved transaction', response);

    if (response.status === 400 || response.error)
      return NextResponse.json(
        { message: response.statusText },
        { status: response.status }
      );

    return NextResponse.json(
      { status: 'OK', response },
      { status: response.status }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        status: 'Not OK',
        message: 'Something went wrong!',
      },
      {
        status: 500,
      }
    );
  }
}
