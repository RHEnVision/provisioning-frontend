# Development
a getting started guide for developers

## UX / Components
[patternfly](https://www.patternfly.org/v4/) is the primary UX guidance and is used for the main components store.
You can find further shared components and utils by [@redhat-cloud-services](https://github.com/RedHatInsights/frontend-components)
Thanks to the micro-frontend architecture of `cloud.redhat.com`, you can also consume components from other frontend apps
by using the `<AsyncComponent>` loader, this also allows you to consume provisioning's components in a different frontend app. 

## API
[react-query](https://react-query.tanstack.com) is used for managing, mutating, and caching the server's state.
This approach simplifies the need of maintaining a global state for the data layer and gives out-of-the-box solutions for server-client optimizations.

### How to fetch/mutate data from the server
First have a look in the `API/index.js` to see if there's already a fetch function for your desired data, if not:
1. Add a fetch function in the `API/index.js`
   ```js
   export const fetchSomeList = async () => {
     const { data } = await axios.get(provisioningUrl('<endpoint>'));
     return data;
    };
   ```
2. Add a specific constant or a function for the request's key in `API/keys.js`, this allow caching data and prevents redundant fetching, for further information about creating a query key, see [queries keys docs](https://react-query.tanstack.com/guides/query-keys)
3. Consume the hook `useQuery` in your component
   ```js
     const {
      isLoading,
      isError,
      error,
      data,
  } = useQuery(MY_QUERY_KEY, fetchSomeList);
   ```
   There are plenty of options to choose from, i.e depended on queries, stale query, caching time, manual triggering, polling, and more. 
   For further reading visit the [useQuery](https://react-query.tanstack.com/reference/useQuery) API

## Client global state
While the `react-query` replaces the need for managing the server's data state, there's a need to manage a client's global state.
For implementing a simple global state, we use the native `useState` wrapped by [react-tracked](https://react-tracked.js.org/) which is used for optimizing the DOM and preventing enforce redundant re-renders on global state changes.

### When to use the global state
As a rule of thumb, if a client state is required in multiple steps (wizard steps), then it makes sense to keep it global (like the native `React.Context` approach), so we won't need to propagate many local state (and setters functions) deeply in the wizard tree. Try to keep the client's state data as primitive as you can (string, number, boolean) for preventing future optimizations issues.

### How to use it
```js
import { useGlobalState } from '../Common/GlobalState';

  const [globalState, setGlobalState] = useGlobalState();

  clickHandler(id) => {
    // updating the global state
    setGlobalState((prevState) => ({ ...prevState, chosenItemID: id }));
}
  // using the global state, `data` can be some list from the server's state
  const chosenItem = data.find(item => item.id === globalState.chosenItemID);
```
