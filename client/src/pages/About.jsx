const About = () => {
  return (
    <div className="p-5 md:p-10 text-xl">
      <h1 className="text-4xl mb-5">About Real-estate</h1>
      <p>
        Real-estate is a website that allows you to search for properties for{' '}
        <span className="uppercase italic">sale</span> or{' '}
        <span className="uppercase italic">rent</span>.
      </p>
      <p>
        It is built using the MERN stack (MongoDB, Express, React, Node.js).
      </p>

      <h2 className="text-xl text-gray-700 mt-5 underline uppercase font-bold">
        Features
      </h2>
      <ul className="list-disc ml-5">
        <li>Search for properties for sale or rent</li>
        <li>View details of a property</li>
        <li>Register an account</li>
        <li>Log in to your account</li>
        <li>Post a property for sale or rent</li>
        <li>Edit or delete your property</li>
        <li>View your properties</li>
      </ul>

      <h2 className="text-xl text-gray-700 mt-5 underline uppercase font-bold">
        Technologies
      </h2>
      <ul className="list-disc ml-5">
        <li>React</li>
        <li>React Router</li>
        <li>Tailwind CSS</li>
        <li>Swiper</li>
        <li>Redux</li>
        <li>Redux Toolkit</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>MongoDB</li>
        <li>Mongoose</li>
        <li>Firebase</li>
        <li>JSON Web Token</li>
        <li>bcrypt</li>
        <li>axios</li>
        <li>react-icons</li>
        <li>react-toastify</li>
      </ul>

      <h2 className="text-xl text-gray-700 mt-5 underline uppercase font-bold">
        APIs
      </h2>
      <p>No external APIs</p>

      <h2 className="text-xl text-gray-700 mt-5 underline uppercase font-bold">
        Third-party libraries
      </h2>
      <ul className="list-disc ml-5">
        <li>Swiper</li>
        <li>React Toastify</li>
        <li>React Icons</li>
        <li>Redux persist</li>
      </ul>

      <h2 className="text-xl text-gray-700 mt-5 underline uppercase font-bold">
        Deployment
      </h2>
      <ul className="list-disc ml-5">
        <li>Render</li>
      </ul>

      <h2 className="text-xl text-gray-700 mt-5 underline uppercase font-bold">
        Source code
      </h2>
      <p>
        Source code is available on{' '}
        <a
          href="https://github.com/zakisudev/real-estate-mern-app"
          className="font-bold text-blue-700 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        .
      </p>

      <h2 className="text-xl text-gray-700 mt-5 underline uppercase font-bold">
        Author
      </h2>
      <p>
        <a href="https://zakisu.tech">Zekaria Hussien</a>
      </p>
    </div>
  );
};

export default About;
