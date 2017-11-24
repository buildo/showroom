### Examples

#### A typical usage
```js
initialState = { value: undefined };

onChange = (value) => {
  setState({ value });
};

<FlexView column>
  <DateField
    value={state.value}
    onChange={this.onChange}
    inputTypeNumber
  />
</FlexView>
```

#### Handle date validation
```js
initialState = {
  value: new Date(),
  isValid: true
};

onChange = (value) => {
  this.setState({ value });
};

onValidChange = isValid => this.setState({ isValid });

<FlexView column>
  <DateField
    value={state.value}
    onChange={this.onChange}
    onValidChange={this.onValidChange} inputTypeNumber
  />
  {`isValid: ${state.isValid}`}
</FlexView>
```
