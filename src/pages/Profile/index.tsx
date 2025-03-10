import { useEffect, useState } from "react";

import { ProfileData } from "../../data/profile";
import LayoutPage from "../general";

export const ProfilePage = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

 
  async function fetchData() {
    const response = await ProfileData();
    setProfile(response);
  }

  useEffect(() => {
    fetchData();
  });
  return (
    <LayoutPage>
        <div className="container">
            <div className="bg-white rounded-lg p-6 shadow-md flex flex-row justify-between mb-4 overflow-y-auto">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Profile Page</h2>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="px-4 py-2">Full Name</td>
                                <td className="px-4 py-2">{profile.full_name}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Email</td>
                                <td className="px-4 py-2">{profile.email}</td>
                            </tr>
                        </tbody> 
                    </table>
                 
                </div>
            </div>
       
        </div>
    </LayoutPage>
  );
};
