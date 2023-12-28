import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Landing() {
  return (
    <main className="min-h-screen  flex flex-col items-start justify-center p-12 md:p-16">
      <div className="space-y-6">
        <Avatar className="h-32 w-32 md:h-48 md:w-48">
          <AvatarImage src="/pfp.webp" />
          <AvatarFallback>Missing avatar? Um but Mac still exists :3</AvatarFallback>
        </Avatar> 
        <div className="space-y-2">
          <h1 className="font-bold text-4xl inline-block">bluestar</h1>
          <h1 className="font-semi text-md">they/them</h1>
        </div>
        <div className="space-x-4 max-w-md md:max-w-lg overflow-hidden overflow-ellipsis">
          Hello, I'm Mac (bluestar), a 16 y/o space enthusiast 🚀. I've been speedrunning the process of learning Python and JavaScript for a year now. Golang has been my best friend for a moment. I enjoy network programming, cycling stuff.
        </div>
      </div>
    </main>
  );
}
