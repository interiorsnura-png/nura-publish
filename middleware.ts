import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import validPaths from './lib/valid-paths.json';

const validPathsSet = new Set(validPaths);

const notFoundMarkdown = `# Page Not Found (404)

The requested resource does not exist on Nura Interiors.
- [Sitemap](https://www.nura-interiors.com/sitemap.xml)
- [LLMs Reference](https://www.nura-interiors.com/llms.txt)
- [Homepage](https://www.nura-interiors.com/)
`;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    (pathname.includes('.') && !pathname.endsWith('.html'))
  ) {
    return NextResponse.next();
  }

  const accept = request.headers.get('accept') || '';

  if (accept.includes('text/markdown')) {
    const normalized = pathname.replace(/\/$/, '') || '/';
    const isKnown =
      validPathsSet.has(normalized) ||
      pathname.startsWith('/journal') ||
      pathname.startsWith('/post/') ||
      pathname.startsWith('/services/') ||
      pathname.startsWith('/projects/') ||
      pathname.startsWith('/guides/');

    if (!isKnown) {
      return new Response(notFoundMarkdown, {
        status: 404,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept'
        }
      });
    }
  }

  const response = NextResponse.next();
  response.headers.set('Vary', 'Accept');
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
