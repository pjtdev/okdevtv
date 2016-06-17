# React.js

* https://facebook.github.io/react/

```
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);
```

## render lifecycle
* LIFECYCLE METHODS
  * componentWillMount – Invoked once, on both client & server before rendering occurs.
  * componentDidMount – Invoked once, only on the client, after rendering occurs.
  * shouldComponentUpdate – Return value determines whether component should update.
  * componentWillUnmount – Invoked prior to unmounting component.

* SPECS
  * getInitialState – Return value is the initial value for state.
  * getDefaultProps – Sets fallback props values if props aren’t supplied.
  * mixins – An array of objects, used to extend the current component’s functionality.

* stateful
```
var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});

ReactDOM.render(<Timer />, mountNode);
```


## 참고
* https://scotch.io/tutorials/learning-react-getting-started-and-concepts
