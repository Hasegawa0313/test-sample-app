import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Auth from '@/components/Auth'
import { userEvent, within } from '@storybook/testing-library'

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

export const LoginMode = Template.bind({})

export const SignInMode = Template.bind({})

SignInMode.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loginButton = await canvas.getByTestId('mode-change')
  await userEvent.click(loginButton)
}
