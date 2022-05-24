
React Component helps to split render.

[![npm](https://img.shields.io/npm/v/react-renderer-status-split)](https://www.npmjs.com/package/react-renderer-status-split)

## Install

``yarn add react-renderer-status-split``

or

```npm i -S react-renderer-status-split```


## Usage

Component is designed to avoid deep ternary in components. 
You can set renders you want to handle for your action.
Check simple list with all types of renders:

```tsx
import { RendererStatusSplit } from 'react-renderer-status-split'

function MyComponent() {
  const statuses = {
    isLoading: false,
    error: "",
    isDone: false,
  };

  return (
    <RendererStatusSplit
      statuses={statuses}
      renderPreview={() => <div>action not started</div>}
      renderLoading={() => <div>action is loading</div>}
      renderError={(error) => <div>action errored: {error}</div>}
      renderEmpty={() => <div>no data after action</div>}
      render={() => <div>show data</div>}
    />
  )
}

```


## Props
 

- statuses **required**
  - isLoading *optional* - (Boolean)
  - isDone *optional* - (Boolean) Defines if action is completed
  - data *optional* - (any) Defines if some data was received after action. 
Will be used for `renderEmpty`
  - error *optional* - (String) check if action was completed with error, 
so it will try to select `renderError()`
- isEmpty *optional* - (Boolean) - Designed for force setting if data exists or not.
If `isEmpty` is set to `false`, it will skip all status renders.
- render(data) **required** - Always default render. 
Other renders can replace this one for specific statuses.
Ideally if all renders exists, this one will be visible only when action is 
completed and data exists.

- renderLoading() *optional* - means action in progress. Checks if `isLoading` is true
- renderEmpty() *optional* - means action is completed, but data is empty. Checks if `data` is empty. Or `isEmpty` is true.
- renderError(error) *optional* - means action is errored. will be used when `error` is not empty
- renderPreview() *optional* - means action is not started yet.


## Advanced usage

Composition example using: api, redux, react-hooks-async-handlers

```tsx
import { RendererStatusSplit } from 'react-renderer-status-split'
import { useAsyncFetch } from 'react-hooks-async-handlers'


function MyComponent() {
  const dispatch = useDispatch()
  const { pageObject } = useSelector((state) => ({
    pageObject: state.pageObject,
  }))
  
  const fetchAction = useAsyncFetch(
    async () => {
      await dispatch(Dispatcher.getPageObject())
    },
    { maxTries: 3 },
  )
    
  return (
    <div>
      <h1>Page Title</h1>
  
      <div className={'content-container'}>
        <RendererStatusSplit
          statuses={fetchAction}
          isEmpty={_.isEmpty(pageObject)}
          renderPreview={() => <div>Loading will start soon</div>}
          renderLoading={() => <div>Component is loading</div>}
          renderError={(error) => <span color={'red'}>{error}</span>}
          renderEmpty={() => <div>Component is not found</div>}
          render={() => <ComponentInfo data={pageObject} />}
        />
      </div>
    </div>
  ) 
}
```


## See Also

List of libraries that work well with status renderer:

- [react-hooks-async-handlers](https://www.npmjs.com/package/react-hooks-async-handlers)
