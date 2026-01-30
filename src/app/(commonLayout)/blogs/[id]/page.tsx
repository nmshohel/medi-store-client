import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { BlogPost } from "@/types";
export async function generateStaticParams() {

    
}

export default async function BlogPage({params}:{params:Promise<{id:string}>}) {

  return (
    <article className="container mx-auto px-4 py-12 max-w-2xl">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
   
        </h1>

        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <span></span>
          <span>·</span>
          <span> min read</span>
          <span>·</span>
          <span> views</span>
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed text-foreground">
        <p className="whitespace-pre-wrap text-lg leading-8"></p>
      </div>

      <Separator className="my-8" />

      {/* Footer */}
      {/* <footer className="space-y-6">
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-3 py-1 text-sm font-normal rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{data._count?.comments ?? 0} comments</span>
          {data.isFeatured && (
            <Badge variant="outline" className="rounded-full">
              Featured
            </Badge>
          )}
        </div>
      </footer> */}
    </article>
  );
}
