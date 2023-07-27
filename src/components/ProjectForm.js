import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useUserContext } from "../hooks/useUserContext";

export const ProjectForm = ({ project, setModal, setOverlay }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [dev, setDev] = useState(project ? project.dev : "");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyfields] = useState([]);
  const { dispatch } = useProjectsContext();
  const { user } = useUserContext();

  const handleProjectForm = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in!");
    }
    //post req
    const projectData = { title, tech, budget, manager, dev, duration, error };
    //  when no project
    if (!project) {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },

        body: JSON.stringify(projectData),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error);
        setEmptyfields(json.emptyFields);
      }

      // res ok
      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setManager("");
        setDuration("");
        setDev("");
        setEmptyfields([]);
        dispatch({ type: "CREATE_PROJECT", payload: json });
        setError(null);
      }
      return;
    }

    // when project
    if (project) {
      const res = await fetch(
        `http://localhost:5000/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectData),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        setError(json.error);
        setEmptyfields(json.emptyFields);
      }

      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setManager("");
        setDuration("");
        setDev("");
        setError(null);
        setModal(false);
        setOverlay(false);
        setEmptyfields([]);
        dispatch({ type: "UPDATE_PROJECT", payload: json });
      }
      return;
    }
  };

  return (
    <form onSubmit={handleProjectForm} className="lg:px-0 px-3">
      <h2
        className={`text-3xl text-green-900 capitalize ${
          project ? "hidden" : ""
        }`}
      >
        Add a new project
      </h2>
      <div className="flex flex-col space-y-2 mt-2">
        <label
          htmlFor="title"
          className="text-black/70 text-xl font-semibold tracking-widest cursor-pointer"
        >
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          type="text"
          placeholder="e.g E-shop"
          className={`py-3 px-2 rounded border-2 outline-none bg-slate-100 text-teal-700 focus:border-green-900 duration-300 ${
            emptyFields?.includes("title") ? "border-rose-600/50" : "border-2"
          }`}
        />

        <label
          htmlFor="tech"
          className="text-black/70 text-xl font-semibold tracking-widest"
        >
          Tech
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          id="tech"
          type="text"
          placeholder="e.g react,node, etc"
          className={`py-3 px-2 rounded border-2 outline-none bg-slate-100 text-teal-700 focus:border-green-900 duration-300 ${
            emptyFields?.includes("tech") ? "border-rose-600/50" : "border-2"
          }`}
        />

        <label
          htmlFor="budget"
          className="text-black/70 text-xl font-semibold tracking-widest"
        >
          Budget
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          id="budget"
          type="number"
          placeholder="e.g $590,$990"
          className={`py-3 px-2 rounded border-2 outline-none bg-slate-100 text-teal-700 focus:border-green-900 duration-300 ${
            emptyFields?.includes("budget") ? "border-rose-600/50" : "border-2"
          }`}
        />

        <label
          htmlFor="manager"
          className="text-black/70 text-xl font-semibold tracking-widest"
        >
          Manager
        </label>
        <input
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          id="manager"
          type="text"
          placeholder="e.g Jon smit"
          className={`py-3 px-2 rounded border-2 outline-none bg-slate-100 text-teal-700 focus:border-green-900 duration-300 ${
            emptyFields?.includes("manager") ? "border-rose-600/50" : "border-2"
          }`}
        />

        <label
          htmlFor="duration"
          className="text-black/70 text-xl font-semibold tracking-widest"
        >
          Duration
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          id="duration"
          type="number"
          placeholder="e.g 3hours"
          className={`py-3 px-2 rounded border-2 outline-none bg-slate-100 text-teal-700 focus:border-green-900 duration-300 ${
            emptyFields?.includes("duration")
              ? "border-rose-600/50"
              : "border-2"
          }`}
        />
        <label
          htmlFor="developers"
          className="text-black/70 text-xl font-semibold tracking-widest"
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          id="developers"
          type="number"
          placeholder="e.g 2,3,9"
          className={`py-3 px-2 rounded border-2 outline-none bg-slate-100 text-teal-700 focus:border-green-900 duration-300 ${
            emptyFields?.includes("dev") ? "border-rose-600/50" : "border-2"
          }`}
        />
      </div>
      <div className="py-5">
        <button
          type="submit"
          className="btn btn-primary w-full py-4 text-center rounded"
        >
          {project ? "Update now" : "Add project"}
        </button>
      </div>
      {error && (
        <p className="p-5 border border-rose-700 bg-rose-300 rounded text-rose-700">
          {error}
        </p>
      )}
    </form>
  );
};

export default ProjectForm;
