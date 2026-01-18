import type { GlobalConfig } from 'payload'

export const Features: GlobalConfig = {
  slug: 'features',
  label: 'Fitur Unggulan',
  admin: {
    description: 'Kelola card "Mengapa Memilih Kami" di homepage',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Fitur',
      minRows: 1,
      maxRows: 8,
      labels: {
        singular: 'Fitur',
        plural: 'Fitur',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon',
          admin: {
            description: 'Upload icon (rekomendasi: PNG transparan, ukuran 64x64 atau 128x128)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Deskripsi',
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Aktif',
          defaultValue: true,
        },
      ],
    },
  ],
}
