// libraries
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// components
import { loadCustomersList } from "../store/customer.store";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCustomersList());
  }, []);

  return children;
};

export default AppLoader;
