import React from 'react';
import './App.css';
import UncontrolHome from "./UncontrolHome";
import ControlHome from "./ControlledHome";
import FormDataHome from "./FormDataHome";
import EditableForm from "./EditableForm";
import EditableFormWithToolbar from "./EditableFormWithToolbar";

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <ControlHome />
            <UncontrolHome />
            <FormDataHome />
            <EditableForm />
            <EditableFormWithToolbar />
            <p>Это ~~текст~~ с перечеркнутым словом.</p>

        </header>
    </div>
  );
}

export default App;
