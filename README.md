# React-WinBox

<a target="_blank" href="https://www.npmjs.com/package/react-winbox"><img src="https://img.shields.io/npm/v/react-winbox?style=flat-square"></a>
<!--![GitHub Workflow Status](https://img.shields.io/github/workflow/status/rickonono3/react-winbox/Node.js%20CI/main?style=flat-square)-->

A React controlled component for [WinBox.js](https://github.com/nextapps-de/winbox), with full Reactful props and state. Includes all configurations of WinBox.js by using React component props.

**Full type declaration for both JavaScript and TypeScript.**

## Play the [Demo](https://react-winbox.vercel.app)

demo: <https://react-winbox.vercel.app>

![demo screenshot](https://github.com/RickoNoNo3/react-winbox/blob/main/demo.jpg)

> For users who in react-winbox@<=1.4: 
> - After v1.5, we striped the imports of css files, and they need to be import by users themselves now. See our demo and the [usage](#usage).
> - some props were deprecated.

## Install

```bash
npm install --save react-winbox
# OR
yarn add react-winbox
```

## Usage

> Ensure the document body has an initial non-zero height, e.g. `100vh`.

```jsx
import 'winbox/dist/css/winbox.min.css'; // required
import 'winbox/dist/css/themes/modern.min.css'; // optional
import 'winbox/dist/css/themes/white.min.css'; // optional
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

const handleClose = (force, id) => {
  let state = [...windows];
  const index = state.findIndex(info => info.id === id);
  if (index !== -1) {
    if (state[index].onclose && state[index].onclose(force))
      return true;                       // window-specific onclose, returns true if it does not need the default close process.
    state.splice(index, 1);
    setTimeout(() => setWindows(state)); // to change winbox showing state while `onclose`, MUST wrap it within `setTimeout`
  }
};

return (
  <>
    {windows.map(info => (
      <WinBox 
        key={info.id} 
        id={info.id} 
        onClose={(force) => handleClose(force, info.id)}
        {...info.neededProps} // assign any props you want to WinBox
      >
        <div>Some children</div>
      </WinBox>
    ))}
  </>
);
```

## Notice

- To use WinBox, ensure the document body has an initial non-zero height, e.g. 100vh.
- To open a winbox, just create it in your virtual DOM, that's enough.
- To close a winbox, just do not render it. It's safe.
- `onclose` is called BEFORE the winbox goes to close process. It is easy to block a closing for some unsaved data or giving a confirmation to user to close (see the doc to get more info). However, if you do not want to block the closing, but want to destroy the React WinBox component, be sure to wrap destroying actions within `setTimeout` so that they occur after the winbox.js DOM is truly closed, e.g. `setTimeout(() => setShowWindow(false))`.
- To change some properties of the winbox DOM, just change the component's properties. The properties need [official methods](https://github.com/nextapps-de/winbox#overview) support. We suggest that all states you want to control of the winbox should be listened for changes and keep controlled, such as `width` state with `onResize` callback. But if you do not have such listeners, you can call the `forceUpdate` method from refs to keep the winbox status in control as well.
- If you have to operate the pure WinBox.js object manually, you can find a `winBoxObj` in the component ref. It's needed only when you want to call `mount()` method.

## Props and Methods

### See the official document for [WinBox.js](https://github.com/nextapps-de/winbox)

### Props

> most props are one-to-one corresponding to the params of WinBox.js.

```ts
type WinBoxPropType = {
  title?: string
  /** 
   * Icon supports both native image urls and React package resources:
   *
   * Example:
   * ```
   * import icon from './icon.jpg';
   * 
   * <WinBox icon={icon} {...otherProps} />
   * ```
   */
  icon?: string
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
  background?: string,

  max?: boolean,
  min?: boolean,
  fullscreen?: boolean,

  x?: string | number | 'center' | 'right',
  y?: string | number | 'center' | 'bottom',
  top?: string | number,
  bottom?: string | number,
  left?: string | number,
  right?: string | number,
  height?: string | number,
  width?: string | number,

  /**
   * This callback is called BEFORE the winbox goes to close process. So if you want to destroy the React WinBox component while it is triggered, be sure to wrap destroying actions within `setTimeout` so that they occur after the winbox.js DOM is truly closed，e.g. `setTimeout(() => setState({showWindow: false}))`
   *
   * see the following document for more detail about the argument and the return value.
   * @see https://github.com/nextapps-de/winbox
   * @param force Whether you should not abort the winbox to close. If this is true, you MUST return false, or some problems will happen.
   * @return noDefaultClose - true if the winbox does not need the default close process, for example, when it needs a confirmation to close instead of being closed suddenly.
   */
  onClose?: (force: boolean) => boolean | undefined | void,
  onMove?: (x: number, y: number) => any,
  onResize?: (width: number, height: number) => any,
  onBlur?: () => any,
  onFocus?: () => any,

  /** Used for themeing. The `no-xxx` classes that winbox.js already appointed can not assign here, use special props instead, e.g. class `no-resize` to prop `noResize={true}` */
  className?: string | number,

  minWidth?: number | string,
  minHeight?: number | string,
  maxWidth?: number | string,
  maxHeight?: number | string,

  onCreate?: (options: any) => any,
  onFullscreen?: () => any,
  onMinimize?: () => any,
  onMaximize?: () => any,
  onRestore?: () => any,
  onHide?: () => any,
  onShow?: () => any,

  /**
   * an array of WinBoxControlInfo
   * @see https://github.com/nextapps-de/winbox#custom-controls
   */
  customControls?: WinBoxControlInfo[],
}

type WinBoxControlInfo = {
  /** Index to jump into native controls. If no index assigned, custum controls will be arranged side-by-side automatically on the left of native controls*/
  index?: number
  /** a name to identify the button, can also style it by using css, may starts with `wb-` */
  class: string
  /** an image resource same like icon prop */
  image: string
  click?: () => void,
}
```

### Methods

> use React Ref to call these methods

```ts
forceUpdate (callback?: () => void) => void

focus () => void

blur () => void

getId () => string | undefined

getIndex () => number | undefined

getPosition () => { x: number, y: number } | undefined

getSize () => { width: number, height: number } | undefined

getSizeLimit () => { minWidth: number, minHeight: number, maxWidth: number, maxHeight: number } | undefined

getViewportBoundary () => { top: number, right: number, bottom: number, left: number} | undefined

isFocused () => boolean

isHidden () => boolean

isMax () => boolean

isMin () => boolean

isFullscreen () => boolean

isClosed () => boolean // REACT ONLY. Returns true if the winbox DOM element has been removed but the React component not yet.

// below methods are not suggested, as they are not state-controlled and have alternative props.
minimize () => void // prop `min`
maximize () => void // prop `max`
fullscreen () => void // prop `fullscreen`
restore () => void // prop `min`/`max`/`fullscreen`
hide () => void // prop `hide`
show () => void // prop `hide`
```

> Thanks for your reading. If any questions or problems, feel free to issue them.
