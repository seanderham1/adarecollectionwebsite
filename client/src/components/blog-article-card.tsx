import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  type BlogPost,
  formatBlogDate,
} from "@/lib/blog-posts";

type BlogArticleCardProps = {
  post: BlogPost;
};

export default function BlogArticleCard({ post }: BlogArticleCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="property-card bg-neutral-100 overflow-hidden border-0 shadow-none cursor-pointer group flex flex-col md:flex-row">
        <div className="relative aspect-[16/9] md:aspect-auto md:w-2/5 md:min-h-[200px] shrink-0">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover object-center md:absolute md:inset-0"
          />
          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2">
              <div className="text-xs font-medium text-gray-900 uppercase tracking-wider font-sans">
                {post.category}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1 md:justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-muted uppercase tracking-wider font-medium">
                {formatBlogDate(post.publishedAt)}
              </div>
              <div className="text-xs text-muted uppercase tracking-wider font-medium">
                {post.readTimeMinutes} MIN READ
              </div>
            </div>
            <h3 className="font-serif text-xl font-normal mb-2 text-primary">
              {post.title}
            </h3>
            <p className="text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>
          </div>
          <Button
            className="border border-gray-700 bg-transparent text-gray-700 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-full md:w-auto md:self-start"
          >
            READ MORE
          </Button>
        </div>
      </article>
    </Link>
  );
}
