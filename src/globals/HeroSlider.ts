import type { GlobalConfig } from 'payload'

export const HeroSlider: GlobalConfig = {
  slug: 'hero-slider',
  label: 'Hero Slider',
  admin: {
    description: 'Kelola gambar slider untuk hero section di homepage',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Gambar',
          admin: {
            description: 'Ukuran rekomendasi: 1920x800 pixels',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          admin: {
            description: 'Deskripsi gambar untuk aksesibilitas',
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
      name: 'settings',
      type: 'group',
      label: 'Pengaturan',
      fields: [
        {
          name: 'autoPlay',
          type: 'checkbox',
          label: 'Auto Play',
          defaultValue: true,
        },
        {
          name: 'autoPlayInterval',
          type: 'number',
          label: 'Interval Auto Play (detik)',
          defaultValue: 5,
          min: 2,
          max: 15,
          admin: {
            condition: (data) => data?.settings?.autoPlay,
          },
        },
      ],
    },
  ],
}
