import React from 'react';

import TodoList from './components/TodoList';

import { GlobalContainer } from './components/Global.styles';

function App() {
  return (
    <GlobalContainer>
      <TodoList/>
    </GlobalContainer>
  );
}

export default App;
