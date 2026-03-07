import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main className="min-h-screen flex flex-col justify-between px-6 py-10">

      {/* Center Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-xl">

          <div className="flex items-center gap-4 mb-10 select-none cursor-default">
            <img
              src="/hey.png"
              alt="Photo of Keni Menchavez"
              draggable="false"
              className="w-[52px] h-[52px] rounded-full object-cover object-[center_1%] pointer-events-none"
            />

            <div>
              <h1 className="text-xs md:text-lg tracking-tight leading-none mb-1">
                Keni Menchavez
              </h1>

              <h2 className="text-xs md:text-lg tracking-tight">
                SaaS Specialist
              </h2>
            </div>
          </div>

          <p className="text-xs md:text-lg paragraph mb-5">
            Experienced in implementing platforms and integrations,
            translating business requirements into working systems.
          </p>

          <p className="text-xs md:text-lg paragraph mb-5">
            Currently continuing to build my skills in development,
            automation, and system design, with the goal of growing into a{" "}
            <span className="highlight">Solutions Architect</span>{" "}
            role and designing scalable solutions that solve real business
            problems.
          </p>

          <p className="text-xs md:text-lg paragraph mb-10">
            For collaborations, reach at{" "}
            <a href="mailto:kenimenchavez@gmail.com">
              kenimenchavez@gmail.com
            </a>
          </p>

          <p className="text-xs md:text-lg paragraph">
            Projects section coming soon..
          </p>

        </div>
      </div>

      <footer className="w-full max-w-xl mx-auto flex items-center justify-between text-xs md:text-sm mt-10">
        <span>© 2026 Keni</span>

        <button onClick={toggleTheme}>
          {theme === "dark" ? "Dark" : "Light"}
        </button>
      </footer>

    </main>
  );
}

export default App;