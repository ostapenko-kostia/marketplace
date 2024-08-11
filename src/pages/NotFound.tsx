import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="mx-auto w-full px-5 pt-12 flex items-center flex-col">
      <h2 className="text-6xl">404</h2>
      <p className="text-lg text-center">
        Oops... This page doesn't exist.<br className="max-md:inline hidden" /> <Link className="text-aqua" to="/">Return to Home</Link>
      </p>
    </section>
  );
}

export default NotFound;
