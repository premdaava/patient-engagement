"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Card,
  CardHeader,
  Badge,
  Avatar,
  Modal,
  Tabs,
  Table,
  EmptyState,
  StatCard,
  PageHeader,
  Spinner,
} from "@/components/ui";
import { Mail, Users, Calendar, Search, Plus, Send, Trash2, TrendingUp, Inbox } from "lucide-react";
import styles from "./ui-kit.module.css";

interface PatientRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Pending" | "Inactive";
}

const SAMPLE_PATIENTS: PatientRow[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", phone: "(555) 123-4567", status: "Active" },
  { id: "2", name: "Robert Miller", email: "robert.m@example.com", phone: "(555) 234-5678", status: "Pending" },
  { id: "3", name: "Elena Ramos", email: "elena.r@example.com", phone: "(555) 345-6789", status: "Active" },
  { id: "4", name: "David Kim", email: "david.kim@example.com", phone: "(555) 456-7890", status: "Inactive" },
];

export default function UiKitPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);

  const columns = [
    {
      key: "name",
      header: "Patient",
      render: (row: PatientRow) => (
        <div className={styles.patientCell}>
          <Avatar name={row.name} size="sm" />
          <div>
            <div className={styles.patientName}>{row.name}</div>
            <div className={styles.patientEmail}>{row.email}</div>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Phone" },
    {
      key: "status",
      header: "Status",
      render: (row: PatientRow) => {
        const variant =
          row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "default";
        return <Badge variant={variant}>{row.status}</Badge>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: () => <Button variant="ghost" size="sm">View</Button>,
    },
  ];

  return (
    <div className={styles.container}>
      <PageHeader
        title="UI Kit & Component Showcase"
        description="Reference gallery for CareConnect reusable UI primitives and layout patterns."
        actions={
          <Button variant="primary" leftIcon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
            Open Modal Demo
          </Button>
        }
      />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Stat Cards</h2>
        <div className={styles.grid4}>
          <StatCard label="Total Patients" value="2,845" change="+12% from last month" changeType="positive" icon={<Users size={20} />} />
          <StatCard label="Campaigns Sent" value="142" change="+8 this week" changeType="positive" icon={<Send size={20} />} />
          <StatCard label="Appointments" value="38" change="-3% vs target" changeType="negative" icon={<Calendar size={20} />} />
          <StatCard label="Avg Review Score" value="4.9" change="Based on 412 reviews" changeType="neutral" icon={<TrendingUp size={20} />} />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Buttons</h2>
        <Card>
          <div className={styles.row}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger" leftIcon={<Trash2 size={16} />}>Danger</Button>
            <Button
              variant="primary"
              isLoading={isSubmitting}
              onClick={() => {
                setIsSubmitting(true);
                setTimeout(() => setIsSubmitting(false), 1200);
              }}
            >
              Click for Loading
            </Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          <div className={styles.row} style={{ marginTop: "var(--space-4)" }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="md" leftIcon={<Mail size={16} />}>With Left Icon</Button>
            <Button size="md" rightIcon={<Send size={16} />}>With Right Icon</Button>
          </div>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Form Controls</h2>
        <Card>
          <div className={styles.grid2}>
            <Input label="Patient Name" placeholder="e.g. Jane Doe" hint="Legal name" />
            <Input label="Email Address" type="email" placeholder="jane@example.com" leftIcon={<Mail size={16} />} />
            <Input label="Search Query" placeholder="Search records…" leftIcon={<Search size={16} />} />
            <Input label="Field With Error" defaultValue="invalid@" error="Please enter a valid email address" />
            <Select
              label="Notification Channel"
              options={[
                { value: "email", label: "Email" },
                { value: "sms", label: "SMS" },
                { value: "both", label: "Both Email & SMS" },
              ]}
            />
            <div style={{ paddingTop: "var(--space-6)" }}>
              <Checkbox
                label="Subscribe patient to recall notices"
                hint="Patient has consented to SMS communication"
                checked={checkboxState}
                onChange={(e) => setCheckboxState(e.target.checked)}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Textarea label="Clinical Notes" placeholder="Enter observations or recall intervals…" rows={3} />
            </div>
          </div>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Badges, Avatars & Spinners</h2>
        <div className={styles.grid2}>
          <Card>
            <CardHeader title="Badge Variants" />
            <div className={styles.row}>
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Scheduled</Badge>
              <Badge variant="danger">Overdue</Badge>
              <Badge variant="primary" size="sm">Small</Badge>
            </div>
          </Card>
          <Card>
            <CardHeader title="Avatars & Spinners" />
            <div className={styles.row}>
              <Avatar name="Sarah Connor" size="sm" />
              <Avatar name="Dr Michael Chang" size="md" />
              <Avatar name="Alice Walker" size="lg" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tabs & Table</h2>
        <Card padding="none">
          <div style={{ padding: "var(--space-4) var(--space-5) 0" }}>
            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={[
                { id: "all", label: "All Patients", badge: <Badge size="sm">4</Badge> },
                { id: "active", label: "Active" },
                { id: "pending", label: "Pending" },
              ]}
            />
          </div>
          <div style={{ padding: "var(--space-4) var(--space-5)" }}>
            <Table columns={columns} data={SAMPLE_PATIENTS} keyExtractor={(p) => p.id} />
          </div>
        </Card>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Empty State</h2>
        <Card>
          <EmptyState
            icon={<Inbox size={48} />}
            title="No campaign drafts yet"
            description="Create your first targeted outreach campaign to re-engage overdue hygiene patients."
            action={<Button leftIcon={<Plus size={16} />}>Create First Campaign</Button>}
          />
        </Card>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Quick Send Campaign"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" leftIcon={<Send size={16} />} onClick={() => setIsModalOpen(false)}>Send Now</Button>
          </>
        }
      >
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-4)" }}>
          Ready to dispatch recall notices to 42 patients due for 6-month hygiene visits.
        </p>
        <Select
          label="Template"
          options={[
            { value: "hygiene", label: "Hygiene Due Reminder (Email)" },
            { value: "unscheduled", label: "Unscheduled Treatment Plan (SMS)" },
          ]}
        />
      </Modal>
    </div>
  );
}
