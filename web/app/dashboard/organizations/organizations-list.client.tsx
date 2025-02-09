"use client";
import {
  DataTable,
  TableHeader,
  TableRow,
} from "@/components/data-table/data-table";
import { Alert, Button } from "@mui/material";
import {
  getUserOrganziationCollection,
  UserOrganization,
} from "@tyler-harker/crm-shared";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useAuthContext } from "@/components/auth-context/auth-context.client";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase-lib/app";
import { collection, getDocs, query, where } from "@firebase/firestore";

const headers: TableHeader<UserOrganization>[] = [
  { text: "Id", field: (r) => r.uid },
  { text: "Name", field: (r) => r.organizationName },
  {
    text: "",
    field: () => (
      <Button variant="contained" className="w-full">
        Select
      </Button>
    ),
  },
];

export function OrganizationsListClient() {
  const { claims } = useAuthContext();
  const [rows, setRows] = useState<TableRow<UserOrganization>[]>([]);

  useEffect(() => {
    async function fetchUserOrganizations() {
      const userOrgCollection = collection(
        firestore,
        getUserOrganziationCollection()
      );

      const userOrgQuery = query(
        userOrgCollection,
        where("userUid", "==", claims?.sub)
      );
      const userOrgSnapshot = await getDocs(userOrgQuery);

      // Create a plain array of objects, no methods or metadata
      const userOrgs: UserOrganization[] = userOrgSnapshot.docs.map((doc) => {
        // Get document data and include the document id as part of the object
        return doc.data() as UserOrganization;
      });

      const userOrgRows = userOrgs.map((uo) => {
        return { data: uo } as TableRow<UserOrganization>;
      });
      setRows(userOrgRows);
    }
    fetchUserOrganizations();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-sm border box-border flex flex-col gap-4">
      {claims?.selectedOrganizationUid ? null : (
        <Alert severity="warning">
          You currently do not have an organization selected.{" "}
          <b>
            You must select an organization before you can interact with the
            rest of the app.
          </b>
        </Alert>
      )}
      {rows.length ? (
        <DataTable headers={headers} rows={rows} />
      ) : (
        <div className="flex flex-col gap-4 p-8 text-center justify-center">
          You currently dont have any organizations.
          <Link href="/dashboard/organizations/create">
            <Button variant="contained">
              <AddIcon sx={{ width: 32, height: 32 }} />
              Create Organization
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
