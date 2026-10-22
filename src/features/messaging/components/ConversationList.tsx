"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { ConversationWithDetails } from "../queries";
import { ConversationItem } from "./ConversationItem";
import styles from "./ConversationList.module.css";

interface ConversationListProps {
  conversations: ConversationWithDetails[];
  activeId?: string;
}

export function ConversationList({ conversations, activeId }: ConversationListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearch(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.push(`/messages?${params.toString()}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <Input
          placeholder="Search conversations..."
          leftIcon={<Search size={16} />}
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.list}>
        {conversations.length === 0 ? (
          <div style={{ padding: 24, textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            No conversations found.
          </div>
        ) : (
          conversations.map((c) => (
            <ConversationItem key={c.id} conversation={c} isActive={c.id === activeId} />
          ))
        )}
      </div>
    </div>
  );
}
