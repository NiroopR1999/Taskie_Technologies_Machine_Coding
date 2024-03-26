import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { renderPrivateRoutes, renderPublicRoutes } from './config/routes';
import './App.css';
import { Spinner } from '@nextui-org/react';
import RequireAuth from './utils/RequireAuth';
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        {renderPrivateRoutes.map(([key, route]) => (
          <Route
            key={key}
            path={route.path}
            element={
              <React.Suspense
                fallback={
                  <div className="h-screen w-screen grid place-content-center">
                    <Spinner />
                  </div>
                }
              >
                <route.component />
              </React.Suspense>
            }
          />
        ))}
      </Route>

      {renderPublicRoutes.map(([key, route]) => (
        <Route
          key={key}
          path={route.path}
          element={
            <React.Suspense
              fallback={
                <div className="h-screen w-screen grid place-content-center">
                  <Spinner />
                </div>
              }
            >
              <route.component />
            </React.Suspense>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
