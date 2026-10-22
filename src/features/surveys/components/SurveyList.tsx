import { SurveyWithStats } from "../queries";
import { SurveyRow } from "./SurveyRow";
import styles from "./SurveyList.module.css";

interface SurveyListProps {
  surveys: SurveyWithStats[];
}

export function SurveyList({ surveys }: SurveyListProps) {
  if (surveys.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No surveys found. Create your first patient survey!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {surveys.map((survey) => (
        <SurveyRow key={survey.id} survey={survey} />
      ))}
    </div>
  );
}
