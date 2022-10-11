import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Auth from '@/components/Auth'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Auth',
  component: Auth,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  }
} as ComponentMeta<typeof Auth>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Auth> = (args) => <Auth {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Auth'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Auth'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Auth'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Auth'
}
