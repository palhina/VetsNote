import { memo } from "react";
import { useAuth } from "../hooks/useAuth";

export const Home = memo(() => {
  const { user } = useAuth();

  return (
    <div>
      <h1>HOME</h1>
      {user && <p>ようこそ、{user.name}さん</p>}
    </div>
  );
});
