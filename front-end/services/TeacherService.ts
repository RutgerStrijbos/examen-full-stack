const getToken = (): string => {
  const loggedInUserString = sessionStorage.getItem("loggedInUser");
  console.log(loggedInUserString);
  return loggedInUserString ? JSON.parse(loggedInUserString).token : "";
};

const getAllTeachers = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/teachers");
  /*
    Call the back-end API on the route /teachers to get all teachers.
    You will need to implement that route in the back-end.
  */
};

const updateLearningPath = (teacherId: number, learningPath: string) => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL + `/teachers/${teacherId}/learningpath`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ learningPath }),
    }
  );
  /*
    Call the back-end API on the route /teachers/:id/learningpath to update the learning path for the teacher.
    You will need to implement that route in the back-end.
  */
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
