import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Halaman Tentang Kami',
  admin: {
    description: 'Kelola konten halaman Tentang Kami',
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
        description: 'Gambar utama di bagian atas (rekomendasi: 1920x600)',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Judul Halaman',
      defaultValue: 'Tentang Kami',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tentang',
          fields: [
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Gambar',
              admin: {
                description: 'Gambar untuk section tentang (rekomendasi: 600x600)',
              },
            },
            {
              name: 'aboutTitle',
              type: 'text',
              label: 'Judul',
            },
            {
              name: 'aboutContent',
              type: 'richText',
              label: 'Konten',
              admin: {
                description: 'Cerita tentang brand, sejarah, filosofi',
              },
            },
          ],
        },
        {
          label: 'Visi & Misi',
          fields: [
            {
              name: 'visionTitle',
              type: 'text',
              label: 'Judul Visi',
              defaultValue: 'Visi',
            },
            {
              name: 'visionContent',
              type: 'richText',
              label: 'Konten Visi',
            },
            {
              name: 'missionTitle',
              type: 'text',
              label: 'Judul Misi',
              defaultValue: 'Misi',
            },
            {
              name: 'missionContent',
              type: 'richText',
              label: 'Konten Misi',
            },
          ],
        },
        {
          label: 'Nilai-Nilai',
          fields: [
            {
              name: 'valuesTitle',
              type: 'text',
              label: 'Judul Section',
              defaultValue: 'Nilai-Nilai Kami',
            },
            {
              name: 'values',
              type: 'array',
              label: 'Nilai',
              labels: {
                singular: 'Nilai',
                plural: 'Nilai',
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
          ],
        },
      ],
    },
  ],
}
