import {useState} from "react"
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const {signup,error} = useSignup()

  const handleSignup = async (e)=>{
    e.preventDefault()

    // signup user
await signup(username,email,password)

  }

  return (
    <form onSubmit={handleSignup} className="signup flex flex-col lg:w-[30vw] w-full lg:px-0 px-2 container mx-auto py-10 gap-5">
      <h2 className="text-xl text-teal-700 font-semibold">
        Signup
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-slate-500 font-medium text-lg">Username</label>
        <input
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
          type="text"
          id="username"
          placeholder="e-g, hossainNur"
          className="py-3 px-6 outline-none border focus:border-teal-700 duration-300 bg-slate-200 rounded"
        />
        <label htmlFor="email" className="text-slate-500 font-medium text-lg">Email</label>
        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="e-g, hossain@react.dev"
          className="py-3 px-6 outline-none border focus:border-teal-700 duration-300 bg-slate-200 rounded"
        />
        <label htmlFor="password" className="text-slate-500 font-medium text-lg">Password</label>
        <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="e-g, Ab*********34"
          className="py-3 px-6 outline-none border focus:border-teal-700 duration-300 bg-slate-200 rounded"
        />
      </div>
      <button
        type="submit"
        className="btn  btn-primary"
      >
        signup
      </button>
      {error && (
        <p className="p-5 border border-rose-700 bg-rose-300 rounded text-rose-700">
          {error}
        </p>
      )}
    </form>
  );
};

export default Signup;
