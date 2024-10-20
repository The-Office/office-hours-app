import { useEffect, useState } from "react";
import { Hours, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Hours[]> {
  // Fetch data from your API here.
return [
    {
        id: "728ed52q",
        course: "CEN3031",
        leader: "Jane Doe",
        days: "T, Th",
        start_time: "8:00 AM",
        end_time: "9:00 AM",
        location: "Room 111",
    },
    {
        id: "728ed52r",
        course: "COP3503",
        leader: "John Doe",
        days: "M, W, F",
        start_time: "9:00 AM",
        end_time: "10:00 AM",
        location: "Room 112",
    },
    {
        id: "728ed52s",
        course: "CIS4301",
        leader: "Alice Smith",
        days: "T, Th",
        start_time: "10:00 AM",
        end_time: "11:00 AM",
        location: "Room 113",
    },
    {
        id: "728ed52t",
        course: "CDA3101",
        leader: "Bob Johnson",
        days: "M, W",
        start_time: "11:00 AM",
        end_time: "12:00 PM",
        location: "Room 114",
    },
    {
        id: "728ed52u",
        course: "COP4600",
        leader: "Charlie Brown",
        days: "F",
        start_time: "12:00 PM",
        end_time: "1:00 PM",
        location: "Room 115",
    },
    {
        id: "728ed52v",
        course: "CEN4721",
        leader: "David Wilson",
        days: "M, W",
        start_time: "1:00 PM",
        end_time: "2:00 PM",
        location: "Room 116",
    },
    {
        id: "728ed52w",
        course: "CIS4914",
        leader: "Eve Davis",
        days: "T, Th",
        start_time: "2:00 PM",
        end_time: "3:00 PM",
        location: "Room 117",
    },
    {
        id: "728ed52x",
        course: "COT3100",
        leader: "Frank Miller",
        days: "M, W, F",
        start_time: "3:00 PM",
        end_time: "4:00 PM",
        location: "Room 118",
    },
    {
        id: "728ed52y",
        course: "COP3530",
        leader: "Grace Lee",
        days: "T, Th",
        start_time: "4:00 PM",
        end_time: "5:00 PM",
        location: "Room 119",
    },
    {
        id: "728ed52z",
        course: "CEN4020",
        leader: "Hank Green",
        days: "M, W",
        start_time: "5:00 PM",
        end_time: "6:00 PM",
        location: "Room 120",
    },
    {
        id: "728ed52aa",
        course: "CIS4930",
        leader: "Ivy White",
        days: "F",
        start_time: "6:00 PM",
        end_time: "7:00 PM",
        location: "Room 121",
    }
];
}

export default function DemoPage() {
  const [data, setData] = useState<Hours[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
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
