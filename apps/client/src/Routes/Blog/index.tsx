import React, { lazy } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { Router } from "Routes";

import usePageview from "Hooks/usePageView";

const BlogPage = lazy(() => import("./BlogPage"));
const PostPage = lazy(() => import("./PostPage"));

export const Blog: Router = ({ match }) => {
  const { path = "/blog" } = match ?? {};

  usePageview({ name: "blog", path });

  return (
    <Switch>
      <Route exact path={path}>
        {() => (
          <BlogPage />
        )}
      </Route>

      {/* show de um post */}
      <Route path={`${path}/:id`}>
        {({ match }: RouteComponentProps<{ id: string }>) => (
          <PostPage id={Number(match?.params.id)} />
        )}
      </Route>
    </Switch>
  );
};

export default Blog;
