import { useEffect, useState } from "react";
import { columns } from "./columns";
import { OfficeHour, fetchOfficeHours } from "@/services/userService";
import { DataTable } from "./data-table";

export default function Table() {
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
    <div className="py-10  mx-5 md:mx-32">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
