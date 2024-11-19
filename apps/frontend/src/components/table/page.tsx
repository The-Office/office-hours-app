import { columns } from "./columns";
import { fetchOfficeHours, fetchUser, OfficeHour } from "@/services/userService";
import { DataTable } from "./data-table";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Table() {
  const [formattedOfficeHours, setFormattedOfficeHours] = useState<OfficeHour[]>([])
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

  useEffect(() => {
      setFormattedOfficeHours(officeHours.map(item => ({
        ...item,
        day: item.day.charAt(0).toUpperCase() + item.day.slice(1),
        mode: item.mode.charAt(0).toUpperCase() + item.mode.slice(1),
        start_time: new Date(`2000-01-01T${item.start_time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        end_time: new Date(`2000-01-01T${item.end_time}`).toLocaleTimeString('en-US', {
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true
        })
      })));
    
  }, [officeHours])

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
      <DataTable columns={columns} data={formattedOfficeHours} admin={admin}/>
    </div>
  );
}