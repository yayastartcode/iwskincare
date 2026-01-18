import type { GlobalConfig } from 'payload'

export const HomepageProducts: GlobalConfig = {
  slug: 'homepage-products',
  label: 'Produk (Homepage)',
  admin: {
    description: 'Kelola section produk di homepage',
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
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Produk Kami',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Judul',
      defaultValue: 'Produk Unggulan',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
    },
    {
      name: 'displayType',
      type: 'select',
      label: 'Tampilkan Produk',
      defaultValue: 'featured',
      options: [
        { label: 'Produk Unggulan (isFeatured)', value: 'featured' },
        { label: 'Produk Terbaru', value: 'latest' },
        { label: 'Pilih Manual', value: 'manual' },
      ],
    },
    {
      name: 'selectedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Pilih Produk',
      admin: {
        condition: (data) => data?.displayType === 'manual',
      },
    },
    {
      name: 'maxProducts',
      type: 'number',
      label: 'Jumlah Produk Maksimal',
      defaultValue: 8,
      min: 4,
      max: 12,
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Tombol Lihat Semua',
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
          defaultValue: 'Lihat Semua Produk',
          admin: {
            condition: (data) => data?.ctaButton?.show,
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          defaultValue: '/produk',
          admin: {
            condition: (data) => data?.ctaButton?.show,
          },
        },
      ],
    },
  ],
}
