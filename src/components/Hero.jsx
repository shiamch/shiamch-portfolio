/**
 * Intro section showing my name, role and a link to my work.
 * @returns {JSX.Element}
 */
const Hero = () => {
  const name = "Shiam Chowdhury";
  const role = "Frontend Developer";

  return (
    <section>
      <h1>Hi, I'm {name}</h1>
      <p>{role}</p>
      <a href="#projects">View my work</a>
    </section>
  );
};

export default Hero;
