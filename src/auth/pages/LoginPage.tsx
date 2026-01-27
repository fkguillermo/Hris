import { useState } from "react";
import { login } from "../auth.api";
import { AuthService } from "../auth.service";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      AuthService.login(result.token);
      navigate("/", { replace: true });

      // alert("Token: " + result.token);
    } catch {
      alert("Invalid username or password");
    }
  };

  return (
    <div style={{ width: 300, margin: "100px auto" }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
