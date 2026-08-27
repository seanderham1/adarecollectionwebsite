import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BlogArticleCard from "@/components/blog-article-card";
import { getBlogPosts } from "@/lib/blog-posts";
import { getStaticRouteSEOByPath, toUseSEOArgs } from "@/lib/prerender-route-meta";
import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";

export default function Blog() {
  const posts = getBlogPosts();

  useSEO(toUseSEOArgs(getStaticRouteSEOByPath("/blog")!));

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />

      <main className="pt-24 pb-16 px-6 bg-neutral-100">
        <section className="bg-white py-12 mb-12 -mx-6 px-6 -mt-24 pt-24 border-b border-gray-200">
          <div className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
              Ryder Cup 2027 News & Travel Guides
            </h1>
            <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto">
              Practical guides on transport, tickets, and travel planning for the 2027 Ryder Cup
              at Adare Manor, plus tips on securing luxury accommodation for tournament week.
            </p>
            <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto mt-4">
              <Link href="/properties" className="underline underline-offset-4 hover:text-gray-900">
                View properties
              </Link>
              {" · "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-gray-900">
                Contact us
              </Link>
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {posts.map((post) => (
            <BlogArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
