import ReactDOM from "react-dom/client";
import App from "./App";
// import '../public/index.html';

export default function Main() {
  return (
      <App/>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);