## Install

Currently, only a small set of components lives in its own repo and is published separately.
Most components live in the [buildo/react-components](https://github.com/buildo/react-components) repo and are published together under the name `buildo-react-components`.

```sh
yarn add buildo-react-components
```

```js static
import Button from 'buildo-react-components/lib/Button';
import Modal from 'buildo-react-components/lib/Modal';
// ...
```

The components that are published separately are:
- [TextareaAutosize](https://github.com/buildo/react-autosize-textarea)
- [CookieBanner](https://github.com/buildo/react-cookie-banner)
- [FlexView](https://github.com/buildo/react-flexview)
- [InputChildren](https://github.com/buildo/react-input-children)

```sh
yarn add react-autosize-textarea
yarn add react-cookie-banner
yarn add react-flexview
yarn add react-input-children
```

```js static
import TextareaAutosize from 'react-autosize-textarea';
import CookieBanner from 'react-cookie-banner';
import FlexView from 'react-flexview';
import InputChildren from 'react-input-children';
```
