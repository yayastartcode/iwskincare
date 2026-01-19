import type { GlobalConfig } from 'payload'

export const HomepageCTA: GlobalConfig = {
  slug: 'homepage-cta',
  label: 'CTA (Homepage)',
  admin: {
    description: 'Kelola section Call-to-Action di homepage',
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
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        description: 'Gambar latar belakang (rekomendasi: 1920x600)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul',
      defaultValue: 'Gabung Menjadi Agen',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
      defaultValue: 'Dapatkan penghasilan tambahan dengan bekerja dari rumah, gabung menjadi tim agen kami dan raih berbagai benefit!',
    },
    {
      name: 'button',
      type: 'group',
      label: 'Tombol',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          defaultValue: 'Daftar Sekarang',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Buka di Tab Baru',
          defaultValue: true,
        },
      ],
    },
  ],
}
