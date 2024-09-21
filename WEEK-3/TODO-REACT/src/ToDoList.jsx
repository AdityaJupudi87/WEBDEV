import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TaskContext } from './TaskContext';

const Container = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const TaskList = styled.ol`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TaskText = styled.span`
  flex: 1;
`;

const TaskButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function ToDoList() {
  const { tasks, addTask, deleteTask, moveTaskUp, moveTaskDown } = useContext(TaskContext);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    addTask(newTask);
    setNewTask('');
  };

  return (
    <Container>
      <h1>To-Do List</h1>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddTask}>Add</Button>
      </InputWrapper>
      <TaskList>
        {tasks.map((task, index) => (
          <TaskItem key={index}>
            <TaskText>{task}</TaskText>
            <TaskButton onClick={() => deleteTask(index)}>Delete</TaskButton>
            <TaskButton onClick={() => moveTaskUp(index)}>↑</TaskButton>
            <TaskButton onClick={() => moveTaskDown(index)}>↓</TaskButton>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
}

export default ToDoList;
