import type { GlobalConfig } from 'payload'

export const DistributorPage: GlobalConfig = {
  slug: 'distributor-page',
  label: 'Halaman Distributor',
  admin: {
    description: 'Kelola konten halaman pendaftaran Distributor',
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
      defaultValue: 'Gabung Menjadi Distributor',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'Jadilah mitra bisnis kami dan kembangkan jaringan distribusi di wilayah Anda',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Deskripsi',
      admin: {
        description: 'Penjelasan tentang program distributor',
      },
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Keuntungan Menjadi Distributor',
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
          defaultValue: 'Syarat Menjadi Distributor',
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
      name: 'coverage',
      type: 'group',
      label: 'Area Coverage',
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: 'Tampilkan Section',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Judul',
          defaultValue: 'Area Distribusi Tersedia',
          admin: {
            condition: (data) => data?.coverage?.show,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi',
          admin: {
            condition: (data) => data?.coverage?.show,
          },
        },
        {
          name: 'areas',
          type: 'array',
          label: 'Daftar Area',
          admin: {
            condition: (data) => data?.coverage?.show,
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Nama Area/Wilayah',
            },
            {
              name: 'isAvailable',
              type: 'checkbox',
              label: 'Tersedia',
              defaultValue: true,
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
          defaultValue: 'Siap Menjadi Mitra Kami?',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi',
          defaultValue: 'Hubungi tim kami untuk informasi lebih lanjut tentang kemitraan distributor',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Label Tombol',
          defaultValue: 'Hubungi Kami',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'URL Tombol',
          admin: {
            description: 'Contoh: https://wa.me/628xxx?text=Halo saya ingin mendaftar menjadi Distributor',
          },
        },
      ],
    },
  ],
}
