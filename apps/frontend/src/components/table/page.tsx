import { columns } from "./columns";
import { fetchOfficeHours, fetchUser } from "@/services/userService";
import { DataTable } from "./data-table";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Table() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  });

  const admin = ["admin", "professor", "teaching_assistant"].includes(user?.role || "")

  const { data: officeHours = [], isLoading } = useQuery({
    queryKey: ['officeHours'],
    queryFn: fetchOfficeHours,
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" size={48}/>
        Loading...
      </div>
    );
  }

  return (
    <div className="py-10 mx-5 md:mx-32">
      <DataTable columns={columns} data={officeHours} admin={admin}/>
    </div>
  );
}