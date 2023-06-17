import React from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import classroom from "/classroom.svg";

const LandingPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section className="mt-24 w-11/12 md:w-5/6 lg:max-w-5xl mx-auto text-center ">
        <img className="inline" src={classroom} alt="" />
        <div>
          <h1 className="mb-4 p-4 text-2xl md:text-3xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-700  to-violet-500">
            MyClassroom
          </h1>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
          Where teaching and learning come together
        </h1>
        <p className="my-8 text-sm md:text-md lg:text-xl">
          MyClassroom is your all-in-one place for teaching and learning. Our
          easy-to-use and secure tool helps educators manage, measure, and
          enrich learning experiences.
        </p>
        <div className="flex flex-row gap-1 items-center justify-center">
          <Link to={"/register"}>
            <button className="text-sm md:text-lg lg:text-xl uppercase border-2 border-blue-700 text-blue-700 rounded-lg p-2 hover:text-slate-50 hover:bg-blue-700 hover:shadow-md">
              Registration Now
            </button>
          </Link>
          <span>OR</span>
          <Link to={"classroom/join"}>
            <button className="text-sm md:text-lg lg:text-xl uppercase border-2 border-blue-700 text-blue-700 rounded-lg p-2 hover:text-slate-50 hover:bg-blue-700 hover:shadow-md">
              Join Classroom
            </button>
          </Link>
        </div>
      </section>

      <section className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-28">
        <div className="flex items-center flex-col border-2 rounded-md hover:shadow-md p-4">
          <img
            src="https://edu.google.com/assets/icons/pages/main/classroom/all-in-one-place.svg"
            alt=""
          />
          <h2 className="text-2xl mb-4">All-in-one place</h2>
          <p className="text-center">
            Bring all your learning tools together and manage multiple classes
            in one central destination.
          </p>
        </div>
        <div className="flex items-center flex-col border-2 rounded-md hover:shadow-md p-4">
          <img
            src="https://edu.google.com/assets/icons/pages/main/classroom/easy-to-use.svg"
            alt=""
          />
          <h2 className="text-2xl mb-4">Easy to use</h2>
          <p className="text-center">
            Anyone in your school community can get up and running with
            Classroom in minutes.
          </p>
        </div>
        <div className="flex items-center flex-col border-2 rounded-md hover:shadow-md p-4">
          <img
            src="https://edu.google.com/assets/icons/pages/main/classroom/built-for-collaboration.svg"
            alt=""
          />
          <h2 className="text-2xl mb-4">Built for collaboration</h2>
          <p className="text-center">
            Work simultaneously in the same document with the whole class or
            connect face-to-face.
          </p>
        </div>
        <div className="flex items-center flex-col border-2 rounded-md hover:shadow-md p-4">
          <img
            src="https://edu.google.com/assets/icons/pages/main/classroom/access-from-anywhere.svg"
            alt=""
          />
          <h2 className="text-2xl mb-4">Access from anywhere</h2>
          <p className="text-center">
            Empower teaching and learning from anywhere, on any device, and give
            your class more flexibility and mobility.
          </p>
        </div>
      </section>

      <section className="w-11/12 mx-auto  mb-24">
        <div className="text-center">
          <img className="inline" src={classroom} alt="" />
        </div>
        <h1 className="text-5xl text-center mb-16">Features</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <img
              className="w-full"
              src="https://lh3.googleusercontent.com/eiuQVtahi5MknaMtb9J3sguRdSN1Zi-mjfPBkiTSFvzUZfrmVfgOTsr8vus3QFRaDoVPdWEdZPhydGAo8eZ3AjImKeMEUxFRVdPam2V0P26wMc3oBg=w1296-v1-e30"
              alt=""
            />
          </div>
          <ul className="mx-2">
            <li className="text-green-700 font-bold rounded-md p-2 text-xl my-3 bg-slate-200">
              Schedule posts to multiple classes
            </li>
            <li className="text-green-700 font-bold rounded-md p-2 text-xl my-3 bg-slate-100">
              Add students to a new course by sharing a link or code
            </li>
            <li className="text-green-700 font-bold rounded-md p-2 text-xl my-3 bg-slate-200">
              Manage multiple classes at once
            </li>
            <li className="text-green-700 font-bold rounded-md p-2 text-xl my-3 bg-slate-100">
              Automatic notifications about assignments, deadlines, and student
              summaries
            </li>
            <li className="text-green-700 font-bold rounded-md p-2 text-xl my-3 bg-slate-200">
              Set up student accounts to support an individualized education
              plan
            </li>
            <li className="text-green-700 font-bold rounded-md p-2 text-xl my-3 bg-slate-100">
              Classroom audit logs access right from the Admin console
            </li>
            <li className="text-green-700 font-bold rounded-md p-2 text-xl my-3 bg-slate-200">
              Restrict class activity to class members only
            </li>
            <li className="text-green-700 font-bold rounded-md p-2 text-xl my-3 bg-slate-100">
              No advertising in Classroom
            </li>
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center w-3/4 mx-auto mb-24 bg-slate-100 p-5 rounded-lg">
        <div>
          <img
            className="w-full rounded-lg"
            src="https://lh3.googleusercontent.com/o9GflI21-0Y-3pgorqmZKHjA8kzhQmhsZVn64EmOixTOFlj7yVxt9On8xArR-sIfKBk5K3O7jlBMCiBAQHhVPTxspeU0WGQYaa-vBA=w1296-v1-e30"
            alt=""
          />
        </div>
        <div className="">
          <h1 className="text-xl md:text-2xl lg:text-4xl ">
            Manage Classroom on the go with the mobile app (Coming Soon)
          </h1>
          <div className="flex flex-row mt-8">
            <div>
              <img
                className="w-3/4"
                src="https://edu.google.com/assets/icons/mobile-app-stores/play-store.png"
                alt=""
              />
            </div>
            <div>
              <img
                className="w-3/4"
                src="https://edu.google.com/assets/icons/mobile-app-stores/app-store.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="p-4 bg-slate-100 flex flex-col lg:flex-row items-center justify-evenly">
        <div>
          <div className="flex flex-row items-center gap-5">
            <p>Follow us: </p>
            <svg
              className="p-2 rounded-full  hover:bg-slate-200"
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>

            <svg
              className="p-2 rounded-full hover:bg-slate-200 "
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              viewBox="0 0 16 16"
            >
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
            </svg>
            <svg
              className="p-2 rounded-full  hover:bg-slate-200"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </div>
        </div>
        <div>©2023 MyClassroom.</div>
      </footer>
    </div>
  );
};

export default LandingPage;
