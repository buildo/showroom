### Examples

```js
intialState = { checked: false };

onChange = (checked) => {
  setState({ checked });
};

<Toggle value={state.checked} onChange={onChange} size='4em' />
```
