import LearningPath from "@components/learning-path";
import { Teacher, User } from "@types";
import { useEffect, useState } from "react";

type Props = {
  teachers: Teacher[];
};

const TeacherOverview: React.FC<Props> = ({ teachers }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
  }, []);

  return (
    <>
      <section className="mt-5">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Learning path</th>
            </tr>
          </thead>
          <tbody>
            {teachers &&
              loggedInUser?.role !== "admin" &&
              teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    {teacher.user.lastName} {teacher.user.firstName}
                  </td>
                  <td>{teacher.learningPath}</td>
                </tr>
              ))}
            {loggedInUser?.role === "admin" &&
              teachers &&
              teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    {teacher.user.lastName} {teacher.user.firstName}
                  </td>
                  <td>
                    {
                      <LearningPath
                        teacherId={teacher.user.id}
                        learningPath={teacher.learningPath}
                      />
                    }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TeacherOverview;
