import ClassroomService from "@services/ClassroomService";
import { StatusMessage } from "@types";
import { useTranslation } from "next-i18next";
import Classroom from "pages/classroom";
import { useState } from "react";

const ClassRoomInput: React.FC = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [statusMessage, setStatusMessage] = useState<StatusMessage>(null);
  const { t } = useTranslation();

  const validate = (): boolean => {
    let result = true;
    if (!name && name.trim() === "") {
      setNameError(t(t("classroom.name-required")));
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setNameError("");
    setStatusMessage(null);

    if (!validate()) {
      return;
    }

    const response = await ClassroomService.addClassroom({ name });
    const createdClassroom = await response.json();

    if (response.status === 200) {
      setStatusMessage({
        type: "success",
        message: `Added classroom with name ${createdClassroom.name} and ID ${createdClassroom.id}`,
      });
      setName("");
    } else {
      setStatusMessage({
        type: "error",
        message: createdClassroom.message,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-1/5 items-left">
        <h1 className="text-left mt-16 mb-5">{t("classroom.title")}</h1>
        {statusMessage && (
          <p
            className={`${
              statusMessage.type === "error" ? "text-red-800" : "text-green-800"
            } text-lg `}
          >
            {statusMessage.message}
          </p>
        )}
        <label
          htmlFor="classroomInput"
          className="text-sm text-blue-950 text-left font-bold mt-3"
        >
          {t("classroom.name")}
        </label>
        <input
          type="text"
          id="classroomInput"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-1/2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block p-2.5 my-2"
        />
        {nameError && <p className="text-red-800">{nameError}</p>}
        <button
          type="submit"
          className=" w-1/4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
        >
          {t("classroom.add")}
        </button>
      </form>
    </>
  );
};

export default ClassRoomInput;
