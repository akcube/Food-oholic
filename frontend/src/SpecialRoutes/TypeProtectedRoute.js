import { useAuth } from "../services/authContext";

function TypeProtectedRoute({VendorComponent, CustomerComponent}) {
  return (
    (useAuth().data.user.user_type == 0) ? CustomerComponent : VendorComponent
  );
}

export default TypeProtectedRoute;