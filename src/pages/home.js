import { useEffect, useState } from "react";
import Projects from "../components/ProjectsItems";
import ProjectForm from "../components/ProjectForm";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProject = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/projects");
        if (!res.ok) {
          throw Error("Something went wrong>");
        }
        const json = await res.json();
        setLoading(false);
        setProjects(json);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getProject();
  }, []);

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
