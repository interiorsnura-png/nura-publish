import {draftMode} from 'next/headers';
import {NextRequest,NextResponse} from 'next/server';
import {timingSafeEqual} from 'node:crypto';
export async function GET(request:NextRequest){const expected=process.env.PREVIEW_SECRET;const received=request.nextUrl.searchParams.get('secret')||'';if(!expected||Buffer.byteLength(expected)!==Buffer.byteLength(received)||!timingSafeEqual(Buffer.from(expected),Buffer.from(received)))return NextResponse.json({error:'Unauthorised'},{status:401});const slug=request.nextUrl.searchParams.get('slug')||'home';if(!/^[a-zA-Z0-9_./-]+$/.test(slug)||slug.includes('..')||slug.startsWith('/'))return NextResponse.json({error:'Invalid path'},{status:400});(await draftMode()).enable();return NextResponse.redirect(new URL(slug==='home'?'/':'/'+slug,request.url));}
