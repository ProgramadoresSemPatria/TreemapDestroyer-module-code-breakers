import { TDifficulty } from "@/types/IExercise";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import clsx from "clsx";

type CourseNode = Node<{
  img: string;
  title: string;
  description: string;
  difficulty: TDifficulty;
  time: number;
  link: string;
}>;

const difficultyColors: Record<TDifficulty, string> = {
  Easy: "#47c78e",
  Medium: "#fee18a",
  Hard: "#f04668",
};

export function CourseNode({ data }: NodeProps<CourseNode>) {
  return (
    <div className="overflow-hidden relative w-96 rounded-md shadow-[0_0_50px_rgba(0,0,0,0.25)] bg-white dark:bg-[#282828] text-white">
      <Handle
        type="target"
        position={Position.Top}
        className="bg-transparent border-0"
      />
      <a target="_blank" href={data.link}>
        <img
          src={data.img}
          className="w-full aspect-video"
          alt="course thumbnail"
        />
        <div className="min-h-32 py-4 px-8">
          <p className="font-semibold text-[#242424] dark:text-white">
            {data.title} -{" "}
            <span className="text-[#979797]">{data.time} hours</span>
          </p>
          <p className="text-gray-600 dark:text-gray-200 font-normal text-sm mt-2">
            {data.description}
          </p>
        </div>
        <div
          style={{ backgroundColor: difficultyColors[data.difficulty] }}
          className={clsx(
            "absolute w-fit px-4 py-1 rounded-bl-md text-lg font-semibold top-0 right-0 shadow-[0_0_50px_rgba(0,0,0,1)]",
            data.difficulty === "Medium" && "text-gray-800"
          )}
        >
          {data.difficulty}
        </div>
      </a>
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-transparent border-0"
      />
    </div>
  );
}
