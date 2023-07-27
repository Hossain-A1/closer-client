import { useContext } from "react";

import { UserContext } from "../context/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error("You must call userContext inside a userContextProvider. ");
  }
  return context
};
