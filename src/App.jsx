import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

/**
 * Root component: lays out the header, main content and footer.
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
};

export default App;
