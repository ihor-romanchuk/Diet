import React, { Component } from 'react';
import Router from '../../routing/router';

class NotFoundPage extends Component {
  constructor(props: any) {
    super(props);
    Router.routes.meals.go();
  }
  render() {
    return <div></div>;
  }
}

export default NotFoundPage;
