import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import ResumeCard from "./ResumeCard";
import { useNavigate } from "react-router";

export function AddResume({ children }) {
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreate = (e) => {
    setLoading(true);
    e.preventDefault();

    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.createNewResume(data).then(
      (response) => {
        const resumeId = response.data.data.resumeId;
        if (response) {
          setLoading(false);
          navigate("/dashboard/resume/" + resumeId + "/edit");
        }
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <div className="container pt-10 flex flex-col gap-1">
        <h2 className="text-2xl font-bold">My Resume</h2>
        <h6 className="mb-6">Start creating AI resume to your next Job role</h6>
        <div className="flex gap-2 h-full">
          <div className="flex-1 p-2">
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className="border-4 border-slate-500 border-dashed
                        h-[350px] w-[250px] flex items-center justify-center bg-slate-100
                        hover:bg-slate-300 cursor-pointer shadow-md"
                >
                  <h1 className="text-4xl font-bold">+</h1>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Resume</DialogTitle>
                  <DialogDescription>
                    Add a title for your resume.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => onCreate(e)}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input
                        id="link"
                        placeholder="Resume Title"
                        onChange={(e) => setResumeTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        className="cursor-pointer"
                      >
                        Close
                      </Button>
                    </DialogClose>

                    <Button
                      disabled={!resumeTitle}
                      type="submit"
                      variant="default"
                      className="cursor-pointer"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="h-full overflow-y-scroll no-scrollbar px-3 pt-2 flex-1/2">
            <div className="grid grid-cols-1 h-1 gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
