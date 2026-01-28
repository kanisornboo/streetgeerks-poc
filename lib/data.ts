import type {
    NavItem,
    Module,
    Participant,
    Programme,
    Stat,
    Integration,
    User,
} from "@/types";

export const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { id: "participants", label: "Participants", icon: "Users" },
    { id: "programmes", label: "Programmes", icon: "GraduationCap" },
    { id: "analytics", label: "Analytics", icon: "BarChart3" },
    { id: "settings", label: "Settings", icon: "Settings" },
];

export const modules: Module[] = [
    {
          id: "user-mgmt",
          title: "User Management",
          description: "Manage participant accounts, roles, and permissions",
          icon: "User",
          stats: { total: 1247, active: 892 },
          color: "from-yellow-400 to-amber-500",
          category: "core",
    },
    {
        id: "skills-gap",
        title: "Skills Gap Analysis",
        description: "Identify skill deficiencies and training needs",
        icon: "BarChart",
        stats: { assessments: 342, pending: 28 },
        color: "from-amber-400 to-orange-500",
        category: "core",
    },
    {
        id: "training",
        title: "Training Curriculum",
        description: "Design and manage learning pathways",
        icon: "BookOpen",
        stats: { courses: 156, enrolled: 2341 },
        color: "from-yellow-500 to-yellow-600",
        category: "core",
    },
    {
        id: "staff-mgmt",
        title: "Staff Management",
        description: "Oversee workforce allocation and schedules",
        icon: "Users",
        stats: { staff: 384, departments: 12 },
        color: "from-emerald-500 to-green-600",
        category: "admin",
    },
    {
        id: "data-integ",
        title: "Data Integration",
        description: "Connect and sync external data sources",
        icon: "RefreshCw",
        stats: { sources: 8, synced: "12m" },
        color: "from-slate-400 to-gray-500",
        category: "admin",
    },
    {
        id: "jobs",
        title: "Jobs & Careers",
        description: "Job matching and career progression tracking",
        icon: "Briefcase",
        stats: { openings: 47, applications: 234 },
        color: "from-amber-500 to-yellow-600",
        category: "core",
    },
    {
        id: "ext-interfaces",
        title: "Document Management",
        description: "API connections and integrations",
        icon: "FolderOpen",
        stats: { endpoints: 24, uptime: "99.9%" },
        color: "from-gray-500 to-slate-600",
        category: "admin",
    },
    {
        id: "crm",
        title: "CRM Integration",
        description: "Customer relationship management sync",
        icon: "Handshake",
        stats: { contacts: 3421, lastSync: "5m" },
        color: "from-yellow-400 to-amber-500",
        category: "integration",
    },
];

export const participants: Participant[] = [
    {
        id: 1,
        name: "Alex Johnson",
        programme: "Academy",
        status: "Active",
        progress: 75,
    },
    {
        id: 2,
        name: "Sarah Williams",
        programme: "Female Academy",
        status: "Active",
        progress: 60,
    },
    {
        id: 3,
        name: "Marcus Chen",
        programme: "Job Club",
        status: "Completed",
        progress: 100,
    },
    {
        id: 4,
        name: "Emma Thompson",
        programme: "Street Sports",
        status: "Active",
        progress: 45,
    },
    {
        id: 5,
        name: "Jordan Davis",
        programme: "Academy",
        status: "Active",
        progress: 82,
    },
    {
        id: 6,
        name: "Priya Patel",
        programme: "Functional Skills",
        status: "Active",
        progress: 55,
    },
];

export const programmes: Programme[] = [
    {
        id: 1,
        name: "Academy",
        participants: 342,
        completion: 78,
        status: "Active",
    },
    {
        id: 2,
        name: "Female Academy",
        participants: 156,
        completion: 82,
        status: "Active",
    },
    {
        id: 3,
        name: "Functional Skills Academy",
        participants: 234,
        completion: 71,
        status: "Active",
    },
    {
        id: 4,
        name: "Job Club",
        participants: 189,
        completion: 85,
        status: "Active",
    },
    {
        id: 5,
        name: "Street Sports",
        participants: 326,
        completion: 69,
        status: "Active",
    },
];

export const dashboardStats: Stat[] = [
    { label: "Total Participants", value: "1,247", change: "+12%", up: true },
    { label: "Active Programmes", value: "156", change: "+8%", up: true },
    { label: "Employment Rate", value: "78.4%", change: "+3.2%", up: true },
    { label: "Skill Coverage", value: "94%", change: "-1%", up: false },
];

export const analyticsStats: Stat[] = [
    { label: "Total Placements", value: "847", change: "+23%", up: true },
    {
        label: "Avg. Time to Employment",
        value: "12 wks",
        change: "-8%",
        up: true,
    },
    { label: "Retention Rate (6mo)", value: "89%", change: "+5%", up: true },
];

export const integrations: Integration[] = [
    { name: "CRM System", status: "Connected", icon: "Handshake" },
    { name: "Data Integration Hub", status: "Connected", icon: "RefreshCw" },
    { name: "External Job Board", status: "Not configured", icon: "Plug" },
];

export const chartData = [65, 78, 52, 89, 95, 72, 88, 94, 76, 82, 91, 97];
export const chartLabels = [
    "J",
    "F",
    "M",
    "A",
    "M",
    "J",
    "J",
    "A",
    "S",
    "O",
    "N",
    "D",
];

export const users: User[] = [
    {
        id: "1",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: "2",
        name: "Sarah Williams",
        email: "sarah.williams@example.com",
        role: "Manager",
        status: "Active",
    },
    {
        id: "3",
        name: "Marcus Chen",
        email: "marcus.chen@example.com",
        role: "Staff",
        status: "Invited",
    },
    {
        id: "4",
        name: "Emma Thompson",
        email: "emma.thompson@example.com",
        role: "User",
        status: "Active",
    },
    {
        id: "5",
        name: "Jordan Davis",
        email: "jordan.davis@example.com",
        role: "Staff",
        status: "Active",
    },
    {
        id: "6",
        name: "Priya Patel",
        email: "priya.patel@example.com",
        role: "Manager",
        status: "Suspended",
    },
    {
        id: "7",
        name: "James Wilson",
        email: "james.wilson@example.com",
        role: "User",
        status: "Active",
    },
    {
        id: "8",
        name: "Olivia Martinez",
        email: "olivia.martinez@example.com",
        role: "Admin",
        status: "Active",
    },
];
