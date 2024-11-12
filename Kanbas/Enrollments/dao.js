import Database from "../Database/index.js";


export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}


export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.user !== userId || enrollment.course !== courseId
  );
}

export function getEnrollments(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

// export function createModule(module) {
//   const newModule = { ...module, _id: Date.now().toString() };
//   Database.modules = [...Database.modules, newModule];
//   return newModule;
// }

// export function deleteModule(moduleId) {
//   const { modules } = Database;
//   Database.modules = modules.filter((module) => module._id !== moduleId);
//  }