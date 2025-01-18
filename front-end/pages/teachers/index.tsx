import Header from "@components/header";
import TeacherOverview from "@components/teachers/TeacherOverview";
import TeacherService from "@services/TeacherService";
import { StatusMessage } from "@types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

const Teachers: React.FC = () => {
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const getAllTeachers = async () => {
    const response = await TeacherService.getAllTeachers();
    const teachers = await response.json();

    if (response.status === 200) {
      return teachers;
    }
  };

  const { data, isLoading, error } = useSWR("Teachers", getAllTeachers);

  return (
    <>
      <Head>
        <title>Teachers</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1>Teachers</h1>

        <section className="mt-5">
          {error && <p className="text-danger">{error}</p>}
          {isLoading && <p>Loading...</p>}
          {data && <TeacherOverview teachers={data} />}{" "}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Teachers;
