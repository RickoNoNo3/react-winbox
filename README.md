# React-WinBox

<a target="_blank" href="https://www.npmjs.com/package/react-winbox"><img src="https://img.shields.io/npm/v/react-winbox.svg"></a>

A React component for [WinBox.js](https://github.com/nextapps-de/winbox), with full Reactful props and state. Includes all configuration of WinBox.js by using React component props.

## Use it just like other native components of you! Whatever the float window does.

**Full type declaration for both JavaScript and TypeScript.**

![demo screenshot](https://github.com/RickoNoNo3/react-winbox/blob/main/demo.jpg)

## Install

```bash
npm install --save react-winbox winbox@0.2.1
# OR
yarn add react-winbox winbox@0.2.1
```

## Usage

```jsx
import 'winbox/dist/css/winbox.min.css';
import WinBox from 'react-winbox';

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

Or you can do more one step, to make a true 'windows manager', just like:

```tsx
const [windows, setWindows] = useState();
// ...
// some code to maintain a list of necessary windows info...
// ...
return (
  <>
    {windows.map(info => (
      // assign any prop you want to WinBox
      <WinBox {...info.neededProps}>
        <div>Some children</div>
      </WinBox>
    ))}
  </>
);
```

## Notice
- To open a winbox, just create it in your virtual DOM, that's enough.
- To close a winbox, just do not render it. It's safe.
- To change some properties of the window, just change the properties of WinBox Component. (the properties need [official methods](https://github.com/nextapps-de/winbox#manage-window-content) support. BTW, don't forget to setState or forceupdate to rerender the parent of the WinBox!)

## Props and Methods

### See the official document for [WinBox.js](https://github.com/nextapps-de/winbox)

### Props

> the most props are one-to-one corresponding to the params of WinBox.js.

```ts
type WinBoxPropType = {
  title: string
  id?: string
  children?: ReactChild | Iterable<ReactNode> | null
  url?: string // When you use this, the children elements will be ignored.

  noAnimation?: boolean,
  noShadow?: boolean,
  noHeader?: boolean,
  noMin?: boolean,
  noMax?: boolean,
  noFull?: boolean,
  noClose?: boolean,
  noResize?: boolean,
  noMove?: boolean,
  modal?: boolean,
  hide?: boolean,

  index?: number,
  border?: number,
  splitscreen?: boolean,
  background?: string,

  max?: boolean, // a wrapper prop for maximize() method
  min?: boolean, // a wrapper prop for minimize() method

  x?: string | number | 'center',
  y?: string | number | 'center',
  top?: string | number,
  bottom?: string | number,
  left?: string | number,
  right?: string | number,
  height?: string | number,
  width?: string | number,
  fullscreen?: boolean, // a wrapper prop for fullscreen() method

  onclose?: (force?: boolean) => boolean,
  onmove?: (x: number, y: number) => any,
  onresize?: (width: number, height: number) => any,
  onblur?: () => any,
  onfocus?: () => any,

  className?: string | number,
}
```

### Methods

> use React Ref to call these methods

```ts
focus (): void // same as the native method.

getId (): string | undefined // a wrapper getter for id field

isMax (): boolean // a wrapper getter for max field

isMin (): boolean // a wrapper getter for min field

isClosed (): boolean // REACT ONLY. Returns true if the winbox DOM element has been removed but the React component does not yet.

forceUpdate (callback?: () => void): void // REACT ONLY.

```

> Thanks for your reading. If any question or problem, issue it.
