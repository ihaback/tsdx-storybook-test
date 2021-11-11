Flexbox grids, buttons and padding/margin components are tedious to write from scratch every time you start a new project. They make good candidates for putting in their own npm library. Luckily scaffolding tools like [tsdx](https://github.com/formium/tsdx) make this a breeze.

In this example we'll publish a simple button component which you can then consume in any other react app.

### Scaffolding the initial tsdx library setup

```
npx tsdx create name-of-your-folder
```

Select the `react-with-storybook` template
![tsdx-react-storybook-template](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u2wdptjfvamwvjoktxjs.png)

### Run storybook

When you cd into your new folder and run

```
yarn storybook
```

you'll see that tsdx already created a test component and story for you when you visit `http://localhost:6006` in the browser.

![Storybook start](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/shgh6qebtffdt5mix7uv.png)

### Install styled components

In this tutorial we'll be using `styled-components` to style our component. Run the command bellow to install in your project

```
yarn add styled-components
```

Also install the types for styled-components

```
yarn add @types/styled-components -D
```

### Create the initial markup

Create a new button component in `src/Button/Button.tsx` with the following markup

```ts
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

export type ButtonProps = { variant?: 'primary' | 'secondary'; text: string };

const StyledButton = styled.button<Omit<ButtonProps, 'text'>>`
  background-color: #2e8b57;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  padding: 18px 24px;

  ${({ variant }) => variant === 'primary' && `background-color: #FFEFD5`}

  ${({ variant }) => variant === 'secondary' && `background-color: #FA8072`}
`;

export const Button = ({ variant, text }: PropsWithChildren<ButtonProps>) => (
  <StyledButton variant={variant}>{text}</StyledButton>
);
```

### Export your newly created component

Import your newly created button component in `src/index.tsx` and export it like so. The existing `Thing` component was created when scaffolded the tsdx project.

```ts
import React, { FC, HTMLAttributes, ReactChild } from 'react';
import { Button, ButtonProps } from './Button/Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
const Thing: FC<Props> = ({ children }) => {
  return <div>{children || `the snozzberries taste like snozzberries`}</div>;
};

export { Thing, Button, ButtonProps };
```

### Create Storybook stories for all button variations

Create a `stories/Button.stories.tsx` file with the following contents

```ts
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
```

### Login to npm in your terminal

In the root of your project log into npm by typing

```
npm login
```

Enter your credentials to authenticate yourself with your account. If you don't have a npm account [you can sign up for one here](https://www.npmjs.com/signup).

### Publish your button component

Before publish your component make sure that you have a unique name under `name` in your `package.json` file. This can not be the same a existing package on npmjs.com. In your case we'll rename it to `button-tsdx-test`.

Now you can publish your button component with

```
npm publish
```

### Your button component is ready to be consumed in other project

If you want to reuse this component in your other projects you can simply add to your package.json. In your case that can be done by running this command

```
yarn add button-tsdx-test
```

Import your component into your new react app.

```ts
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'button-tsdx-test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button text="I'm a reusable npm component" variant="primary" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

### Start your react app and see the result

![Reusable npm component](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pm9gu9ul8ikmlly3hkom.png)
