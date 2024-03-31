import { Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./AppPage.css";
import { getIcon } from "../../utils/utils.tsx";
import { Card } from "../../components/common/Card/Card.tsx";
import { useEffect, useState } from "react";
import { API, todoistApi } from "../../services/api.ts";
import { Task } from "@doist/todoist-api-typescript";
import _ from "lodash";
import { CustomDialog } from "../../components/common/Dialog/CustomDialog.tsx";
import { toast } from "react-toastify";

const EXAMPLE_TASK = {
  id: "7636316959",
  assignerId: null,
  assigneeId: null,
  projectId: "2327599190",
  sectionId: "146026610",
  parentId: null,
  order: 1,
  content: "Еженедельный обзор задач и целей",
  description: "",
  isCompleted: false,
  labels: [],
  priority: 2,
  commentCount: 0,
  creatorId: "47961453",
  createdAt: "2024-01-26T21:09:21.467152Z",
  due: {
    date: "2024-03-31",
    string: "ev sun",
    lang: "en",
    isRecurring: true,
  },
  url: "https://todoist.com/showTask?id=7636316959",
  duration: null,
};

export function AppPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [openDlg, setOpenDlg] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  async function loadTasks() {
    setLoadingTasks(true);
    try {
      await API.getTasks().then(setTasks);
    } catch (e) {
      console.log(e);
    }
    setLoadingTasks(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    console.log("FireStore tasks", tasks);
  }, [tasks]);

  const testCards = tasks.map((task, i) => (
    <Card
      key={i}
      title={"Task " + task.id}
      size="medium"
      loading={loadingTasks}
      onClick={() => {
        navigate("#" + i);
      }}
    >
      <Typography variant="body1">{task.content}</Typography>
      {task.due?.date && <Typography variant="body1">{task.due.date}</Typography>}
      <div>{JSON.stringify(task, null, 2)}</div>
    </Card>
  ));

  const handleAddTask = async (task: Task) => {
    try {
      await API.addTask(task);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setOpenDlg(true);
  };

  const clearDb = async () => {
    toast.info("Tasks cleared");
    try {
      await API.clearTasks();
      setTasks([]);
      toast("Tasks cleared");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSync = async () => {
    console.log("sync");
    setSyncing(true);
    try {
      const todoistTasks = await todoistApi.getTasks();
      console.log("todoist tasks", todoistTasks);
      const tasks = await API.getTasks();
      console.log("firebase tasks", tasks);
      // compare todoistTasks with tasks, add new tasks, update existing tasks
      const todoistTaskIds = todoistTasks.map((task) => task.id);
      const taskIds = tasks.map((task) => task.id);
      const newTasks = todoistTasks.filter(
        (task) => !taskIds.includes(task.id)
      );
      const completedTasks = tasks.filter(
        (task) => !todoistTaskIds.includes(task.id)
      );
      let updatedTasks: Task[] = [];
      tasks.forEach((task) => {
        const todoistTask = todoistTasks.find((t) => t.id === task.id);
        if (todoistTask && !_.isEqual(task, todoistTask)) {
          updatedTasks.push(todoistTask);
        }
      });
      console.log("newTasks", newTasks);
      console.log("updatedTasks", updatedTasks);
      console.log("completedTasks", completedTasks);
      const recurringTasks = tasks.filter((task) => task.due?.isRecurring);
      console.log("recurringTasks", recurringTasks);
      // if reccuring task's due.date in todoist has changed, save old task with new id = `${}`

      // adding new tasks
      newTasks.forEach((task) => handleAddTask(task));
      // updating existing tasks
      updatedTasks.forEach((task) => API.updateTask(task.id, task));
      // marking completed tasks by isCompleted = true
      completedTasks.forEach((task) =>
        API.updateTask(task.id, { ...task, isCompleted: true })
      );
      // TODO recurring tasks

      loadTasks();
    } catch (error) {
      console.log(error);
    }
    console.log("end sync");
    setSyncing(false);
  };

  return (
    <div className="app-page">
      <AppBar />
      <CustomDialog
        open={openDlg}
        setOpen={setOpenDlg}
        onAgree={clearDb}
        content="Are you sure you want to clear the database?"
      />
      <div className="app">
        <div>
          <div className="cards">
            <Card
              title="Tasks total"
              loading={loadingTasks}
              onClick={() => navigate("#mrr")}
              style={{
                color: "white",
                backgroundColor: "var(--pakistan-green)",
              }}
            >
              <Typography variant="h4">{tasks.length}</Typography>
            </Card>
            <Card
              title="Active tasks"
              loading={loadingTasks}
              onClick={() => navigate("#active-customers")}
              style={{ backgroundColor: "var(--earth-yellow)" }}
            >
              <Typography variant="h4">
                {tasks.filter((t) => !t.isCompleted).length}
              </Typography>
            </Card>
            <Card
              title="Completed tasks"
              loading={loadingTasks}
              onClick={() => navigate("#customers")}
              style={{ backgroundColor: "var(--cornsilk)" }}
            >
              <Typography variant="h4">
                {tasks.filter((t) => t.isCompleted).length}
              </Typography>
            </Card>
            <Card
              title="Test add task"
              loading={loadingTasks}
              onClick={() => handleAddTask(EXAMPLE_TASK)}
              style={{ backgroundColor: "var(--tigers-eye)" }}
            >
              <Typography variant="h4">2%</Typography>
            </Card>
            <Card
              title="Sales"
              size="medium"
              loading={loadingTasks}
              onClick={() => navigate("#sales")}
            >
              <Typography variant="h4">One column card</Typography>
            </Card>
            <Card
              title="Trend"
              loading={loadingTasks}
              size="large"
              onClick={() => navigate("#trend")}
            >
              <Typography variant="h4">2%</Typography>
            </Card>
            {/* <div className="cards-container-1">{testCards}</div> */}
            {testCards}
          </div>
        </div>
      </div>
    </div>
  );

  function AppBar() {
    return (
      <div className="top-bar row">
        <div className="top-bar-left row">
          <Typography
            variant="h5"
            className="app-title"
            paddingLeft={2}
            paddingRight={6}
            fontWeight={"bold"}
            onClick={() => navigate("/app")}
          >
            Todoist Analyzer
          </Typography>
          <div className="pages row">
            <Button className="page-link" onClick={() => navigate("/app")}>
              App
            </Button>
            <Button
              className="page-link"
              onClick={() => navigate("/analytics")}
            >
              Analytics
            </Button>
          </div>
        </div>
        <div className="actions row">
          <IconButton onClick={handleClear}>
            {getIcon("delete", false, { color: "var(--tigers-eye)" })}
          </IconButton>
          <IconButton
            onClick={handleSync}
            className={`${syncing ? "spin-animation" : ""}`}
          >
            {getIcon("sync", false, { color: "var(--C-BLACK)" })}
          </IconButton>
          <IconButton onClick={() => navigate("/")}>
            {getIcon("home", false, { color: "var(--C-BLACK)" })}
          </IconButton>
        </div>
      </div>
    );
  }
}
