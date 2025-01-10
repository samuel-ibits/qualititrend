import Settings from "@/components/settings";
import GeneralSettings from "@/components/settings/general";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = () => {
  return (
    <>
      {/* <GeneralSettings/> */}
      <Settings />
    </>
  );
};

export default SettingsPage;
