import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Card, Tab, Tabs } from "@material-ui/core";
import TabPanel from "./tabs/TabPanel";
import DataTable from "./tables/DataTable";
import AddTableModal from "./tables/AddTableModal";
import DeleteTableModal from "./tables/DeleteTableModal";
import { auth } from "../helper/firebase";

export const Tables = ({
  projectId,
  projectData,
  setProjectId,
  reloadData,
}) => {
  const history = useHistory();

  const [value, setValue] = useState(0);
  const [addTableOpen, setAddTableOpen] = useState(false);
  const [deleteTableOpen, setDeleteTableOpen] = useState(false);

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

  return (
    <>
      {checkAuthAndDetails()}
      {projectId === "" ? null : (
        <>
          <AddTableModal
            projectId={projectId}
            projectData={projectData}
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
              {projectData.tables.map((table, index) => (
                <Tab label={table.name} key={`tab${index}`} />
              ))}
            </Tabs>
            {projectData.tables.map((table, index) => (
              <TabPanel value={value} index={index} key={`tab-panel${index}`}>
                <Box>
                  <DataTable
                    projectId={projectId}
                    tableData={table}
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
