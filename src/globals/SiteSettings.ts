import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  admin: {
    description: 'Kelola logo, navigasi, SEO, dan pengaturan umum situs',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'seo',
      type: 'group',
      label: 'SEO & Meta',
      fields: [
        {
          name: 'siteTitle',
          type: 'text',
          label: 'Nama Situs',
          required: true,
          admin: {
            description: 'Nama situs yang tampil di browser tab',
          },
        },
        {
          name: 'siteDescription',
          type: 'textarea',
          label: 'Deskripsi Situs',
          admin: {
            description: 'Deskripsi untuk SEO (meta description)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords',
          admin: {
            description: 'Kata kunci untuk SEO, pisahkan dengan koma (contoh: skincare, perawatan kulit, kecantikan)',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon',
          admin: {
            description: 'Icon yang tampil di browser tab (rekomendasi: 32x32 atau 64x64 PNG/ICO)',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG Image',
          admin: {
            description: 'Gambar yang tampil saat link dibagikan di social media (rekomendasi: 1200x630)',
          },
        },
      ],
    },
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Image',
          admin: {
            description: 'Upload logo situs (rekomendasi: PNG transparan, tinggi 40-60px)',
          },
        },
        {
          name: 'text',
          type: 'text',
          label: 'Logo Text',
          admin: {
            description: 'Teks yang ditampilkan jika tidak ada logo image',
          },
        },
      ],
    },
    {
      name: 'navigation',
      type: 'group',
      label: 'Navigasi',
      fields: [
        {
          name: 'links',
          type: 'array',
          label: 'Menu Links',
          labels: {
            singular: 'Link',
            plural: 'Links',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
              admin: {
                description: 'Teks yang ditampilkan di menu',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL',
              admin: {
                description: 'Contoh: /produk, /tentang, https://wa.me/628xxx',
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'Buka di Tab Baru',
              defaultValue: false,
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
          name: 'ctaButton',
          type: 'group',
          label: 'Tombol CTA (Kanan)',
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
              defaultValue: 'Pesan Sekarang',
              admin: {
                condition: (data) => data?.navigation?.ctaButton?.show,
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              admin: {
                condition: (data) => data?.navigation?.ctaButton?.show,
              },
            },
            {
              name: 'openInNewTab',
              type: 'checkbox',
              label: 'Buka di Tab Baru',
              defaultValue: true,
              admin: {
                condition: (data) => data?.navigation?.ctaButton?.show,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Kontak',
      fields: [
        {
          name: 'whatsapp',
          type: 'text',
          label: 'Nomor WhatsApp',
          admin: {
            description: 'Format: 628xxx (tanpa + atau spasi)',
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Alamat',
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
          admin: {
            description: 'Link lengkap ke Instagram (contoh: https://instagram.com/drferihana)',
          },
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok',
          admin: {
            description: 'Link lengkap ke TikTok (contoh: https://tiktok.com/@drferihana)',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube',
          admin: {
            description: 'Link lengkap ke YouTube (contoh: https://youtube.com/@drferihana)',
          },
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook',
          admin: {
            description: 'Link lengkap ke Facebook (contoh: https://facebook.com/drferihana)',
          },
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Copyright Text',
          admin: {
            description: 'Contoh: © 2026 Nama Brand. All rights reserved.',
          },
        },
        {
          name: 'showSocialMedia',
          type: 'checkbox',
          label: 'Tampilkan Social Media di Footer',
          defaultValue: true,
        },
      ],
    },
  ],
}
