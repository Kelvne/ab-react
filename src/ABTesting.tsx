import * as React from 'react';
import { ReactCookieProps, withCookies } from 'react-cookie';

interface IABTestingProps extends ReactCookieProps {
  cookieName: string;
}

interface IABTestingState {
  selected: number;
}

export class ABTesting extends React.Component<IABTestingProps, IABTestingState> {
  constructor(props: React.Props<ABTesting> & IABTestingProps) {
    super(props);
    const { children, cookies, cookieName } = props;

    const cookie = cookies
      ? cookies.get(cookieName)
      : null;

    if (cookie) {
      this.state = {
        selected: Number(cookie),
      };

      return;
    }

    const count = React.Children.count(children);
    const selected = Math.floor(Math.random() * count);

    this.state = {
      selected,
    };

    if (cookies) { cookies.set(cookieName, String(selected), { maxAge: 86400 * 7 }); }
  }

  public render() {
    const { children, cookies, cookieName } = this.props;
    const { selected } = this.state;

    const components = React.Children.toArray(children);

    if (cookies && components.length - 1 < selected) {
      cookies.remove(cookieName);
      return components[0];
    }

    return components[selected];
  }
}

export default withCookies(ABTesting) as React.ComponentType<IABTestingProps>;
