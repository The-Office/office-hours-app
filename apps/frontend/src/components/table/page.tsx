import { useEffect, useState } from "react";
import { OFFICE_HOURS, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<OFFICE_HOURS[]> {
// Fetch data from your API here.
return [
  {
    id: "728ed52q",
    course: "CEN3031",
    leader: "Jane Doe",
    days: "T, Th",
    start: "8:00 AM",
    end: "9:00 AM",
    location: "Room 111",
  },
  {
    id: "728ed52r",
    course: "COP3503",
    leader: "John Doe",
    days: "M, W, F",
    start: "9:00 AM",
    end: "10:00 AM",
    location: "Room 112",
  },
  {
    id: "728ed52s",
    course: "CDA3101",
    leader: "Alice Smith",
    days: "T, Th",
    start: "10:00 AM",
    end: "11:00 AM",
    location: "Room 113",
  },
  {
    id: "728ed52t",
    course: "CDA3101",
    leader: "Bob Johnson",
    days: "M, W",
    start: "11:00 AM",
    end: "12:00 PM",
    location: "Room 114",
  },
  {
    id: "728ed52u",
    course: "COP4600",
    leader: "Charlie Brown",
    days: "F",
    start: "12:00 PM",
    end: "1:00 PM",
    location: "Room 115",
  },
  {
    id: "728ed52v",
    course: "CEN4721",
    leader: "David Wilson",
    days: "M, W",
    start: "1:00 PM",
    end: "2:00 PM",
    location: "Room 116",
  },
  {
    id: "728ed52w",
    course: "CIS4914",
    leader: "Eve Davis",
    days: "T, Th",
    start: "2:00 PM",
    end: "3:00 PM",
    location: "Room 117",
  },
  {
    id: "728ed52x",
    course: "COT3100",
    leader: "Frank Miller",
    days: "M, W, F",
    start: "3:00 PM",
    end: "4:00 PM",
    location: "Room 118",
  },
  {
    id: "728ed52y",
    course: "COP3530",
    leader: "Grace Lee",
    days: "T, Th",
    start: "4:00 PM",
    end: "5:00 PM",
    location: "Room 119",
  },
  {
    id: "728ed52z",
    course: "CEN4020",
    leader: "Hank Green",
    days: "M, W",
    start: "5:00 PM",
    end: "6:00 PM",
    location: "Room 120",
  },
  {
    id: "728ed52aa",
    course: "CIS4930",
    leader: "Ivy White",
    days: "F",
    start: "6:00 PM",
    end: "7:00 PM",
    location: "Room 121",
  }
];
}

export default function DemoPage() {
  const [data, setData] = useState<OFFICE_HOURS[]>([]);
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
