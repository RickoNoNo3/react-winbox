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

> Ensure the document body has an initial non-zero height, e.g. `100vh`.

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
// ...
// some code to maintain a list of necessary windows info...
// ...
const [windows, setWindows] = useState([]);

// This function is for manage `onclose` callback behavior and virtual DOM state.
const handleClose = (force, id) => {
  let state = [...windows];
  const index = state.findIndex(info => info.id === id);
  if (index !== -1) {
    if (state[index].onclose && state[index].onclose(force))
      return true;                       // window-specific onclose, returns true if it does not need the default close process.
    state.splice(index, 1);
    setTimeout(() => setWindows(state)); // (Notice 5)to change winbox showing state in `onclose`, MUST wrap it within `setTimeout`
  }
};

return (
  <>
    {windows.map(info => (
      <WinBox 
        key={info.id} 
        id={info.id} 
        onclose={(force) => handleClose(force, info.id)}
        {...info.neededProps} // assign any props you want to WinBox
      >
        <div>Some children</div>
      </WinBox>
    ))}
  </>
);
```

## Notice
1. To use React-WinBox, ensure the document body has an initial non-zero height, e.g. `100vh`.
2. To open a winbox, just create it in your virtual DOM, that's enough.
3. To close a winbox, just do not render it. It's safe. The winbox will be closed automatically, and it will call the `onclose` callback once with `force=true` param. If the winbox DOM has been closed by users before, WinBox Component will do nothing and just be removed off the virtual DOM.
4. `onclose` is called BEFORE the winbox DOM goes to the close process. In the program-side closing case (Notice 3), it may be insignificant. But if you want to use it to block the closing by users who pressed the close button (such as when there is something editable which has not been saved), it's useful.
5. When `onclose` is called, the winbox DOM has NOT been removed. You may want to change the WinBox Component rendering state. Be sure to wrap state destroy actions within `setTimeout` so that they occur after the winbox DOM is truly removed，e.g. `setTimeout(() => this.setState({showWindow: false}))`. Otherwise, the program-side closing (Notice 3) will overlie the user-side closing (Notice 4). That's cause trouble. See the `handleClose` function in [the second usage](#Usage) for more about a completely safe state management behavior for both program-side and user-side closing.
6. To change some properties of the window, just change the properties of the WinBox Component. (the properties need [official methods](https://github.com/nextapps-de/winbox#manage-window-content) support. BTW, don't forget to setState or forceUpdate to rerender the parent of the WinBox!)
7. If you want to operate the pure WinBox.js object manually (In winbox@0.2.1, it's needed only when you want to call the `mount()` method), you can find a `winBoxObj` in the component ref. !!! Take care of the relationship of statement between WinBox Component and `winBoxObj`.

## Props and Methods

### See the official document for [WinBox.js](https://github.com/nextapps-de/winbox)

### Props

> most props are one-to-one corresponding to the params of WinBox.js.

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

  // returns true if the winbox does not need the default close process, for example, when it needs a confirmation to close instead of being closed suddenly.
  // the param `force` indicates whether you should not abort the winbox to close. If it is true, you MUST return false or empty, or some problems will happen.
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

getId () => string | undefined // a wrapper getter for the id field

isMax () => boolean // a wrapper getter for max field

isMin () => boolean // a wrapper getter for min field

isClosed () => boolean // REACT ONLY. Returns true if the winbox DOM element has been removed but the React component has not yet.

forceUpdate (callback?: () => void): void // REACT ONLY.

```

> Thanks for your reading. If any questions or problems, feel free to issue them.
