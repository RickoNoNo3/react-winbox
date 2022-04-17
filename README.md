# React-WinBox

A React component for [WinBox.js](https://github.com/nextapps-de/winbox), with full Reactful props and state. Includes all configuration of WinBox.js by using React component props.

**Use it just like other native components of you! Whatever the float window does.**

**Full type declaration for both JavaScript and TypeScript.**

![demo screenshot](https://github.com/rickonono3/react-winbox/demo.jpg)

## Install

```bash
npm install --save react-winbox winbox@0.2.1
# OR
yarn add react-winbox winbox@0.2.1
```

## Usage

```jsx
import 'winbox/dist/css/winbox.min.css';

<WinBox
  width={this.state.boxWidth ?? 500}
  height={300}
  x="center"
  y={30}
  noClose={this.state.inEditing}
>
  <div>
    <h1>Hello, WinBox!</h1>
    <MyComponent myProps={1} onChange={this.handleChange}/>
  </div>
</WinBox>
```

## Notice
To open a winbox, just create it in your virtual DOM, that's enough.
To close a winbox, just do not render it. It's safe.
To change some properties of the window, just change the properties of WinBox Component. (the properties need [official methods](https://github.com/nextapps-de/winbox#manage-window-content) support. BTW, don't forget to setState or forceupdate to rerender the parent of the WinBox!)

## See the official document for [WinBox.js](https://github.com/nextapps-de/winbox)
