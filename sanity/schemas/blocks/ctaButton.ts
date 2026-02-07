import { defineType } from 'sanity'

export default defineType({
  name: 'ctaButton',
  type: 'object',
  title: 'CTA Button',
  fields: [
    {
      name: 'text',
      type: 'string',
      title: 'Button Text',
      description: 'Text displayed on the button',
      validation: (Rule) => Rule.required().max(40),
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Link destination',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'style',
      type: 'string',
      title: 'Style',
      description: 'Visual style of the button',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    },
  ],
  preview: {
    select: {
      text: 'text',
      url: 'url',
      style: 'style',
    },
    prepare({ text, url, style }) {
      return {
        title: text || 'CTA Button',
        subtitle: `${style} - ${url}`,
      }
    },
  },
})
