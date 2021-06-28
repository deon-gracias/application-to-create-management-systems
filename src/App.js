import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/styles.css";
import {
  Login,
  Register,
  Project,
  Dashboard,
  Tables,
  Forms,
  Layout,
} from "./components";
import { auth, db } from "./helper/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [projectId, setProjectId] = useState("");
  const [projectsData, setProjectsData] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  });

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const fetchData = () => {
    db.collection("projects")
      .get()
      .then((querySnapshot) => {
        let projectArray = {};
        querySnapshot.forEach((doc) => {
          if (auth.currentUser.uid === doc.data().uid) {
            projectArray[doc.id] = doc.data();
          }
        });
        setProjectsData(projectArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewProject = (project) => {
    let newProjectId = "";
    db.collection("projects")
      .add(project)
      .then((docRef) => (newProjectId = docRef.id));
    setProjectsData([projectsData, { newProjectId: project }]);
    fetchData();
  };

  return (
    <main>
      <Router>
        <Route exact path="/" component={Login} />
        <Route
          exact
          path="/login"
          render={() => <Login projectId={projectId} />}
        />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/project"
          render={() => (
            <Project
              projectId={projectId}
              setProjectId={setProjectId}
              projectsData={projectsData}
              addNewProject={addNewProject}
              reloadData={fetchData}
            />
          )}
        />
        <Route
          exact
          path="/dashboard"
          render={() => (
            <Layout projectId={projectId}>
              <Dashboard
                projectId={projectId}
                setProjectId={setProjectId}
                projectData={projectsData[projectId]}
                reloadData={fetchData}
              />
            </Layout>
          )}
        />
        <Route
          exact
          path="/tables"
          render={() => (
            <Layout projectId={projectId}>
              <Tables
                projectId={projectId}
                projectData={projectsData[projectId]}
                setProjectId={setProjectId}
                reloadData={fetchData}
              />
            </Layout>
          )}
        />
        <Route
          exact
          path="/forms"
          render={() => (
            <Layout projectId={projectId}>
              <Forms
                projectId={projectId}
                setProjectId={setProjectId}
                projectData={projectsData[projectId]}
                reloadData={fetchData}
              />
            </Layout>
          )}
        />
      </Router>
    </main>
  );
}

export default App;
