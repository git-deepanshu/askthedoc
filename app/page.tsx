"use client";
import React, { useState } from "react";
import { ModeToggle } from "@/components/modetoggle";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import ReportComponent from "@/components/ReportComponent";
import { toast } from "sonner";
import ChatComponent from "@/components/chatComponent";

type Props = {};

const HomeComponent = (props: Props) => {
  const [reportData, setReportData] = useState("");
  const onReportConfirmation = (data: string) => {
    setReportData(data);
    toast("Upload successful !");
  };

  return (
    <div className="grid h-screen -w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 backdrop-blur-lg z-50 h-[57px] flex items-center gap-1 border-b px-4">
          <h1 className="text-xl font-semibold text-[#d90013]">AskTheDoc</h1>
          <div className="w-full flex flex-row justify-end gap-2">
            <ModeToggle />
            <Drawer>
              <DrawerTrigger>
                <Button variant={"outline"} size={"icon"} className="md:hidden">
                  <Settings />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh]">
                <ReportComponent onReportConfirmation={onReportConfirmation} />
              </DrawerContent>
            </Drawer>
          </div>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="hidden md:flex flex-col">
            <ReportComponent onReportConfirmation={onReportConfirmation} />
          </div>
          <div className="lg:col-span-2">
            <ChatComponent reportData={reportData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeComponent;
