import { useState } from "react";
import moment from "moment";
import { currencyCvt } from "../utils/currencyConverter";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { ProjectForm } from "../components/ProjectForm";
import { useUserContext } from "../hooks/useUserContext";

const ProjectsItems = ({ project }) => {
  const [modal, setModal] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const { dispatch } = useProjectsContext();
  const { user } = useUserContext();
  const deleteProject = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await res.json();
    if (!res.ok) {
      throw Error("Invalid project id.");
    }
    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };

  // update a project
  const updateProject = async () => {
    setModal(true);
    setOverlay(true);
  };

  const handleOverlay = () => {
    setModal(false);
    setOverlay(false);
  };

  return (
    <div className=" flex flex-col gap-5 bg-slate-300 p-3 shadow-lg rounded lg:w-[20rem] w-full ">
      <div className="top">
        <span className=" text-green-900 text-sm">
          <span className="text-black/70 text-sm font-bold">ID:</span>{" "}
          {project._id}
        </span>
        <p className="text-2xl capitalize text-green-900 font-semibold">
          <span className="text-black/70 text-sm font-bold">Title:</span>{" "}
          {project.title.substring(0, 22)}..
        </p>
        <p className="text-sm text-slate-600 font-medium tracking-widest">
          <span className="text-black/70 text-sm font-bold">Tech:</span>{" "}
          {project.tech}
        </p>
      </div>

      <div className="mid flex justify-between gap-5">
        <div className="left flex flex-col">
          <span className="text-rose-700 text-sm font-bold">
            {" "}
            <span className="text-black/70 text-sm font-bold">Budget:</span>{" "}
            {currencyCvt(project.budget)}
          </span>
          <span className=" text-green-900  text-sm font-bold">
            {" "}
            <span className="text-black/70 text-sm font-bold">Added on:</span>{" "}
            {moment(project.createdAt).format("Do MMM, h:mm a")}
          </span>
          <span className=" text-green-900  text-sm font-bold">
            <span className="text-black/70 text-sm font-bold">Last updated :</span>
            {moment(project.updatedAt).format("Do MMM, h:mm a")}
          </span>
        </div>
        <div className="right">
          <p className=" text-green-900  text-sm font-bold">
            <span className="text-black/70 text-sm font-bold">Manager:</span>
            {project.manager.substring(0, 8)}
          </p>
          <p className=" text-green-900  text-sm font-bold">
            {" "}
            <span className="text-black/70 text-sm font-bold">Developers:</span>
            {project.dev}
          </p>
          <span className=" text-green-900  text-sm font-bold">
            <span className="text-black/70 text-sm font-bold">Duration:</span>
            {`${project.duration}week${project.duration === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>
      <div className="bottom flex justify-between items-center">
        <button
          onClick={updateProject}
          className="btn btn-primary"
        >
          Update
        </button>
        <button
          onClick={deleteProject}
          className="btn btn-neutral"
        >
          Delete
        </button>
      </div>

      {/* created overlay*/}
      <div
        onClick={handleOverlay}
        className={`min-h-screen min-w-full bg-gray-900/90 fixed z-[1] top-0 left-0 right-0 bottom-0 ${
          overlay ? "" : "hidden"
        }`}
      ></div>

      {/* create modal */}
      <div
        className={`lg:w-[30rem] w-full min-h-screen px-5 z-[2]  bg-slate-300 absolute lg:top-0 top-[50%] left-1/2 -translate-x-1/2 rounded-lg shadow-lg shadow-teal-100 ${
          modal ? "" : "hidden"
        }`}
      >
        <h2 className="text-3xl  text-green-900  capitalize">Update project</h2>
        <ProjectForm
          project={project}
          setModal={setModal}
          setOverlay={setOverlay}
        />
      </div>
    </div>
  );
};

export default ProjectsItems;
