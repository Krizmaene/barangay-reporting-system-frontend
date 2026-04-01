// Seed data for the actual resident frontend.
// This gives the project a realistic demo account and saved report history
// even before a backend or database is connected.

export const DEMO_RESIDENT = {
  id: "resident-001",
  fullName: "Juan Dela Cruz",
  purok: "Purok 1",
  email: "juandelacruz@gmail.com",
  mobileNumber: "09171234567",
  // Demo-only frontend password.
  // In a real system this must never be stored plain-text in the browser or database.
  password: "Resident123!",
  role: "resident",
  createdAt: "2026-03-01T08:00:00+08:00"
};

// Demo reports used to populate the resident dashboard, history, report modal, and notifications.
export const SEEDED_REPORTS = [
  {
    id: "BR-2026-001",
    residentId: "resident-001",
    title: "Trash Complaint",
    category: "Trash Complaint",
    purok: "Purok 1",
    incidentLocation: "Near sari sari store, Sampaguita Street",
    personInvolved: "Unknown person disposing trash",
    description: "Nakaharang yung basura sa gate namin at may amoy na po sa tapat ng bahay. Please help monitor the area and advise the residents nearby.",
    status: "Pending",
    createdAt: "2026-03-23T02:54:00+08:00",
    incidentAt: "2026-03-22T21:40:00+08:00",
    updatedAt: "2026-03-23T02:54:00+08:00",
    timeline: [
      {
        id: "evt-001",
        type: "report-received",
        title: "Report received",
        message: "Report submitted successfully. Awaiting barangay review.",
        createdAt: "2026-03-23T02:54:00+08:00",
        status: "Pending"
      }
    ],
    adminComments: []
  },
  {
    id: "BR-2026-002",
    residentId: "resident-001",
    title: "Noise Complaint",
    category: "Noise Complaint",
    purok: "Purok 2",
    incidentLocation: "Rosal Street basketball court",
    personInvolved: "Joel Reyes",
    description: "Maingay pa rin po ang videoke kahit lampas curfew na at naaapektuhan na ang mga bata at senior citizens sa paligid.",
    status: "In Progress",
    createdAt: "2026-03-22T23:05:00+08:00",
    incidentAt: "2026-03-22T22:20:00+08:00",
    updatedAt: "2026-03-23T09:15:00+08:00",
    timeline: [
      {
        id: "evt-002",
        type: "report-received",
        title: "Report received",
        message: "Report submitted successfully and queued for barangay review.",
        createdAt: "2026-03-22T23:05:00+08:00",
        status: "Pending"
      },
      {
        id: "evt-003",
        type: "status-change",
        title: "Status updated to In Progress",
        message: "Barangay tanod scheduled to monitor the area tonight.",
        createdAt: "2026-03-23T08:00:00+08:00",
        status: "In Progress"
      }
    ],
    adminComments: [
      {
        id: "cmt-001",
        author: "Barangay Admin",
        text: "We already endorsed this to the tanod on duty and added the location to tonight's monitoring route.",
        createdAt: "2026-03-23T09:15:00+08:00"
      }
    ]
  },
  {
    id: "BR-2026-003",
    residentId: "resident-001",
    title: "Broken Streetlight",
    category: "Broken Streetlight",
    purok: "Purok 3",
    incidentLocation: "Corner Acacia Street and Mabini Road",
    personInvolved: "N/A",
    description: "Madilim po sa kanto dahil sira ang poste ng ilaw at nahihirapan ang mga dumadaan sa gabi.",
    status: "Resolved",
    createdAt: "2026-03-18T19:14:00+08:00",
    incidentAt: "2026-03-18T18:50:00+08:00",
    updatedAt: "2026-03-19T17:40:00+08:00",
    timeline: [
      {
        id: "evt-004",
        type: "report-received",
        title: "Report received",
        message: "Maintenance request logged for barangay review.",
        createdAt: "2026-03-18T19:14:00+08:00",
        status: "Pending"
      },
      {
        id: "evt-005",
        type: "status-change",
        title: "Status updated to Resolved",
        message: "Streetlight repaired and tested by the maintenance team.",
        createdAt: "2026-03-19T17:40:00+08:00",
        status: "Resolved"
      }
    ],
    adminComments: [
      {
        id: "cmt-002",
        author: "Barangay Admin",
        text: "Electrician completed the replacement this afternoon. Please let us know if the issue returns.",
        createdAt: "2026-03-19T17:41:00+08:00"
      }
    ]
  },
  {
    id: "BR-2026-004",
    residentId: "resident-001",
    title: "Drainage Concern",
    category: "Drainage Concern",
    purok: "Purok 5",
    incidentLocation: "Lower alley beside the chapel",
    personInvolved: "N/A",
    description: "May naiipong tubig at basura sa kanal tuwing umuulan kaya mabilis bumaha sa daanan.",
    status: "Resolved",
    createdAt: "2026-03-14T08:40:00+08:00",
    incidentAt: "2026-03-14T07:50:00+08:00",
    updatedAt: "2026-03-15T13:20:00+08:00",
    timeline: [
      {
        id: "evt-006",
        type: "report-received",
        title: "Report received",
        message: "Drainage concern received and queued for inspection.",
        createdAt: "2026-03-14T08:40:00+08:00",
        status: "Pending"
      },
      {
        id: "evt-007",
        type: "status-change",
        title: "Status updated to Resolved",
        message: "Cleaning team cleared the drainage path.",
        createdAt: "2026-03-15T13:15:00+08:00",
        status: "Resolved"
      }
    ],
    adminComments: [
      {
        id: "cmt-003",
        author: "Barangay Admin",
        text: "Drainage was cleaned and the blockage was removed. Thank you for reporting early.",
        createdAt: "2026-03-15T13:20:00+08:00"
      }
    ]
  },
  {
    id: "BR-2026-005",
    residentId: "resident-001",
    title: "Public Disturbance",
    category: "Public Disturbance",
    purok: "Purok 4",
    incidentLocation: "Vacant lot near Day Care Center",
    personInvolved: "Group of unidentified teenagers",
    description: "May mga nag-iinuman at nag-iiwan ng bote sa bakanteng lote sa gabi. Kailangan po sana ng regular monitoring.",
    status: "In Progress",
    createdAt: "2026-03-12T18:30:00+08:00",
    incidentAt: "2026-03-12T17:45:00+08:00",
    updatedAt: "2026-03-22T20:00:00+08:00",
    timeline: [
      {
        id: "evt-008",
        type: "report-received",
        title: "Report received",
        message: "Case forwarded to the barangay response team.",
        createdAt: "2026-03-12T18:30:00+08:00",
        status: "Pending"
      },
      {
        id: "evt-009",
        type: "status-change",
        title: "Status updated to In Progress",
        message: "Monitoring rounds increased for the area.",
        createdAt: "2026-03-22T20:00:00+08:00",
        status: "In Progress"
      }
    ],
    adminComments: []
  },
  {
    id: "BR-2026-006",
    residentId: "resident-001",
    title: "Water Leak",
    category: "Water Leak",
    purok: "Purok 6",
    incidentLocation: "Near Barangay Hall side street",
    personInvolved: "N/A",
    description: "May tumatagas na linya ng tubig sa gilid ng kalsada at nagkakaroon ng putik sa daanan ng mga residente.",
    status: "Pending",
    createdAt: "2026-03-11T09:20:00+08:00",
    incidentAt: "2026-03-11T08:50:00+08:00",
    updatedAt: "2026-03-11T09:20:00+08:00",
    timeline: [
      {
        id: "evt-010",
        type: "report-received",
        title: "Report received",
        message: "Awaiting inspection and coordination with maintenance.",
        createdAt: "2026-03-11T09:20:00+08:00",
        status: "Pending"
      }
    ],
    adminComments: []
  }
];
