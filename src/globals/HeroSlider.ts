import type { GlobalConfig } from 'payload'

const slideFields = [
  {
    name: 'image',
    type: 'upload' as const,
    relationTo: 'media' as const,
    required: true,
    label: 'Gambar',
  },
  {
    name: 'alt',
    type: 'text' as const,
    label: 'Alt Text',
    admin: {
      description: 'Deskripsi gambar untuk aksesibilitas',
    },
  },
  {
    name: 'isActive',
    type: 'checkbox' as const,
    label: 'Aktif',
    defaultValue: true,
  },
]

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
      name: 'desktopSlides',
      type: 'array',
      label: 'Desktop Slides',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      admin: {
        description: 'Gambar untuk desktop (rekomendasi: 1920x800 pixels)',
      },
      fields: slideFields,
    },
    {
      name: 'mobileSlides',
      type: 'array',
      label: 'Mobile Slides',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      admin: {
        description: 'Gambar untuk mobile (rekomendasi: 768x1000 pixels)',
      },
      fields: slideFields,
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
