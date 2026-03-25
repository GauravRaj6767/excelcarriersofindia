import { ThemeProvider, useTheme } from "./lib/ThemeContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero/Hero";
import { About } from "./components/sections/About/About";
import { Services } from "./components/sections/Services/Services";
import { WhyUs } from "./components/sections/WhyUs/WhyUs";
// import { Clients } from "./components/sections/Clients/Clients";
import { Contact } from "./components/sections/Contact/Contact";

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        {/* <Clients /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
