import { defineType } from 'sanity'

export default defineType({
  name: 'callout',
  type: 'object',
  title: 'Callout',
  fields: [
    {
      name: 'tone',
      type: 'string',
      title: 'Tone',
      description: 'Visual style of the callout',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Success', value: 'success' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    },
    {
      name: 'text',
      type: 'text',
      title: 'Text',
      description: 'Callout message',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      tone: 'tone',
      text: 'text',
    },
    prepare({ tone, text }) {
      return {
        title: `Callout (${tone})`,
        subtitle: text,
      }
    },
  },
})
