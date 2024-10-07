import React from "react";

function About() {
  return (
    <>
    <div id="about" className="">
      <p className="text-4xl font-semibold text-center text-[#E96429] mt-5" data-aos="zoom-in">
        About Me
      </p>
      <div className="h-[60vh] w-[50%] border-b rounded-lg p-5 bg-[#ffffff] m-auto text-center mt-3">
        <p className="text-3xl text-center mb-5 " data-aos="fade-down">Full Stack Developer</p>

        <p className="text-lg" data-aos="zoom-in">
          {" "}
          I am a passionate Full stack developer proficient in both frontend and
          backend development. With expertise in MongoDB, Express.js, React.js,
          and Node.js, I specialize in crafting robust and scalable web
          applications. My approach combines creativity with technical
          excellence to deliver seamless user experiences and efficient backend
          solutions. As a dedicated learner, I constantly strive to stay updated
          with the latest technologies and industry trends to push the
          boundaries of innovation. Let's collaborate to build the next
          generation of web experiences together.
        </p>
        <button className="border  h-[50px] w-[120px] p-1 rounded-lg text-[#E96429] hover:bg-[#E96429] hover:text-white text-lg font-semibold" data-aos="fade-up">
          Hire Me
        </button>
        <button className="border  h-[50px] w-[150px] ms-2 mt-2 p-1 rounded-lg text-[#E96429] hover:bg-[#E96429] hover:text-white text-lg font-semibold" data-aos="fade-down">
          Download CV
        </button>
      </div>
      </div>
    </>
  );
}

export default About;
