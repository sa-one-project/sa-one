function PrivateRoute() {
  const hasToken = !!localStorage.getItem("AccessToken");

  if (!hasToken) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
