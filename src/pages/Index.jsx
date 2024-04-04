import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Text, Button, Input, Checkbox, Heading, Flex, Spacer, Icon } from "@chakra-ui/react";
import { FaCheckCircle, FaPlus, FaTasks } from "react-icons/fa";

const TaskItem = ({ task, onComplete }) => (
  <HStack p={4} w="full" justifyContent="space-between">
    <Checkbox onChange={() => onComplete(task.id)} isChecked={task.isComplete} />
    <Text flex={1} textDecoration={task.isComplete ? "line-through" : "none"}>
      {task.content}
    </Text>
  </HStack>
);

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;
    const newTask = {
      id: Date.now(),
      content: inputValue,
      isComplete: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isComplete: !task.isComplete } : task)));
  };

  return (
    <ChakraProvider>
      <Box bg="gray.100" minH="100vh">
        <Flex bg="blue.500" p={4} color="white" alignItems="center">
          <Icon as={FaTasks} w={8} h={8} />
          <Heading size="md" ml={2}>
            Task Manager
          </Heading>
          <Spacer />
          <Button leftIcon={<FaPlus />} onClick={handleAddTask} colorScheme="teal">
            Add Task
          </Button>
        </Flex>
        <VStack spacing={4} align="stretch" m={4}>
          <HStack>
            <Input placeholder="Enter a task..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
            <Button leftIcon={<FaPlus />} onClick={handleAddTask} colorScheme="teal">
              Add
            </Button>
          </HStack>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onComplete={handleCompleteTask} />
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
