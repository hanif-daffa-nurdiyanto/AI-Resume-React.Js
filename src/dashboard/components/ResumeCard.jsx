import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import document_svg from "../../assets/document.svg";

export function ResumeCard({ resume }) {
  return (
    <>
      <div className="flex flex-col gap-1 pb-4">
        <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
          <div
            className="group flex flex-col aspect-[3/4] w-full items-center justify-center 
             bg-gradient-to-b from-blue-200 via-purple-300 to-pink-400 relative transition
             hover:opacity-90 cursor-pointer shadow-md rounded-md hover:scale-105 overflow-hidden 
            border-t-pink-600 border-t-4 hover:border-t-8"
          >
            <img src={document_svg} alt="document" className="w-20" />
          </div>
          <div className="w-full text-center mt-2">
            <span className="capitalize font-semibold tracking-wide text-shadow-sm">
              {resume.title}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ResumeCard;
