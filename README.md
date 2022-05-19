# React-WinBox

<a target="_blank" href="https://www.npmjs.com/package/react-winbox"><img src="https://img.shields.io/npm/v/react-winbox?style=flat-square"></a>
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/rickonono3/react-winbox/Node.js%20CI/main?style=flat-square)

A React controlled component for [WinBox.js](https://github.com/nextapps-de/winbox), with full Reactful props and state. Includes all configurations of WinBox.js by using React component props.

**Full type declaration for both JavaScript and TypeScript.**

![demo screenshot](https://github.com/RickoNoNo3/react-winbox/blob/main/demo.jpg)

## Install

```bash
npm install --save react-winbox
# OR
yarn add react-winbox
```

## Usage

> To use WinBox, ensure the document body has an initial non-zero height, e.g. `100vh`.

```jsx
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

Or you can do more one step, to make a genuine 'windows manager', just like:

```tsx
const [windows, setWindows] = useState([]);
// ...
// some code to maintain a list of necessary windows info...
// ...
const handleClose = (id) => {
  let state = [...windows];
  const index = state.findIndex(info => info.id === id);
  if (index !== -1) {
    state.splice(index, 1);
    setTimeout(() => setWindows(state));
  }
};
return (
  <>
    {windows.map(info => (
      <WinBox 
        key={info.id} 
        id={info.id} 
        onclose={() => handleClose(info.id)}
        {...info.neededProps} // assign any props you want to WinBox
      >
        <div>Some children</div>
      </WinBox>
    ))}
  </>
);
```

## Notice
- To open a winbox, just create it in your virtual DOM, that's enough.
- To close a winbox, just do not render it. It's safe.
- `onclose` is called BEFORE the winbox goes to close process. So if you want to destroy the React WinBox component in it, be sure to wrap destroy actions within `setTimeout` so that they occur after the winbox.js DOM is truly closed，e.g. `setTimeout(() => setState({showWindow: false}))`.
- To change some properties of the window, just change the properties of WinBox Component. (the properties need [official methods](https://github.com/nextapps-de/winbox#manage-window-content) support. BTW, don't forget to setState or forceUpdate to rerender the parent of the WinBox!)
- If you want to operate the pure WinBox.js object manually (In winbox@0.2.1, it's needed only when you want to call `mount()` method), you can find a `winBoxObj` in the component ref. !!! Take care of the relationship of statement between WinBox Component and `winBoxObj`.

## Props and Methods

### See the official document for [WinBox.js](https://github.com/nextapps-de/winbox)

### Props

> the most props are one-to-one corresponding to the params of WinBox.js.

```ts
type WinBoxPropType = {
  title: string
  id?: string
  children?: ReactElement | ReactElement[] | null
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

  onclose?: (force: boolean) => boolean | undefined | void,
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
focus () => void // same as the native method.

getId () => string | undefined // a wrapper getter for id field

isMax () => boolean // a wrapper getter for max field

isMin () => boolean // a wrapper getter for min field

isClosed () => boolean // REACT ONLY. Returns true if the winbox DOM element has been removed but the React component not yet.

forceUpdate (callback?: () => void): void // REACT ONLY.

```

> Thanks for your reading. If any questions or problems, feel free to issue them.
