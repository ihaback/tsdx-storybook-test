import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from '../src';

const meta: Meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Default = Template.bind({});

// Here we provide the props for the default version of the button
Default.args = { text: 'I am the default story button' };

export const Primary = Template.bind({});

// Here we provide the props for the primary version of the button
Primary.args = { variant: 'primary', text: 'I am the primary story button' };

export const Secondary = Template.bind({});

// Here we provide the props for the secondary version of the button
Secondary.args = {
  variant: 'secondary',
  text: 'I am the secondary story button',
};
