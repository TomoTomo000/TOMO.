import { describe, expect, test } from "bun:test";
import { sanitizeMicroCmsArticle } from "../src/features/blog/server/microcms-content.server";

describe("sanitizeMicroCmsArticle", () => {
  test("removes scripts and event attributes while creating a table of contents", () => {
    const article = sanitizeMicroCmsArticle(
      '<h2 onclick="alert(1)">安全な見出し</h2><script>alert(1)</script><p>本文</p>',
    );

    expect(article.html).toContain('<h2 id="heading-1">安全な見出し</h2>');
    expect(article.html).not.toContain("onclick");
    expect(article.html).not.toContain("script");
    expect(article.text).toBe("安全な見出し本文");
    expect(article.tableOfContents).toEqual([
      { id: "heading-1", level: 2, text: "安全な見出し" },
    ]);
  });

  test("keeps only images served by the microCMS image domain", () => {
    const article = sanitizeMicroCmsArticle(
      '<img src="https://evil.example/image.png"><img src="https://images.microcms-assets.io/assets/a/b/image.png" alt="cover">',
    );

    expect(article.html).not.toContain("evil.example");
    expect(article.html).toContain("https://images.microcms-assets.io/assets/a/b/image.png");
    expect(article.html).toContain('loading="lazy"');
    expect(article.html).toContain('decoding="async"');
  });
});
