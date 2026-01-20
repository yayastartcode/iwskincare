import type { GlobalConfig } from 'payload'

export const MitraPage: GlobalConfig = {
  slug: 'mitra-page',
  label: 'Halaman Pendaftaran Mitra',
  admin: {
    description: 'Kelola konten halaman pendaftaran Mitra (Agen, Sub Agen, Reseller)',
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
      defaultValue: 'Pendaftaran Mitra',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'Bergabunglah menjadi mitra kami dan kembangkan bisnis Anda bersama kami',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Deskripsi Program',
      admin: {
        description: 'Penjelasan tentang program kemitraan',
      },
    },
    {
      name: 'partnerTypes',
      type: 'group',
      label: 'Jenis Mitra',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Judul Section',
          defaultValue: 'Pilih Jenis Kemitraan',
        },
        {
          name: 'agen',
          type: 'group',
          label: 'Agen',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Judul',
              defaultValue: 'Agen',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Deskripsi Singkat',
              defaultValue: 'Mitra utama dengan wilayah eksklusif',
            },
            {
              name: 'requirements',
              type: 'array',
              label: 'Syarat & Ketentuan',
              defaultValue: [
                { text: 'Modal minimal Rp 5.000.000' },
                { text: 'Memiliki tempat usaha atau toko' },
                { text: 'Bersedia menyetok produk' },
                { text: 'Mengikuti training produk' },
                { text: 'Memiliki jaringan penjualan' },
              ],
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
          name: 'subAgen',
          type: 'group',
          label: 'Sub Agen',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Judul',
              defaultValue: 'Sub Agen',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Deskripsi Singkat',
              defaultValue: 'Mitra di bawah koordinasi Agen',
            },
            {
              name: 'requirements',
              type: 'array',
              label: 'Syarat & Ketentuan',
              defaultValue: [
                { text: 'Modal minimal Rp 2.500.000' },
                { text: 'Area belum ada agen aktif' },
                { text: 'Mengikuti training online' },
                { text: 'Aktif di media sosial' },
                { text: 'Berkomitmen untuk target penjualan' },
              ],
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
          name: 'reseller',
          type: 'group',
          label: 'Reseller',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Judul',
              defaultValue: 'Reseller',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Deskripsi Singkat',
              defaultValue: 'Mulai tanpa modal, untung maksimal',
            },
            {
              name: 'requirements',
              type: 'array',
              label: 'Syarat & Ketentuan',
              defaultValue: [
                { text: 'Tidak perlu modal awal' },
                { text: 'Beli minimal 3 produk untuk mulai' },
                { text: 'Aktif promosi di media sosial' },
                { text: 'Memiliki akun marketplace (Shopee/Tokopedia)' },
                { text: 'Konsisten dalam penjualan' },
              ],
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
      ],
    },
    {
      name: 'formSection',
      type: 'group',
      label: 'Section Form Pendaftaran',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Judul Form',
          defaultValue: 'Form Pendaftaran Mitra',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi',
          defaultValue: 'Isi form di bawah ini untuk mendaftar menjadi mitra kami',
        },
        {
          name: 'submitButtonLabel',
          type: 'text',
          label: 'Label Tombol Submit',
          defaultValue: 'Daftar via WhatsApp',
        },
      ],
    },
  ],
}
