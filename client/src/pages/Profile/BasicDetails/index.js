import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileForm from "./ProfileForm";
import { GetLoggedInUserDetails } from "../../../apicalls/users";


function BasicDetails() {
  const { user } = useSelector((state) => state.users);

  const [formType, setFormType] = useState("update");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openProfileForm, setOpenProfileForm] = React.useState(false);

  return (
    <div>
      <div className="rounded bg-secondary text-white flex flex-col p-2 w-50">
        <div className="flex justify-between">
          <h1 className="text-md">Name</h1>
          <h1 className="text-md">{user.name}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Email</h1>
          <h1 className="text-md">{user.email}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Phone</h1>
          <h1 className="text-md">{user.phone}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md">Role</h1>
          <h1 className="text-md uppercase">{user.role}</h1>
        </div>

        <div className="flex justify-between">
          <h1 className="text-md">Registered On</h1>
          <h1 className="text-md">{
            moment(user.createdAt).format("MMM Do YYYY, h:mm a")
          }</h1>
        </div>

        <div className="flex justify-end">
          <button className="btn me-2 floar-end" style={{ width: '100px', marginTop: '20px' }}
            title="Edit"
            onClick={() => {
              setFormType("update");
              setSelectedUser(user);
              setOpenProfileForm(GetLoggedInUserDetails);
            }}
          >
            Edit
          </button>

          {openProfileForm && (
            <ProfileForm
              open={openProfileForm}
              setOpen={setOpenProfileForm}
              formType={formType}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            // reloadUser={user}
            />
          )}

        </div>
      </div>
    </div >
  );
}

export default BasicDetails;
