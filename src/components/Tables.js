import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Card, Tab, Tabs } from "@material-ui/core";
import TabPanel from "./tabs/TabPanel";
import DataTable from "./tables/DataTable";
import AddTableModal from "./tables/AddTableModal";
import DeleteTableModal from "./tables/DeleteTableModal";

export const Tables = ({
  projectId,
  projectData,
  setProjectId,
  reloadData,
}) => {
  const history = useHistory();
  let tableNames = [],
    headers = [];

  const [value, setValue] = useState(0);
  const [addTableOpen, setAddTableOpen] = useState(false);
  const [deleteTableOpen, setDeleteTableOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
    <>
      {projectId === "" ? null : (
        <>
          <AddTableModal
            projectId={projectId}
            addTableOpen={addTableOpen}
            setAddTableOpen={setAddTableOpen}
            reloadData={reloadData}
          />
          <DeleteTableModal
            projectId={projectId}
            projectData={projectData}
            deleteTableOpen={deleteTableOpen}
            setDeleteTableOpen={setDeleteTableOpen}
          />
          {segregateData()}

          <Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{ mx: 1 }}
                color="primary"
                variant="contained"
                onClick={() => setAddTableOpen(true)}
              >
                Add
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setDeleteTableOpen(true)}
              >
                Delete
              </Button>
            </Box>
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
                  <DataTable
                    projectId={projectId}
                    tableData={projectData.tables[index]}
                    tableIndex={index}
                    projectData={projectData}
                  />
                </Box>
              </TabPanel>
            ))}
          </Card>
        </>
      )}
    </>
  );
};
