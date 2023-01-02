# React-WinBox

<a target="_blank" href="https://www.npmjs.com/package/react-winbox"><img src="https://img.shields.io/npm/v/react-winbox?style=flat-square"></a>
<!--![GitHub Workflow Status](https://img.shields.io/github/workflow/status/rickonono3/react-winbox/Node.js%20CI/main?style=flat-square)-->

A React controlled component for [WinBox.js](https://github.com/nextapps-de/winbox), with full Reactful props and state. Includes all configuration of WinBox.js by using React component props.

**Full type declaration for both JavaScript and TypeScript.**

![demo screenshot](https://github.com/RickoNoNo3/react-winbox/blob/main/demo.jpg)

## Play the [Demo]()

## Install

```bash
npm install --save react-winbox
# OR
yarn add react-winbox
```

## Usage

To use WinBox, ensure the document body has an initial non-zero height, e.g. `100vh`.

```jsx
import 'winbox/dist/css/winbox.min.css'; // required
import 'winbox/dist/css/themes/modern.min.css'; // optional
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
1. To open a winbox, just create it in your virtual DOM, that's enough.
2. To close a winbox, just do not render it. It's safe.
3. `onclose` is called BEFORE the winbox goes to close process. It is easy to block a closing for some unsaved data or giving a confirmation to user to close (see the doc to get more info). However, if you do not want to block the closing, but want to destroy the React WinBox component, be sure to wrap destroying actions within `setTimeout` so that they occur after the winbox.js DOM is truly closed, e.g. `setTimeout(() => setShowWindow(false))`.
4. To change some properties of the winbox DOM, just change the component's properties. The properties need [official methods](https://github.com/nextapps-de/winbox#overview) support. We suggest that all states you want to control of the winbox should be listened for changes and keep controlled, such as `width` state with `onResize` callback. But if you do not have such listeners, you can call the `forceUpdate` method from refs to keep the winbox status in control as well.
5. If you want to operate the pure WinBox.js object manually, you can find a `winBoxObj` in the component ref. It's needed only when you want to call `mount()` method.

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

> Thanks for your reading. If any question or problem, feel free to issue it.
