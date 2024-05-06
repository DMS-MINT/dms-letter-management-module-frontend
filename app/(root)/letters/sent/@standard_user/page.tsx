import { Subheader, Drawer, Main } from "@/components/layouts";
import { ControlPanel } from "@/widgets/inbox";
import { NavigationPanel } from "@/widgets/common";
import { Letter, columns } from "./columns";
import { DataTable } from "@/components/dataTable";
import { v4 as uuidv4 } from "uuid";
import { Badge } from "@/components/ui/badge";

const sampleData: Letter[] = [
  {
    id: uuidv4(),
    is_read: false,
    letter_id: "L797464679",
    subject: "የፕሮጀክት ሁኔታ ሪፖርት ማቅረቢያ የመጨረሻ ቀን መቃረብ",
    type: "ከውጭ የተላከ ደብዳቤ",
    received_at: "ከ 4 ሰዓታት በፊት",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "ለኮምፒዩተሮች የግዢ ትዕዛዝ ጥያቄ",
    type: "የውስጥ ደብዳቤ",
    received_at: "ከ 4 ሰዓታት በፊት",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "Notice Regarding Company Expenses",
    type: "Internal Letter",
    received_at: "ከ 4 ሰዓታት በፊት",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "New Product Launch Strategy",
    type: "outgoing letter",
    received_at: "Last week",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "Customer Satisfaction Survey Results",
    type: "internal letter",
    received_at: "2 weeks ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "Upcoming Marketing Campaign Details",
    type: "internal letter",
    received_at: "Last month",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: false,
    letter_id: "L797464679",
    subject: "Contract Negotiation Update",
    type: "outgoing letter",
    received_at: "2 months ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: false,
    letter_id: "L797464679",
    subject: "Software Update Notice",
    type: "incoming letter",
    received_at: "3 months ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "New Project Kickoff Meeting",
    type: "internal letter",
    received_at: "Last year",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: false,
    letter_id: "L797464679",
    subject: "Budget Planning Meeting Invitation",
    type: "outgoing letter",
    received_at: "2 years ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "Supplier Negotiation Updates",
    type: "incoming letter",
    received_at: "5 years ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: false,
    letter_id: "L797464679",
    subject: "Employee Training Program Announcement",
    type: "internal letter",
    received_at: "Last decade",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "Operational Efficiency Report",
    type: "internal letter",
    received_at: "ከ 4 ሰዓታት በፊት",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "New Product Launch Strategy",
    type: "outgoing letter",
    received_at: "Last week",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "Customer Satisfaction Survey Results",
    type: "internal letter",
    received_at: "2 weeks ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "Upcoming Marketing Campaign Details",
    type: "internal letter",
    received_at: "Last month",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: false,
    letter_id: "L797464679",
    subject: "Contract Negotiation Update",
    type: "outgoing letter",
    received_at: "2 months ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: false,
    letter_id: "L797464679",
    subject: "Software Update Notice",
    type: "incoming letter",
    received_at: "3 months ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "New Project Kickoff Meeting",
    type: "internal letter",
    received_at: "Last year",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: false,
    letter_id: "L797464679",
    subject: "Budget Planning Meeting Invitation",
    type: "outgoing letter",
    received_at: "2 years ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "Supplier Negotiation Updates",
    type: "incoming letter",
    received_at: "5 years ago",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: false,
    letter_id: "L797464679",
    subject: "Employee Training Program Announcement",
    type: "internal letter",
    received_at: "ከ 4 ሰዓታት በፊት",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
  {
    id: uuidv4(),
    is_read: true,
    letter_id: "L797464679",
    subject: "Operational Efficiency Report",
    type: "internal letter",
    received_at: "ከ 4 ሰዓታት በፊት",
    status: "በመጠባበቅ ላይ ያለ",
    sent_to: "አይሲቲና ዲጂታል ኢኮኖሚ ልማት ዘርፍ ሚኒስትር ዴኤታ",
  },
];

export default async function Inbox() {
  return (
    <>
      <Subheader>
        <ControlPanel />
      </Subheader>
      <section className="flex flex-1 pb-3 px-8 gap-6 mt-2">
        <Drawer>
          <NavigationPanel />
        </Drawer>
        <Main>
          <DataTable columns={columns} data={sampleData} />
        </Main>
      </section>
    </>
  );
}
