"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { EmailTemplate } from "@/db/schema/emailTemplates";
import { AudienceMember, CreateCampaignInput } from "../types";
import { createCampaign } from "../actions/createCampaign";
import { WizardStepper } from "./WizardStepper";
import { AudiencePicker } from "./AudiencePicker";
import styles from "./CampaignWizard.module.css";

interface CampaignWizardProps {
  templates: EmailTemplate[];
  audience: AudienceMember[];
}

const STEPS = ["Details", "Audience", "Template", "Schedule", "Review"];

export function CampaignWizard({ templates, audience }: CampaignWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState<"email" | "sms">("sms");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(audience.map((m) => m.id));
  const [templateId, setTemplateId] = useState<string>(templates[0]?.id || "");
  const [scheduleType, setScheduleType] = useState<"immediate" | "scheduled">("immediate");
  const [scheduledAt, setScheduledAt] = useState("");

  const selectedTemplate = templates.find((t) => t.id === templateId);

  async function handleComplete() {
    setIsSubmitting(true);
    setError(null);
    const input: CreateCampaignInput = {
      name,
      type,
      audienceType: "custom",
      selectedMemberIds,
      templateId: templateId || undefined,
      scheduleType,
      scheduledAt: scheduledAt || undefined,
    };
    const res = await createCampaign(input);
    if (res.success && res.campaignId) {
      router.push(`/campaigns/${res.campaignId}`);
    } else {
      setError(res.error || "Failed");
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.wizard}>
      <WizardStepper currentStep={currentStep} totalSteps={5} steps={STEPS} onStepClick={setCurrentStep} />
      {error && <div className={styles.errorAlert}>{error}</div>}
      <div className={styles.stepContent}>
        {currentStep === 1 && (
          <div className={styles.stepPane}>
            <h2>Details</h2>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className={styles.typeCards}>
              <div className={`${styles.typeCard} ${type === "sms" ? styles.active : ""}`} onClick={() => setType("sms")}>SMS</div>
              <div className={`${styles.typeCard} ${type === "email" ? styles.active : ""}`} onClick={() => setType("email")}>Email</div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className={styles.stepPane}>
            <AudiencePicker audience={audience} selectedIds={selectedMemberIds} onChange={setSelectedMemberIds} campaignType={type} />
          </div>
        )}
        {currentStep === 3 && (
          <div className={styles.stepPane}>
            <h2>Template</h2>
            <select className={styles.select} value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
              {templates.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
            </select>
          </div>
        )}
        {currentStep === 4 && (
          <div className={styles.stepPane}>
            <h2>Schedule</h2>
            <div className={styles.typeCards}>
              <div className={`${styles.typeCard} ${scheduleType === "immediate" ? styles.active : ""}`} onClick={() => setScheduleType("immediate")}>Immediate</div>
              <div className={`${styles.typeCard} ${scheduleType === "scheduled" ? styles.active : ""}`} onClick={() => setScheduleType("scheduled")}>Scheduled</div>
            </div>
            {scheduleType === "scheduled" && <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />}
          </div>
        )}
        {currentStep === 5 && (
          <div className={styles.stepPane}>
            <h2>Review</h2>
            <Card>
              <p>Name: {name}</p>
              <p>Type: {type}</p>
              <p>Recipients: {selectedMemberIds.length}</p>
            </Card>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        {currentStep > 1 ? <Button variant="outline" leftIcon={<ArrowLeft size={16} />} onClick={() => setCurrentStep(currentStep - 1)}>Back</Button> : <div />}
        {currentStep < 5 ? (
          <Button rightIcon={<ArrowRight size={16} />} onClick={() => setCurrentStep(currentStep + 1)} disabled={currentStep === 1 && !name.trim()}>Continue</Button>
        ) : (
          <Button onClick={handleComplete} disabled={isSubmitting} leftIcon={<Check size={16} />}>{isSubmitting ? "Launching..." : "Launch"}</Button>
        )}
      </div>
    </div>
  );
}
