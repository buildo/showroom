### Examples

```js
const labels = {
  success: 'Success',
  error: 'Error',
  ready: 'Ready',
  processing: 'Processing'
};

const icons = {
  success: <div />,
  error: <div />,
  processing: <div />
};

<AsyncStatusIndicator state='ready' labels={labels} icons={icons} />
```

```js
const labels = {
  success: 'Success',
  error: 'Error',
  ready: 'Ready',
  processing: 'Processing'
};

const icons = {
  success: <div />,
  error: <div />,
  processing: <div />
};

<div>
  <AsyncStatusIndicator state='ready' icons={icons} labels={labels} />
  <AsyncStatusIndicator state='processing' icons={icons} labels={labels} />
  <AsyncStatusIndicator state='success' icons={icons} labels={labels} />
  <AsyncStatusIndicator state='error' icons={icons} labels={labels} />
</div>
```
