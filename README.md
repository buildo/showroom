# react-components-showroom

Proof of concept of a shoowroom for [buildo-react-components](https://github.com/buildo/react-components) using [react-styleguidist](https://react-styleguidist.js.org).

## Try
Install dependencies with `yarn` then:

```
yarn start
```

and visit http://localhost:6060

## How to add a component
Suppose you want to add the component `Foo` from `brc` to the showroom:

- Edit `styleguide.config.js` and add the component to the _Components_ section:

  ```diff
      {
        name: 'Components',
        components: () => [
  -       brc('AsyncStatusIndicator')
  +       brc('AsyncStatusIndicator'),
  +       brc('Foo')
        ],
      }
  ```

- Import the default style in `main.scss`

  ```diff
    @import '~buildo-react-components/src/AsyncStatusIndicator/asyncStatusIndicator.scss';
  + @import '~buildo-react-components/src/Foo/foo.scss';
  ```

- Add examples and descriptions in `examples/Foo.md`. Any markdown can go in there, all <code>```js</code> code blocks will be rendered as an interactive component. More info [here](https://react-styleguidist.js.org/docs/documenting.html#usage-examples-and-readme-files).
