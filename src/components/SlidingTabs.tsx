import clsx from "clsx";
import { useRef, useState, useEffect } from "react";

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

export const SlidingTabBar = () => {
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  return (
    <div className="animate-from-bottom delay-300 relative mx-auto flex h-10 rounded-[0.25rem] border dark:border-white/20 bg-white dark:bg-neutral-800 px-1 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.25)] transition-all duration-300">
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
              "my-auto cursor-pointer select-none rounded-full px-4 text-center font-light dark:text-white text-sm transition-all duration-300",
              isActive && `text-white`
            )}
            onClick={() => setActiveTabIndex(index)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
