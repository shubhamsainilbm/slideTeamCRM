import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import Loader from "../../components/Loader";
export default function EditUser() {
  const { id } = useParams();
  const { user } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <Loader />;

  const content = <EditUserForm user={user} />;

  return content;
}
