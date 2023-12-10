import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserDetails } from "../apicalls/users";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";

function ProtectedHomeRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validateUserToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        localStorage.removeItem("token");
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // navigate("/login");
      navigate("/");
    }
    else {
      validateUserToken();
    }
  }, []);

  const getUserName = (user) => {
    if (user) {
      return user.name.toUpperCase();
    } else {
      return "LOGIN";
    }
  };

  return (
    <div>
      {(
        <div className="p-1">
          <div className="header p-2 bg-primary flex justify-between rounded items-center">
            <h1 className="text-2xl text-white font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >OPEN LIBRARY</h1>

            <div className="flex items-center gap-1 bg-white p-1 rounded">
              <i className="ri-shield-user-line "></i>
              <span
                className="text-sm underline"
                onClick={() => {
                  if (!user)
                    navigate("/login");
                  else
                    navigate("/profile");
                }}
              >
                {getUserName(user)}
              </span>
              <i className="ri-logout-box-r-line ml-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </div>

          <div className="content mt-1">{children}</div>
        </div>
      )}
    </div>
  );
}

export default ProtectedHomeRoute;
