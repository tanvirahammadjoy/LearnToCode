import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import axios from "axios";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<{name?: string, email?: string} | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("/api/users/" + router.query.id);
      setUser(response.data);
    };
    getUser();
  }, [router.query.id]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Profile</h1>
      <hr className="my-4" />
      <div className="flex flex-col items-center">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
}
