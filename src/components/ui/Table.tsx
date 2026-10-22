import { ReactNode } from "react";
import { Spinner } from "./Spinner";
import { EmptyState } from "./EmptyState";
import styles from "./Table.module.css";

export interface Column<T> {
  key: string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyTitle = "No records found",
  emptyDescription,
  className = "",
}: TableProps<T>) {
  return (
    <div className={`${styles.tableWrapper} ${className}`.trim()}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={styles.tableHeaderCell}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className={styles.tableLoadingCell}>
                <Spinner size="md" />
                <span>Loading…</span>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.tableEmptyCell}>
                <EmptyState title={emptyTitle} description={emptyDescription} />
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={keyExtractor(row)} className={styles.tableRow}>
                {columns.map((col) => {
                  const content = col.render
                    ? col.render(row)
                    : (row as Record<string, unknown>)[col.key] as ReactNode;
                  return (
                    <td key={col.key} className={styles.tableCell}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
