# AB-React

A simple component for ab testing.

- Automatically choose one version for a user
- The user keeps seeing the same version
- Cookie based for server side rendering

## Install

`yarn add ab-react`

or

`npm install ab-react`

## Usage

```tsx
  import * as React from 'react';
  import ABReact from 'ab-react';

  interface IProps {
    version: string;
  }

  class View extends React.Component<IProps> {
    public componentDidMount() {
      const { version } = this.props;

      // send event to analytics
      // page view
      // anything you want to track here

      // example
      gtag('event', 'page_view', { version });
    }

    public render() {
      const { children } = this.props;

      return (
        <div>
          { children }
        </div>
      )
    }
  }

  <ABReact cookieName='ab-testing'>
    <View>
      Version one
    </View>

    <View>
      Version two
    </View>
  </ABReact>
```