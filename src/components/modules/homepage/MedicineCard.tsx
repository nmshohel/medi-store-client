import Link from "next/link";
import Image from "next/image";
import { Eye, MessageCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";


export default function BlogCard({  medicine }: { medicine: BlogPost }) {
   
  return (
    <Card className="h-full overflow-hidden border-none shadow-md transition-all duration-300 pb-2">
      <div className="relative h-56 w-full overflow-hidden">
        {medicine.thumbnail ? (
          <Image
            src={medicine.thumbnail}
            alt={medicine.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
          {medicine.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {medicine.content}
        </p>

        {medicine.tags && medicine.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {medicine.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {medicine.views}
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {medicine._count?.comments || 0}
          </span>

          {medicine.isFeatured && (
            <Badge
              variant="default"
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              Featured
            </Badge>
          )}
        </div>

        <Link
          href={`/blogs/${medicine.id}`}
          className="text-sm font-semibold text-primary group-hover:underline"
        >
          Read More &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
}