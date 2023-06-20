import { useState } from "react";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [budget, setBudget] = useState("");
  const [manager, setManager] = useState("");
  const [dev, setDev] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);

  const handleProjectForm = async (e) => {
    e.preventDefault();
    //post req

    const project = { title, tech, budget, manager, dev, duration };

    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    // res ok
    if (res.ok) {
      setTitle("");
      setTech("");
      setBudget("");
      setManager("");
      setDev("");
      setDuration("");
      console.log("A new project added");
      setError(null);
    }
  };

  return (
    <form onSubmit={handleProjectForm} className="lg:px-0 px-3">
      <h2 className="text-3xl text-teal-700 capitalize">Add a new project</h2>
      <div className="flex flex-col space-y-2 mt-2">
        <label
          htmlFor="title"
          className="text-black text-xl font-semibold tracking-widest cursor-pointer"
        >
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          id="title"
          type="text"
          placeholder="e.g E-shop"
          className="py-3 px-2  border-2 outline-none bg-slate-100 text-teal-700 focus:border-teal-700 duration-300"
        />

        <label
          htmlFor="tech"
          className="text-black text-xl font-semibold tracking-widest"
        >
          Tech
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          required
          id="tech"
          type="text"
          placeholder="e.g react,node, etc"
          className="py-3 px-2 border-2 outline-none bg-slate-100 text-teal-700 focus:border-teal-700 duration-300"
        />

        <label
          htmlFor="budget"
          className="text-black text-xl font-semibold tracking-widest"
        >
          Budget
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          id="budget"
          type="number"
          placeholder="e.g $590,$990"
          className="py-3 px-2 border-2 outline-none bg-slate-100 text-teal-700 focus:border-teal-700 duration-300"
        />

        <label
          htmlFor="manager"
          className="text-black text-xl font-semibold tracking-widest"
        >
          Manager
        </label>
        <input
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          required
          id="manager"
          type="text"
          placeholder="e.g Jon smit"
          className="py-3 px-2 border-2 outline-none bg-slate-100 text-teal-700 focus:border-teal-700 duration-300"
        />

        <label
          htmlFor="developers"
          className="text-black text-xl font-semibold tracking-widest"
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          required
          id="developers"
          type="number"
          placeholder="e.g 2,3,9"
          className="py-3 px-2 border-2 outline-none bg-slate-100 text-teal-700 focus:border-teal-700 duration-300"
        />

        <label
          htmlFor="duration"
          className="text-black text-xl font-semibold tracking-widest"
        >
          Duration
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          id="duration"
          type="number"
          placeholder="e.g 3hours"
          className="py-3 px-2  border-2 outline-none bg-slate-100 text-teal-700 focus:border-teal-700 duration-300"
        />
      </div>
      <div className="mt-5">
        <button
          type="submit"
          className="py-3 rounded  px-2 w-full bg-teal-600 hover:bg-teal-700 duration-300 text-white font-semibold uppercase text-sm tracking-widest"
        >
          Add project
        </button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

export default ProjectForm;
