import mypic from "../../pic/my.jpg";

function About() {
  return (
    <div className="flex items-center min-h-screen bg-gray-900 text-white p-6">
      {/* Left: Image */}
      <img
        src={mypic}
        alt="My Picture"
        className="w-32 h-32 rounded-full object-cover mr-6 shadow-lg"
      />

      {/* Right: Introduction */}
      <div>
        <h1 className="text-2xl font-bold mb-2">About Me</h1>
        <p className="text-gray-300">
          Hello! My name is CHEN, WEI-JU. I am a passionate developer who loves
          building web applications and exploring new technologies. In my free
          time, I enjoy learning and coding.
        </p>
      </div>
    </div>
  );
}

export default About;
