import { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

const modules = [
  {
    id: 1,
    name: "Module 1",
    content: [
      {
        id: 1,
        name: "Content 1",
        content: "This is the content for Module 1, Content 1.",
      },
      {
        id: 2,
        name: "Content 2",
        content: "This is the content for Module 1, Content 2.",
      },
    ],
    assignments: [
      {
        id: 1,
        name: "Assignment 1",
        content: "This is the assignment for Module 1, Assignment 1.",
      },
      {
        id: 2,
        name: "Assignment 2",
        content: "This is the assignment for Module 1, Assignment 2.",
      },
    ],
  },
  {
    id: 2,
    name: "Module 2",
    content: [
      {
        id: 1,
        name: "Content 1",
        content: "This is the content for Module 2, Content 1.",
      },
      {
        id: 2,
        name: "Content 2",
        content: "This is the content for Module 2, Content 2.",
      },
    ],
    assignments: [
      {
        id: 1,
        name: "Assignment 1",
        content: "This is the assignment for Module 2, Assignment 1.",
      },
      {
        id: 2,
        name: "Assignment 2",
        content: "This is the assignment for Module 2, Assignment 2.",
      },
    ],
  },
];

function ModuleTabs() {
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  function handleTabClick(moduleIndex) {
    setSelectedModule(modules[moduleIndex]);
  }

  return (
    <Tabs>
      <TabList>
        {modules.map((module, index) => (
          <Tab key={module.id} onClick={() => handleTabClick(index)}>
            {module.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {selectedModule.content.map((content) => (
          <TabPanel key={content.id}>
            <h2>{content.name}</h2>
            <p>{content.content}</p>
          </TabPanel>
        ))}
        {selectedModule.assignments.map((assignment) => (
          <TabPanel key={assignment.id}>
            <h2>{assignment.name}</h2>
            <p>{assignment.content}</p>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default ModuleTabs;
