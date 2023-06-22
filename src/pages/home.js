import { useEffect } from "react";
import Projects from "../components/ProjectsItems";
import ProjectForm from "../components/ProjectForm";
import { useProjectsContext } from "../hooks/useProjectsContext";
const Home = () => {
 const {projects,dispatch} = useProjectsContext()
  useEffect(()=>{
    const getProjects = async ()=>{
      const res = await fetch('http://localhost:5000/api/projects')

      const json = await res.json()

      if(res.ok){
        dispatch({type:"SET_PROJECTS",payload:json})
      }
    }
    getProjects()
  },[dispatch])
  return (
    <div className="home container mx-auto lg:grid grid-cols-3 gap-10 py-10">
      <ProjectForm />
      <div className="projects-right col-span-2">
        <h2 className="text-3xl text-teal-700 capitalize text-center lg:py-0 py-5">All projects..</h2>
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
