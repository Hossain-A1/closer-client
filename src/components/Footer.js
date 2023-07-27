import emailjs from "@emailjs/browser";
import { useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
const Footer = () => {
  const formRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.EMAIL_JS_SERVICE,
        process.env.EMAIL_JS_TEMPLATE,
        formRef.current,
        process.env.EMAIL_JS_USER
      )
      .then(
        () => {
          console.log("send message");
        },
        () => {
          console.log("message faild");
        }
      );
    //reset fromFields
    e.target.querySelector(".email").value = "";
  };

  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
      </div>
      <div>
        <span className="footer-title">Newsletter</span>
        <form ref={formRef} onSubmit={sendEmail} className="form-control w-80">
          <label className="label" htmlFor="email">
            <span className="label-text">Enter your email address</span>
          </label>
          <div  className="relative form" >
            <input
              type="email"
              id="email"
              placeholder="username@site.com"
              name="email"
              className="input input-bordered w-full pr-16 email"
              required
            />
            <button
              type="sub"
              className="btn btn-neutral absolute top-0 right-0 rounded-l-none"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
