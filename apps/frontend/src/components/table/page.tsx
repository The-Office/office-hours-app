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
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={64}/>
      </div>
    );
  }

  return (
    <div className="py-20 mx-5 md:mx-10">
      <DataTable columns={columns} data={officeHours} admin={admin}/>
    </div>
  );
}