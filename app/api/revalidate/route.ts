import {NextRequest,NextResponse} from 'next/server';
import {revalidatePath} from 'next/cache';
import {timingSafeEqual} from 'node:crypto';
export async function POST(request:NextRequest){const expected=process.env.REVALIDATE_SECRET;const received=request.nextUrl.searchParams.get('secret')||'';if(!expected||Buffer.byteLength(expected)!==Buffer.byteLength(received)||!timingSafeEqual(Buffer.from(expected),Buffer.from(received)))return NextResponse.json({error:'Unauthorised'},{status:401});revalidatePath('/','layout');return NextResponse.json({revalidated:true});}
