import { courseEdges } from "@/constants/courseEdges";
import { courseNodes } from "@/constants/courseNodes";
import { courseNodeSize, progressNodeSize } from "@/constants/nodeSizes";
import { progressEdges } from "@/constants/progressEdges";
import { progressNodes } from "@/constants/progressNodes";
import { Edge, Node } from "@xyflow/react";
import clsx from "clsx";
import { useRef, useState } from "react";

interface ISlidingTabBarProps {
  onLayout: (
    nodes: Node[],
    edges: Edge[],
    size: { width: number; height: number }
  ) => void;
}

const allTabs = [
  {
    id: "algorithms",
    name: "Algorithms",
  },
  {
    id: "courses",
    name: "Courses",
  },
];

export const SlidingTabBar = ({ onLayout }: ISlidingTabBarProps) => {
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(108);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(4);

  const setTabPosition = (activeTabIndex: number) => {
    const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
    setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
    setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
  };

  const changeNodes = (activeTabIndex: number) => {
    const newNodes: Node[] = activeTabIndex === 0 ? progressNodes : courseNodes;
    const newEdges: Edge[] = activeTabIndex === 0 ? progressEdges : courseEdges;
    const size = activeTabIndex === 0 ? progressNodeSize : courseNodeSize;
    onLayout(newNodes, newEdges, size);
  };

  const handleTabChange = (index: number) => {
    if (index === activeTabIndex) return;
    setActiveTabIndex(index);
    setTabPosition(index);
    changeNodes(index);
  };

  return (
    <div
      className="animate-from-bottom relative mx-auto flex h-10 rounded-[0.25rem] border dark:border-white/20 bg-white dark:bg-neutral-800 px-1 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.25)] transition-all duration-300"
      style={{ animationDelay: "0.3s" }}
    >
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-sm py-1 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-sm bg-[#874ef9]" />
      </span>
      {allTabs.map((tab, index) => {
        const isActive = activeTabIndex === index;

        return (
          <button
            key={index}
            ref={(el) => (tabsRef.current[index] = el)}
            className={clsx(
              "my-auto cursor-pointer select-none rounded-full px-4 text-center dark:text-white text-sm transition-all duration-300",
              isActive && `text-white`
            )}
            onClick={() => handleTabChange(index)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
