import React from "react";
import { render } from "react-dom";
import { compose, lifecycle } from "recompose";

const configPromise = fetchConfiguration();

const withConfig = lifecycle({
  state: { config: {} },
  componentDidMount() {
    configPromise.then(config => this.setState({ config }));
  }
});

const User = withConfig(({ name, status, config }) => (
  <div className="User">
    {name}
    {config.showStatus && "—" + status}
    {config.canDeleteUsers && <button>X</button>}
  </div>
));

const App = () => (
  <div>
    <User name="Tim" status="active" />
  </div>
);

render(<App />, document.getElementById("root"));

const config = {
  showStatus: true,
  canDeleteUsers: true
};

function fetchConfiguration() {
  return new Promise(resolve => {
    setTimeout(() => resolve(config), 300);
  });
}