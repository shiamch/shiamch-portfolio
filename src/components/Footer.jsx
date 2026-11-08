/**
 * Site footer with a copyright line that always shows the current year.
 * @returns {JSX.Element}
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>© {year} Shiam Chowdhury</p>
    </footer>
  );
};

export default Footer;
