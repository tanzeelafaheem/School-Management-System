const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const subjectRouter = require("./routes/subjectRoutes");
const standardRouter= require("./routes/standardRoutes");
const sectionRouter=require("./routes/sectionRoutes");
const scheduleRouter=require("./routes/scheduleRoutes");
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