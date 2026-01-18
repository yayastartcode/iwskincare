import type { GlobalConfig } from 'payload'

export const HomepageAbout: GlobalConfig = {
  slug: 'homepage-about',
  label: 'About (Homepage)',
  admin: {
    description: 'Kelola section About di homepage (berbeda dengan halaman Tentang Kami)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Tampilkan Section',
      defaultValue: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar',
      admin: {
        description: 'Gambar untuk section about (rekomendasi: 600x600 atau 800x600)',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Tentang Kami',
      admin: {
        description: 'Teks kecil di atas judul',
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
      type: 'richText',
      required: true,
      label: 'Deskripsi',
      admin: {
        description: 'Deskripsi tentang brand/klinik (bisa format paragraf, bold, italic, list, dll)',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Highlight Points',
      maxRows: 6,
      labels: {
        singular: 'Point',
        plural: 'Points',
      },
      admin: {
        description: 'Poin-poin keunggulan (opsional)',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Teks',
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Tombol CTA',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: 'Tampilkan Tombol',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Selengkapnya',
          admin: {
            condition: (data) => data?.ctaButton?.show,
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          defaultValue: '/tentang',
          admin: {
            condition: (data) => data?.ctaButton?.show,
          },
        },
      ],
    },
  ],
}
