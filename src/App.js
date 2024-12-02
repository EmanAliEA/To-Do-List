import "./styles.css";
import { useState } from "react";

export default function App() {
  const [allTasks, setAllTask] = useState([]);
  function handleCheckedItem(id, checked) {
    setAllTask((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, check: !checked } : task
      )
    );
    // console.log(allTasks);
  }
  function handleClear() {
    setAllTask((tasks) => tasks.filter((task) => task.check === false));
  }
  function handleAddItem(item) {
    setAllTask((tasks) => [...tasks, item]);
    console.log(allTasks);
  }
  function handleRemoveItem(id) {
    console.log(id);
    setAllTask((tasks) => tasks.filter((task) => task.id !== id));
  }
  return (
    <div className="App">
      <Header />
      <AddTask handleAddItem={handleAddItem} />
      {allTasks.length > 0 && (
        <Tasks
          tasks={allTasks}
          onClick={handleCheckedItem}
          onClear={handleClear}
          onRemove={handleRemoveItem}
        />
      )}
    </div>
  );
}
function Header() {
  return (
    <div className="header">
      <h2>todo</h2>
    </div>
  );
}
function AddTask({ handleAddItem }) {
  const [newItem, setItem] = useState("");
  function addNewItem(event) {
    if (event.key !== "Enter") return;
    setItem("");
    const Item = { id: Date.now(), name: newItem, check: false };
    handleAddItem(Item);
  }

  return (
    <div className="addTask">
      <input
        type="text"
        placeholder="Create a new todo..."
        value={newItem}
        onChange={(e) => setItem(e.target.value)}
        onKeyDown={addNewItem}
      />
    </div>
  );
}

function Tasks({ tasks, onClick, onClear, onRemove }) {
  const [filter, setFilter] = useState("all");
  function handleFilter(choice) {
    setFilter(choice.toLowerCase());
  }
  return (
    <div className="tasks">
      <ul>
        {filter === "all" &&
          tasks.map((task) => (
            <Item
              task={task}
              handleChecked={onClick}
              key={task.id}
              onRemove={onRemove}
            />
          ))}
        {filter === "active" &&
          tasks
            .filter((fTask) => fTask.check === false)
            .map((task) => (
              <Item
                task={task}
                handleChecked={onClick}
                key={task.id}
                onRemove={onRemove}
              />
            ))}
        {filter === "completed" &&
          tasks
            .filter((fTask) => fTask.check === true)
            .map((task) => (
              <Item
                task={task}
                handleChecked={onClick}
                key={task.id}
                onRemove={onRemove}
              />
            ))}
      </ul>
      <Footer tasks={tasks} handleFilter={handleFilter} handleClear={onClear} />
    </div>
  );
}

function Item({ task, handleChecked, onRemove }) {
  const [checkItem, setCheckItem] = useState(task.check);
  function handleCheckItem(id) {
    setCheckItem((item) => !item);
    handleChecked(id, checkItem);
  }
  return (
    <li>
      <div className="item" onClick={() => handleCheckItem(task.id)}>
        <div className={`check ${checkItem ? "checked" : ""}`}>
          {checkItem ? "✓" : ""}
        </div>
        <p className={checkItem ? "checkText" : ""}>{task.name}</p>
      </div>
      <Button classN="close" handleAction={() => onRemove(task.id)}>
        &times;
      </Button>
    </li>
  );
}

function Footer({ tasks, handleFilter, handleClear }) {
  const leftItems = tasks.filter((item) => item.check === false).length;
  return (
    <div className="footer">
      <p className="numItems">{leftItems} items left</p>
      <div className="btn">
        <Button handleAction={handleFilter}>All</Button>
        <Button handleAction={handleFilter}>Active</Button>
        <Button handleAction={handleFilter}>Completed</Button>
      </div>
      <Button classN="clearBtn" handleAction={handleClear}>
        Clear Completed
      </Button>
    </div>
  );
}
function Button({ children, handleAction, classN }) {
  return (
    <button
      className={classN ? classN : ""}
      onClick={() => handleAction(children)}
    >
      {children}
    </button>
  );
}
