import * as enrollmentsDao from './dao.js';

export default function EnrollmentsRoute(app) {
  // Route to enroll a user in a course
  app.post('/api/enrollments/enroll', async (req, res) => {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      return res.status(400).json({ error: 'User ID and Course ID are required.' });
    }
    try {
      enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.status(200).json({ message: 'User enrolled successfully.' });
    } catch (error) {
      console.error('Enrollment Error:', error);
      res.status(500).json({ error: 'Failed to enroll user.' });
    }
  });

  app.post('/api/enrollments/unenroll', async (req, res) => {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({ error: 'User ID and Course ID are required.' });
    }

    try {
      enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.status(200).json({ message: 'User unenrolled successfully.' });
    } catch (error) {
      console.error('Unenrollment Error:', error);
      res.status(500).json({ error: 'Failed to unenroll user.' });
    }
  });

  // Route to get all enrollments for a specific user
  app.get('/api/enrollments/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const enrollments = enrollmentsDao.getEnrollments(userId);
      res.status(200).json(enrollments);
    } catch (error) {
      console.error('Get Enrollments Error:', error);
      res.status(500).json({ error: 'Failed to retrieve enrollments.' });
    }
  });
}
