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
import { useSettingsStore } from "@/stores/useSettingsStore";

export function Preferences() {
  const { isDraggable, enableZooming, panOnDrag, setTheme, theme } =
    useSettingsStore();

  return (
    <Menubar className="animate-left-to-right h-fit dark:bg-[#2c2c2c] dark:shadow-[0_0_50px_rgba(0,0,0,1)] shadow-[0_0_50px_rgba(0,0,0,0.25)]">
      <MenubarMenu>
        <MenubarTrigger className="gap-2">
          <img className="w-6" src={borderlessLogo} alt="borderless logo" />
          <ChevronDown size={13} className="text-black dark:text-white" />
        </MenubarTrigger>
        <MenubarContent className="dark:bg-[#2c2c2c]" sideOffset={14}>
          <MenubarSub>
            <MenubarSubTrigger className="pl-8">Change Theme</MenubarSubTrigger>
            <MenubarSubContent className="dark:bg-[#2c2c2c]" sideOffset={10}>
              <MenubarCheckboxItem
                checked={theme === "light"}
                onClick={() => setTheme("light")}
              >
                Light
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={theme === "dark"}
                onClick={() => setTheme("dark")}
              >
                Dark
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={theme === "system"}
                onClick={() => setTheme("system")}
              >
                System
              </MenubarCheckboxItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator className="dark:bg-[#444444]" />
          <MenubarCheckboxItem
            checked={isDraggable}
            onClick={() =>
              useSettingsStore.setState({ isDraggable: !isDraggable })
            }
          >
            Enable dragging
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={enableZooming}
            onClick={() =>
              useSettingsStore.setState({ enableZooming: !enableZooming })
            }
          >
            Enable zooming
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={panOnDrag}
            onClick={() => useSettingsStore.setState({ panOnDrag: !panOnDrag })}
          >
            Enable panning
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
