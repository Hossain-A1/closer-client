import { currencyCvt } from "../utils/currencyConverter";

const ProjectsItems = ({ project }) => {
  return (
    <div className=" flex flex-col gap-5 bg-slate-300 p-3 shadow-lg rounded lg:w-[20rem] w-full ">
      <div className="top">
        <span className="text-teal-700 text-sm">
          <span className="text-black text-sm font-bold">ID:</span>{" "}
          {project._id}
        </span>
        <p className="text-2xl capitalize text-teal-700 font-semibold">
          <span className="text-black text-sm font-bold">Title:</span>{" "}
          {project.title.substring(0, 22)}..
        </p>
        <p className="text-sm text-slate-600 font-medium tracking-widest">
          <span className="text-black text-sm font-bold">Tech:</span>{" "}
          {project.tech}
        </p>
      </div>

      <div className="mid flex justify-between gap-5">
        <div className="left flex flex-col">
          <span className="text-rose-700 text-sm font-bold">
            {" "}
            <span className="text-black text-sm font-bold">Budget:</span>{" "}
            {currencyCvt(project.budget)}
          </span>
          <span className="text-teal-700 text-sm font-bold">
            {" "}
            <span className="text-black text-sm font-bold">Added on:</span>{" "}
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <span className="text-teal-700 text-sm font-bold">
            <span className="text-black text-sm font-bold">Last updated :</span>
            {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="right">
          <p className="text-teal-700 text-sm font-bold">
            <span className="text-black text-sm font-bold">Manager:</span>
            {project.manager.substring(0,8)}
          </p>
          <p className="text-teal-700 text-sm font-bold">
            {" "}
            <span className="text-black text-sm font-bold">Developers:</span>
            {project.dev}
          </p>
          <span className="text-teal-700 text-sm font-bold">
            <span className="text-black text-sm font-bold">Duration:</span>
            {`${project.duration}week${project.duration === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>
      <div className="bottom flex justify-between items-center">
        <button className="py-2 px-6 bg-teal-600 hover:bg-teal-700 duration-300 rounded uppercase text-sm text-white font-semibold">
          Update
        </button>
        <button className="py-2 px-6 bg-teal-600 hover:bg-teal-700 duration-300 rounded uppercase text-sm text-rose-900 font-semibold">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectsItems;
