import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Login page
const Login = (props) => {
  // Inits
  const { changeUserIdHandler, userId } = props;
  const userIdRef = useRef("");
  const navigate = useNavigate();

  // For handle the submition of form
  const submitFormHandler = (event) => {
    event.preventDefault();
    changeUserIdHandler(userIdRef.current.value);
  };

  //   For genarate new userid
  const gerateNewUserIdHandler = () => {
    changeUserIdHandler(uuidv4());
  };

  //if id is there then redirect to home page
  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  }, [userId]);

  // JSX code
  return (
    <form
      className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
      onSubmit={submitFormHandler}
    >
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                Login Form with Floating Labels
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                    ref={userIdRef}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Enter your Id
                  </label>
                </div>
                <div className="relative flex gap-2">
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                    Submit
                  </button>
                  <button
                    className="bg-gray-500 text-white rounded-md px-2 py-1"
                    type="button"
                    onClick={gerateNewUserIdHandler}
                  >
                    Create A New Id
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
