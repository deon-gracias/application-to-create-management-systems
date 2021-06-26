import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { Formik } from "formik";
import { db } from "../../helper/firebase";

const Form = ({ projectData, tableIndex, headers, projectId, reloadData }) => {
  const [fields, setFields] = useState({});

  useEffect(() => {
    headers.map((headers) => {
      let temp = fields;
      temp[headers] = "";
      setFields(temp);
    });
  }, [headers]);

  return (
    <Formik
      initialValues={fields}
      onSubmit={(values) => {
        let lastIndexArray = Object.entries(
          projectData.tables[tableIndex].data
        ).slice(-1);
        let lastIndex = parseInt(lastIndexArray[0]) || 0;

        let data = [];
        Object.values(values).forEach((val) => data.push(val));
        projectData.tables[tableIndex].data[++lastIndex] = data;
        db.collection("projects").doc(projectId).set(projectData);
        alert("Data Inserted");
        reloadData();
      }}
    >
      {({ handleBlur, handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            direction="column"
            justify="center"
            alignItems="center"
          >
            {headers.map((header, index) => (
              <Grid item>
                <TextField
                  name={header}
                  label={header}
                  variant="outlined"
                  value={values[index]}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
            ))}
            <Grid item>
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default Form;
