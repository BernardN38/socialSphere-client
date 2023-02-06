import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

export default function Main() {
  return (
      <App/>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);