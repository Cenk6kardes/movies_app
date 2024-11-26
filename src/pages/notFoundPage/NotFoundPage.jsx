import classes from "./NotFoundPage.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.body}>
        <h1 className={classes.title}>404</h1>
        <p className={classes.sentence}>Sorry, the page you are looking for not found...</p>
        <Button label="Go To Main Page" severity="success" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}
