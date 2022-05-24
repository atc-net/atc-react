import logo from "./assets/logo.svg";

function App() {
  return (
    <div className="bg-grey-700 ">
      <header className="flex flex-col h-screen w-screen justify-center items-center">
        <img src={logo} className="h-40 w-40 animate-spin-slower" alt="logo" />
        <p></p>
        <a
          className="text-white text-xl mt-9"
          href="https://atc-net.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ATC Net
        </a>
        <a
          className="text-white text-xl"
          href="http://localhost:6006/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Storybook
        </a>
      </header>
    </div>
  );
}

export default App;
