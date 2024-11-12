import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsdao from "../Assignments/dao.js";

export default function CourseRoutes(app) {


  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    dao.updateCourse(courseId, courseUpdates);
    res.sendStatus(204);
  });


  //Modules
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });


  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });


  //Assignments
app.get("/api/courses/:courseId/assignments", (req, res) => {
  const { courseId } = req.params;
  const assignments = assignmentsdao.findAssignmentsForCourse(courseId);
  res.json(assignments);
});

app.post("/api/courses/:courseId/assignments", (req, res) => {
  const { courseId } = req.params;
  const assignment = {
    ...req.body,
    course: courseId,
  };
  const newAssignment = assignmentsdao.createAssignment(assignment);
  res.send(newAssignment);
});


  // Route to enroll a user in a course
  app.get("/api/users/:userId/courses", (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  });
}





