import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { BlogPostingStructuredData } from "@/components/structured-data";
import {
  formatBlogDate,
  getBlogPostBySlug,
} from "@/lib/blog-posts";
import {
  getBlogPostRouteSEOPayload,
  SITE_ORIGIN,
  toUseSEOArgs,
} from "@/lib/prerender-route-meta";
import { useSEO } from "@/hooks/use-seo";
import { Link, useParams } from "wouter";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useSEO(
    post
      ? toUseSEOArgs(getBlogPostRouteSEOPayload(post))
      : {
          title: "Article not found | The Adare Collection",
          description: "The requested blog article could not be found.",
          keywords: "The Adare Collection, Ryder Cup 2027",
          ogImage: `${SITE_ORIGIN}/images/hero/adaremanor-img2.webp`,
          ogUrl: `${SITE_ORIGIN}/blog/${slug ?? ""}`,
        },
  );

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl text-primary mb-4">Article not found</h1>
            <p className="text-secondary mb-8">
              The article you are looking for does not exist or may have been moved.
            </p>
            <Link
              href="/blog"
              className="text-sm text-secondary underline underline-offset-4 hover:text-gray-900"
            >
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <BlogPostingStructuredData post={post} />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] overflow-hidden -mt-24">
          <img
            src={post.heroImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        {post.imageCredit && (
          <p className="max-w-3xl mx-auto px-6 mt-2 text-xs text-muted text-right">
            Photograph:{" "}
            <a
              href={post.imageCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-gray-900"
            >
              {post.imageCredit.label}
            </a>
          </p>
        )}

        <article className="max-w-3xl mx-auto px-6 -mt-16 relative z-10">
          <div className="bg-white border border-gray-200 px-6 pt-6 md:px-10 md:pt-10 pb-0 overflow-hidden">
            <Link
              href="/blog"
              className="text-sm text-secondary hover:text-gray-900 underline-offset-4 hover:underline"
            >
              ← Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 mb-4">
              <span className="text-xs font-medium text-gray-900 uppercase tracking-wider font-sans bg-neutral-100 px-3 py-1">
                {post.category}
              </span>
              <span className="text-xs text-muted uppercase tracking-wider font-medium">
                {formatBlogDate(post.publishedAt)}
              </span>
              <span className="text-xs text-muted uppercase tracking-wider font-medium">
                {post.readTimeMinutes} MIN READ
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-8">
              {post.title}
            </h1>

            <div className="space-y-8">
              {post.sections.map((section, index) => (
                <section key={index}>
                  {section.heading && (
                    <h2 className="font-serif text-xl text-primary mb-4">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-secondary text-sm leading-relaxed mb-4 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.imagePair && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <img
                        src={section.imagePair.left.src}
                        alt={section.imagePair.left.alt}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                      <img
                        src={section.imagePair.right.src}
                        alt={section.imagePair.right.alt}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </section>
              ))}
            </div>

            {post.externalLinks && post.externalLinks.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h2 className="font-serif text-lg text-primary mb-4">
                  Official information
                </h2>
                <ul className="space-y-2">
                  {post.externalLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-secondary underline underline-offset-4 hover:text-gray-900"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-gray-200 bg-neutral-100 -mx-6 md:-mx-10 px-6 md:px-10 py-8">
              <h2 className="font-serif text-lg text-primary mb-3">
                Planning your Ryder Cup 2027 stay?
              </h2>
              <p className="text-secondary text-sm leading-relaxed mb-4">
                The Adare Collection offers luxury rental homes minutes from Adare Manor, ideal
                for groups, corporate guests, and extended tournament stays. We do not sell tickets
                or official hospitality.
              </p>
              <p className="text-sm text-secondary">
                <Link href="/properties" className="underline underline-offset-4 hover:text-gray-900">
                  View properties
                </Link>
                {" · "}
                <Link href="/contact" className="underline underline-offset-4 hover:text-gray-900">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
