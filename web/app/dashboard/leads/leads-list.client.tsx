import { TableHeader } from "@/components/data-table/data-table";
import { Lead } from "@tyler-harker/crm-shared";
const headers: TableHeader<Lead>[] = [{ text: "Id", field: (r) => r.uid }];

export function LeadsListClient() {
  return <div>Leads List</div>;
}
