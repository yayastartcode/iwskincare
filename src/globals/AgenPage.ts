import type { GlobalConfig } from 'payload'

export const AgenPage: GlobalConfig = {
  slug: 'agen-page',
  label: 'Halaman Agen',
  admin: {
    description: 'Kelola konten halaman pendaftaran Agen',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Hero',
      admin: {
        description: 'Gambar banner di bagian atas (rekomendasi: 1920x600)',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Judul Halaman',
      defaultValue: 'Gabung Menjadi Agen',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Deskripsi',
      admin: {
        description: 'Penjelasan tentang program keagenan',
      },
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Keuntungan Menjadi Agen',
      labels: {
        singular: 'Keuntungan',
        plural: 'Keuntungan',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
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
          label: 'Deskripsi',
        },
      ],
    },
    {
      name: 'requirements',
      type: 'group',
      label: 'Syarat & Ketentuan',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Judul',
          defaultValue: 'Syarat Menjadi Agen',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Daftar Syarat',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Syarat',
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Judul',
          defaultValue: 'Siap Bergabung?',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi',
          defaultValue: 'Daftar sekarang dan mulai perjalanan bisnis Anda bersama kami!',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Label Tombol',
          defaultValue: 'Daftar Sekarang',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'URL Tombol',
          admin: {
            description: 'Contoh: https://wa.me/628xxx?text=Halo saya ingin mendaftar menjadi Agen',
          },
        },
      ],
    },
  ],
}
