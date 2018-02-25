/**
 * Created by Q on 2017. 11. 23..
 */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

// const unauthenticatedPages = ['/', '/signup'];
// const authenticatedPages = ['/dashboard'];

// const onEnterPublicPage = () => {
//   if (Meteor.userId()) {
//     browserHistory.replace('/dashboard');
//   }
// };
// const onEnterPrivatePage = () => {
//   if (!Meteor.userId()) {
//     browserHistory.replace('/');
//   }
// };

const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);
};

const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  // const pathname = browserHistory.getCurrentLocation().pathname;
  // const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  // const isAuthenticatedPage = authenticatedPages.includes(pathname);
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  // If on unauthenticated page and logged in, redirect to /links
  // If on authenticated page and not logged in, redirect to /
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }

  // console.log('isAuthenticated', isAuthenticated);
}

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
  console.log('globalOnEnter');
  // debugger;
};

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="/signup" component={Signup} privacy="unauth" />
      <Route path="/dashboard" component={Dashboard} privacy="auth" />
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);