import TeacherService from "@services/TeacherService";
import { StatusMessage } from "@types";
import { useState } from "react";

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const [selectedLearningPath, setSelectedLearningPath] =
    useState<string>(learningPath);
  const [statusMessage, setStatusMessage] = useState<StatusMessage>();

  const handleLearningPathChange = async (event: {
    target: { value: string };
  }) => {
    const newLearningPath = event.target.value;
    const response = await TeacherService.updateLearningPath(
      teacherId,
      newLearningPath
    );

    if (response.status === 200) {
      setSelectedLearningPath(newLearningPath);
      setStatusMessage({
        type: "success",
        message: `Learning path updated successfully to ${newLearningPath}`,
      });
    } else {
      setStatusMessage({
        type: "error",
        message: "Error updating learning path",
      });
    }
  };

  return (
    <div className="ml-6">
      <select
        id="learningPath"
        className="ml-2 p-1"
        value={selectedLearningPath}
        onChange={handleLearningPathChange}
      >
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
      {/* <div className="status-messages">
        {statusMessage && (
          <div
            className={
              statusMessage.type === "error" ? "text-red-800" : "text-green-800"
            }
          >
            {statusMessage.message}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default LearningPath;
