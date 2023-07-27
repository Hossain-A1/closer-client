import { useEffect } from "react";
import Projects from "../components/ProjectsItems";
import ProjectForm from "../components/ProjectForm";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useUserContext } from "../hooks/useUserContext";
const Home = () => {
  const { user } = useUserContext();
  const { projects, dispatch } = useProjectsContext();
  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
      }
    };
    if (user) {
      getProjects();
    }
  }, [dispatch, user]);
  return (
    <div className="home container mx-auto lg:grid grid-cols-3 gap-10 py-10">
      <ProjectForm />
      <div className="projects-right col-span-2">
        <h2 className="text-3xl text-green-900 capitalize text-center lg:py-0 py-5">
          {projects?.length < 1 ? "No project" : "All projects"}
        </h2>
        <div className=" wrapper mt-10 lg:flex flex-wrap gap-5 lg:space-y-0 space-y-5 lg:px-0 px-3">
          {projects &&
            projects.map((project) => (
              <Projects key={project._id} project={project} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
