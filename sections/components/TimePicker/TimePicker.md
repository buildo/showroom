### Examples

#### 12h time format

```js
initialState = {};

onChange = (value) => setState({ value });

<TimePicker
  value={state.value}
  onChange={onChange}
  timeFormat='12h'
/>
```

#### 24h time format (bounded range)

```js
initialState = { value: { hours: 11, minutes: 23 } };

onChange = (value) => setState({ value });

const minTime = { hours: 8, minutes: 30 };
const maxTime = { hours: 18, minutes: 30 };

<TimePicker
  value={state.value}
  minTime={minTime}
  maxTime={maxTime}
  onChange={onChange}
  timeFormat='24h'
/>
```
