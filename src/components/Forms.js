import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card, Container, Tab, Tabs } from "@material-ui/core";
import TabPanel from "./tabs/TabPanel";
import Form from "./forms/Form";
import { auth } from "../helper/firebase";

export const Forms = ({ projectId, projectData, reloadData }) => {
  const history = useHistory();
  let tableNames = [],
    headers = [];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function checkAuthAndDetails() {
    if (projectId === "") {
      history.push("/project");
    }
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  }

  function segregateData() {
    if (projectId === "") {
      history.push("/project");
    } else {
      projectData.tables.forEach((table) => {
        tableNames.push(table.name);
        headers.push(table.headers);
      });
    }
  }

  checkAuthAndDetails();
  segregateData();

  return (
    <Card>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tableNames.map((name, index) => (
          <Tab label={name} key={`tab${index}`} />
        ))}
      </Tabs>
      {tableNames.map((name, index) => (
        <TabPanel value={value} index={index} key={`tab-panel${index}`}>
          <Box>
            <Form
              projectId={projectId}
              headers={headers[index]}
              projectData={projectData}
              tableIndex={index}
              reloadData={reloadData}
            />
          </Box>
        </TabPanel>
      ))}
    </Card>
  );
};
