import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './IntroPage.module.css';

export default function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.Intropage}>
      <img src="rb_19934.png" alt="Student" className={styles.Student} />
    </div>
  );
}
