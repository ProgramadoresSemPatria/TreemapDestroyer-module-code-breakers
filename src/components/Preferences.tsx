import { ChevronDown } from "lucide-react";
import borderlessLogo from "../assets/borderless-logo.svg";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarSeparator,
} from "./ui/menubar";

export function Preferences() {
  return (
    <Menubar className="h-fit shadow-[0_0_50px_rgba(0,0,0,0.25)]">
      <MenubarMenu>
        <MenubarTrigger className="gap-2">
          <img className="w-6" src={borderlessLogo} alt="borderless logo" />
          <ChevronDown size={13} color="black" />
        </MenubarTrigger>
        <MenubarContent sideOffset={14}>
          <MenubarSub>
            <MenubarSubTrigger className="pl-8">Change Theme</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarCheckboxItem checked={true}>Light</MenubarCheckboxItem>
              <MenubarCheckboxItem checked={true}>Dark</MenubarCheckboxItem>
              <MenubarCheckboxItem checked={true}>System</MenubarCheckboxItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarCheckboxItem checked={false}>Drag items</MenubarCheckboxItem>
          <MenubarCheckboxItem checked={false}>Enable drag</MenubarCheckboxItem>
          <MenubarCheckboxItem checked={false}>
            Enable zooming
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
