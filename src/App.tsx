import "./scss/App.scss";

import TodoInternal from "./components/TodoInternal";

function App() {
  return (
    <>
      <div className="container-md">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="display-3">Todo App</div>
          </div>
          <div className="col-4"></div>
        </div>
        <TodoInternal />
      </div>
    </>
  );
}

export default App;
