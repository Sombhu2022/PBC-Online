import { motion } from "framer-motion";
import { Users, DollarSign, Activity, BarChart } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useDashboardStore } from "@/store";
import { DashboardContext } from "../components/dashboard/DashboardContent";

export default function Dashboard() {
    const { stats } = useDashboardStore();

    return (
        <>
            <DashboardContext />
        </>
    );
}
