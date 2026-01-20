import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-revalidate-secret')

    // Validate secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Parse request body to get optional specific path
    let body: { path?: string; type?: 'page' | 'layout' } = {}
    try {
      body = await request.json()
    } catch {
      // No body provided, will revalidate all
    }

    // Revalidate specific path or all pages
    if (body.path) {
      revalidatePath(body.path, body.type || 'page')
    } else {
      // Revalidate the entire layout (all pages)
      revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      path: body.path || '/',
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    )
  }
}

// Also allow GET for easy testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 }
    )
  }

  revalidatePath('/', 'layout')

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
  })
}
