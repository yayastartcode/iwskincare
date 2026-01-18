import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Halaman Kontak',
  admin: {
    description: 'Kelola konten halaman Kontak',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Judul Halaman',
      defaultValue: 'Hubungi Kami',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'Kami siap membantu Anda. Hubungi kami melalui salah satu kontak di bawah ini.',
    },
    {
      name: 'contacts',
      type: 'array',
      label: 'Daftar Kontak',
      labels: {
        singular: 'Kontak',
        plural: 'Kontak',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Tipe',
          required: true,
          options: [
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Telepon', value: 'phone' },
            { label: 'Email', value: 'email' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Alamat', value: 'address' },
            { label: 'Shopee', value: 'shopee' },
            { label: 'Tokopedia', value: 'tokopedia' },
            { label: 'Lainnya', value: 'other' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          admin: {
            description: 'Contoh: Customer Service, Admin 1, Kantor Pusat',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Nilai',
          admin: {
            description: 'Nomor telepon, email, username, atau alamat',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL/Link',
          admin: {
            description: 'Link langsung (opsional, akan di-generate otomatis untuk beberapa tipe)',
          },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Aktif',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'operationalHours',
      type: 'group',
      label: 'Jam Operasional',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: 'Tampilkan',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Judul',
          defaultValue: 'Jam Operasional',
          admin: {
            condition: (data) => data?.operationalHours?.show,
          },
        },
        {
          name: 'hours',
          type: 'array',
          label: 'Jadwal',
          admin: {
            condition: (data) => data?.operationalHours?.show,
          },
          fields: [
            {
              name: 'days',
              type: 'text',
              required: true,
              label: 'Hari',
              admin: {
                description: 'Contoh: Senin - Jumat',
              },
            },
            {
              name: 'time',
              type: 'text',
              required: true,
              label: 'Waktu',
              admin: {
                description: 'Contoh: 08:00 - 17:00 WIB',
              },
            },
          ],
        },
      ],
    },
  ],
}
