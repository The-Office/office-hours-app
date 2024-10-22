import { useEffect, useState } from "react";
import { columns } from "./columns";
import { OfficeHour, fetchOfficeHours } from "@/services/userService";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const [data, setData] = useState<OfficeHour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchOfficeHours(55558888);
      setData(result);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
