import React, { useReducer, useState } from 'react';
import { FlatList } from 'react-native'; // for rendering ists
import styled from 'styled-components/native';


interface State {
  todos: string[];
}

// probable actions that can modify state
type Action = 
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; index: number };


const initialState: State = {
  todos: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.index),
      };
    default:
      return state;
  }
}

const TodoApp = () => {
  const [task, setTask] = useState(''); 
  const [state, dispatch] = useReducer(reducer, initialState); 

  // adds task if input is not empty
  const addTask = () => {
    if (task) {
      dispatch({ type: 'ADD_TODO', payload: task }); // action and payload contains data that's used in action
      setTask(''); 
    }
  };

  // removes task based on index
  const removeTask = (index: number) => {
    dispatch({ type: 'REMOVE_TODO', index });
  };

  return (
    <Container>
      <Header>Todo App</Header>

      <StyledInput
        placeholder="Add a new task"
        value={task}
        onChangeText={setTask}
      />

      <StyledButton onPress={addTask}>
        <ButtonText>Add Task</ButtonText>
      </StyledButton>

      <FlatList
        data={state.todos} 
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item, index }) => (
          <TodoItem>
            <TodoText>{item}</TodoText>
            <StyledButton onPress={() => removeTask(index)}>
              <ButtonText>Remove</ButtonText>
            </StyledButton>
          </TodoItem>
        )}
      />
    </Container>
  );
};

//Using Styled Components
const Container = styled.View
`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Header = styled.Text
`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const StyledInput = styled.TextInput
`
  height: 40px;
  border: 1px solid #ccc;
  margin-bottom: 8px;
  padding-left: 8px;
  border-radius: 5px;
  background-color: #fff;
`;

// it responds to touches
const StyledButton = styled.TouchableOpacity
`
  background-color: #007bff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text
`
  color: white;
  font-weight: bold;
`;

const TodoItem = styled.View
`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-color: #ddd;
  border-radius: 5px;
  margin-bottom: 8px;
`;

const TodoText = styled.Text
`
  font-size: 16px;
`;

export default TodoApp;