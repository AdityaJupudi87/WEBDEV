import React from 'react';
import ToDoList from './ToDoList';
import { TaskProvider } from './TaskContext';  

function App() {
    return (
        <TaskProvider>
            <ToDoList />
        </TaskProvider>
    );
}

export default App;