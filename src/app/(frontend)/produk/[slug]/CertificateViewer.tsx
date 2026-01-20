import Image from 'next/image'
import type { Media } from '@/payload-types'

interface Certificate {
  file: number | Media
  title?: string | null
  id?: string | null
}

interface CertificateViewerProps {
  certificates: Certificate[]
}

// Helper to get file info
const getFileInfo = (file: number | Media): { url: string | null; mimeType: string | null; filename: string } => {
  if (typeof file === 'number') return { url: null, mimeType: null, filename: '' }
  return {
    url: file.url ?? null,
    mimeType: file.mimeType ?? null,
    filename: file.filename ?? 'Sertifikat',
  }
}

export function CertificateViewer({ certificates }: CertificateViewerProps) {
  if (!certificates || certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-500">Belum ada sertifikat BPOM untuk produk ini</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {certificates.map((cert, index) => {
        const fileInfo = getFileInfo(cert.file)
        if (!fileInfo.url) return null

        const isPDF = fileInfo.mimeType?.includes('pdf')
        const isImage = fileInfo.mimeType?.startsWith('image/')

        return (
          <div key={cert.id || index} className="rounded-xl border border-gray-200 overflow-hidden">
            {/* Title */}
            {cert.title && (
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 className="font-medium text-[#5C5346]">{cert.title}</h4>
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              {isPDF ? (
                <div className="space-y-4">
                  {/* PDF Embed */}
                  <div className="relative aspect-[4/5] w-full bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src={`${fileInfo.url}#view=FitH`}
                      className="absolute inset-0 h-full w-full"
                      title={cert.title || 'Sertifikat BPOM'}
                    />
                  </div>
                  {/* Download Link */}
                  <a
                    href={fileInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#6B7F5E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5C5346]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </a>
                </div>
              ) : isImage ? (
                <div className="relative aspect-auto">
                  <Image
                    src={fileInfo.url}
                    alt={cert.title || 'Sertifikat BPOM'}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ) : (
                <a
                  href={fileInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#6B7F5E] hover:underline"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {fileInfo.filename}
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
