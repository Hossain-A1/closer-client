import { useUserContext } from "./useUserContext";
import { useProjectsContext } from "./useProjectsContext";

export const useLogout = () => {
  const { dispatch: logoutDispatch } = useUserContext();
  const { dispatch: projectsDispatch } = useProjectsContext()
  const logout = () => {
    // cleare ls
    localStorage.removeItem("user");
    // dispatch logout
    logoutDispatch({ type: "LOGOUT" });
    projectsDispatch({type:"SET_PROJECTS",payload:[]})
  };
  return {logout};
};
