'use client'

import { useState } from 'react'

interface PartnerFormProps {
  adminWhatsapp: string
  submitButtonLabel: string
}

export function PartnerRegistrationForm({ adminWhatsapp, submitButtonLabel }: PartnerFormProps) {
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    whatsapp: '',
    jenisMitra: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama wajib diisi'
    }
    if (!formData.alamat.trim()) {
      newErrors.alamat = 'Alamat wajib diisi'
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'No WhatsApp wajib diisi'
    } else if (!/^[0-9+\-\s]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Format nomor tidak valid'
    }
    if (!formData.jenisMitra) {
      newErrors.jenisMitra = 'Pilih jenis mitra'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const message = `Halo, saya ingin mendaftar menjadi Mitra.

*Nama:* ${formData.nama}
*Alamat:* ${formData.alamat}
*No WhatsApp:* ${formData.whatsapp}
*Jenis Mitra:* ${formData.jenisMitra}

Mohon informasi lebih lanjut. Terima kasih.`

    const encodedMessage = encodeURIComponent(message)
    const waNumber = adminWhatsapp.replace(/[^0-9]/g, '')
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`
    
    window.open(waUrl, '_blank')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nama */}
      <div>
        <label htmlFor="nama" className="mb-2 block text-sm font-medium text-gray-700">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nama"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6B7F5E] ${
            errors.nama ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Masukkan nama lengkap"
        />
        {errors.nama && <p className="mt-1 text-sm text-red-500">{errors.nama}</p>}
      </div>

      {/* Alamat */}
      <div>
        <label htmlFor="alamat" className="mb-2 block text-sm font-medium text-gray-700">
          Alamat <span className="text-red-500">*</span>
        </label>
        <textarea
          id="alamat"
          value={formData.alamat}
          onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
          rows={3}
          className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6B7F5E] ${
            errors.alamat ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Masukkan alamat lengkap"
        />
        {errors.alamat && <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>}
      </div>

      {/* No WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-gray-700">
          No WhatsApp <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="whatsapp"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6B7F5E] ${
            errors.whatsapp ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Contoh: 08123456789"
        />
        {errors.whatsapp && <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>}
      </div>

      {/* Jenis Mitra */}
      <div>
        <label htmlFor="jenisMitra" className="mb-2 block text-sm font-medium text-gray-700">
          Jenis Mitra <span className="text-red-500">*</span>
        </label>
        <select
          id="jenisMitra"
          value={formData.jenisMitra}
          onChange={(e) => setFormData({ ...formData, jenisMitra: e.target.value })}
          className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6B7F5E] ${
            errors.jenisMitra ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Pilih jenis mitra</option>
          <option value="Agen">Agen</option>
          <option value="Sub Agen">Sub Agen</option>
          <option value="Reseller">Reseller</option>
        </select>
        {errors.jenisMitra && <p className="mt-1 text-sm text-red-500">{errors.jenisMitra}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-4 text-lg font-medium text-white transition-colors hover:bg-[#128C7E]"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {submitButtonLabel || 'Daftar via WhatsApp'}
      </button>
    </form>
  )
}
