const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routes/userRoutes");
const subjectRouter = require("./src/routes/subjectRoutes");
const standardRouter= require("./src/routes/standardRoutes");
const sectionRouter=require("./src/routes/sectionRoutes");
const scheduleRouter=require("./src/routes/scheduleRoutes");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter); 
app.use("/subject", subjectRouter);
app.use("/standard",standardRouter);
app.use("/section",sectionRouter);
app.use("/schedule",scheduleRouter);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});