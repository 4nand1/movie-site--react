import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";



export const Default = (props:any) => {
  return (
    <Badge
      className="text-3 leading-4 font-semibold font-sans"
      variant="outline"
    >
      {props.name}
      <ChevronRight className="ml-2 w-4 h-4 text-[#52525B]" />
    </Badge>
  );
};
