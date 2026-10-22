import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import styles from "./WizardStepper.module.css";

interface WizardStepperProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  onStepClick?: (step: number) => void;
}

export function WizardStepper({ currentStep, totalSteps, steps, onStepClick }: WizardStepperProps) {
  return (
    <div className={styles.stepper}>
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div
            key={idx}
            className={`${styles.step} ${isCompleted ? styles.completed : ""} ${
              isCurrent ? styles.current : ""
            }`}
            onClick={() => isCompleted && onStepClick?.(stepNum)}
          >
            <div className={styles.node}>
              {isCompleted ? <Check size={14} /> : <span>{stepNum}</span>}
            </div>
            <span className={styles.label}>{label}</span>
            {stepNum < totalSteps && <div className={styles.connector} />}
          </div>
        );
      })}
    </div>
  );
}
