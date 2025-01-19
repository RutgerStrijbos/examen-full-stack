import Header from "@components/header";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import { User } from "@types";
import ClassRoomInput from "@components/classroom/ClassRoomInput";

const Classroom: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
  }, []);

  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Classroom</title>
      </Head>
      <Header />
      <main>
        <section className="flex flex-col justify-center items-center">
          {loggedInUser?.role === "admin" && <ClassRoomInput />}
          {loggedInUser?.role !== "admin" && (
            <p className="text-red-600 text-lg mt-8">
              You are not authorized to view this page.
            </p>
          )}
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

export default Classroom;
