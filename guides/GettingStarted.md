## Install

Each component lives in its own repo, under the `buildo` organization on GitHub.

All components are published on npm under the scoped backage `@buildo` and you can install them separately. For instance:

```sh
npm install --save @buildo/react-button
npm install --save @buildo/react-async-status-indicator
```

and then

```js static
import Button from '@buildo/react-button';
import AsyncStatusIndicator from '@buildo/react-async-status-indicator';
```
