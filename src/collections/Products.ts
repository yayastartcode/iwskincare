import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Produk',
    plural: 'Produk',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'isActive', 'updatedAt'],
    description: 'Kelola produk skincare',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Produk',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      admin: {
        description: 'Otomatis dari nama produk (bisa diedit manual)',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data, originalDoc }) => {
            // Auto-generate slug from name if empty or if name changed
            if (data?.name) {
              const newSlug = data.name
                .toLowerCase()
                .replace(/[^a-z0-9\s]+/g, '')
                .replace(/\s+/g, '-')
                .replace(/(^-|-$)/g, '')

              // If no slug yet, or slug was auto-generated (matches old name pattern)
              if (!value || value === '') {
                return newSlug
              }
            }
            return value
          },
        ],
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Gambar Produk',
      minRows: 1,
      labels: {
        singular: 'Gambar',
        plural: 'Gambar',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      options: [
        { label: 'Cleanser', value: 'cleanser' },
        { label: 'Toner', value: 'toner' },
        { label: 'Serum', value: 'serum' },
        { label: 'Moisturizer', value: 'moisturizer' },
        { label: 'Sunscreen', value: 'sunscreen' },
        { label: 'Masker', value: 'masker' },
        { label: 'Treatment', value: 'treatment' },
        { label: 'Paket', value: 'paket' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Deskripsi Singkat',
      admin: {
        description: 'Tampil di card produk (maks 150 karakter)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Deskripsi Lengkap',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Manfaat',
      labels: {
        singular: 'Manfaat',
        plural: 'Manfaat',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ingredients',
      type: 'textarea',
      label: 'Komposisi/Ingredients',
    },
    {
      name: 'howToUse',
      type: 'richText',
      label: 'Cara Penggunaan',
    },
    {
      name: 'size',
      type: 'text',
      label: 'Ukuran/Netto',
      admin: {
        description: 'Contoh: 30ml, 50g',
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Harga',
      min: 0,
      admin: {
        description: 'Harga dalam Rupiah',
        position: 'sidebar',
      },
    },
    {
      name: 'discountPrice',
      type: 'number',
      label: 'Harga Diskon',
      min: 0,
      admin: {
        description: 'Kosongkan jika tidak ada diskon',
        position: 'sidebar',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Produk Unggulan',
      defaultValue: false,
      admin: {
        description: 'Tampilkan di homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktif',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'orderLink',
      type: 'text',
      label: 'Link Pemesanan',
      admin: {
        description: 'Link WhatsApp atau marketplace (opsional)',
        position: 'sidebar',
      },
    },
    {
      name: 'certificates',
      type: 'array',
      label: 'Sertifikat BPOM',
      labels: {
        singular: 'Sertifikat',
        plural: 'Sertifikat',
      },
      admin: {
        description: 'Upload sertifikat BPOM (gambar atau PDF)',
      },
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'File Sertifikat',
          admin: {
            description: 'Upload gambar (JPG, PNG) atau PDF',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Judul/Keterangan',
          admin: {
            description: 'Contoh: Sertifikat BPOM, NIE, dll',
          },
        },
      ],
    },
  ],
}
