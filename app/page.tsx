"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";

const navItems = [
  { number: "01", label: "Home", id: "home" },
  { number: "02", label: "About", id: "about" },
  { number: "03", label: "Notes", id: "notes" },
  { number: "04", label: "Contact", id: "contact" },
] as const;

const favorites = [
  {
    label: "料理",
    src: "/img/about-cooking.png",
    width: 1320,
    height: 709,
  },
  {
    label: "古着",
    src: "/img/about-fashion.png",
    width: 1326,
    height: 646,
  },
  {
    label: "音楽",
    src: "/img/about-music.png",
    width: 888,
    height: 556,
  },
] as const;

const notesThumbnailSrc =
  "https://placehold.co/1600x900/f7f3f0/0a0a0a/png?text=NO%20IMAGE";

const notesPosts = [
  {
    category: "Frontend",
    date: "2024.05.12",
    title: "Next.jsのApp Routerを使って開発してみて感じたこと",
    description:
      "実際のプロジェクトでApp Routerを導入してみて、良かった点やハマったポイントをまとめました。",
    thumbnail: notesThumbnailSrc,
  },
  {
    category: "Design",
    date: "2024.04.28",
    title: "余白を意識したレイアウトの作り方",
    description:
      "デザインにおける余白の役割や、心地よい余白の取り方について考えを整理しました。",
    thumbnail: notesThumbnailSrc,
  },
  {
    category: "Frontend",
    date: "2024.04.15",
    title: "CSSアニメーションの基本と実装のコツ",
    description:
      "よく使うアニメーションのパターンと、実装する上で意識しているポイントを紹介します。",
    thumbnail: notesThumbnailSrc,
  },
  {
    category: "Life",
    date: "2024.04.02",
    title: "最近購入した古着とコーディネート",
    description:
      "最近購入した古着と、コーディネートの記録。古着の魅力やおすすめのショップも紹介します。",
    thumbnail: notesThumbnailSrc,
  },
] as const;

export default function Home() {
  const panelRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const sections = panel.querySelectorAll<HTMLElement>("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        root: panel,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative h-screen overflow-hidden bg-background px-4 py-4 text-foreground sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <header
        className="absolute left-6 top-6 z-20 text-2xl font-bold leading-none sm:left-8 sm:top-8 lg:left-10 lg:top-10 lg:text-3xl"
        aria-label="TOMO"
      >
        TOMO.
      </header>

      <main
        ref={panelRef}
        className="relative mx-auto h-[calc(100vh-2rem)] w-full max-w-7xl overflow-y-auto rounded-3xl bg-surface shadow-lg sm:h-[calc(100vh-3rem)] lg:h-[calc(100vh-3.5rem)] lg:w-3/4"
      >
        <section
          id="home"
          data-section
          className="relative grid min-h-full place-items-center px-6 pb-28 pt-24 sm:px-10 lg:px-14 lg:pb-24 lg:pt-16"
          aria-label="Introduction"
        >
          <div className="grid w-full max-w-5xl items-center gap-7 md:grid-cols-2 lg:gap-16">
            <div className="relative z-10">
              <Image
                src="/img/hi!.svg"
                alt="Hi!"
                width={273}
                height={169}
                className="mb-5 h-auto w-44 sm:mb-7 sm:w-48"
                priority
              />
              <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
                I’m TOMO.
              </h1>
              <p className="mt-5 text-xl font-bold leading-tight lg:text-2xl">
                Frontend Engineer
                <br />
                Designer
              </p>
              <p className="mt-5 text-base font-normal leading-8 text-muted lg:mt-6">
                Building thoughtful websites
                <br />
                through code and design.
              </p>
              <a
                className="mt-9 inline-flex items-center border-b border-current pb-1 text-base font-bold leading-none lg:mt-10"
                href="#about"
                onClick={(event) => handleNavClick(event, "about")}
              >
                View About
              </a>
            </div>

            <div
              className="relative mx-auto aspect-[445/313] w-full max-w-lg md:max-w-2xl"
              aria-hidden="true"
            >
              <Image
                src="/img/eyecatch.png"
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 900px) 88vw, 46vw"
                priority
              />
            </div>
          </div>

          <div
            className="absolute bottom-8 left-8 grid justify-items-center gap-4 lg:bottom-16 lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          >
            <span className="relative block h-14 w-px bg-foreground/40 lg:h-16">
              <span className="animate-scroll-dot absolute left-1/2 top-0 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
            </span>
            <p className="m-0 text-xs font-normal">Scroll</p>
          </div>
        </section>

        <section
          id="about"
          data-section
          className="min-h-full px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
          aria-labelledby="about-title"
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
              <div className="lg:pr-14">
                <p className="text-sm font-bold tracking-[0.18em]">ABOUT</p>
                <h2
                  id="about-title"
                  className="mt-3 text-5xl font-bold leading-none lg:text-6xl"
                >
                  TOMO
                </h2>

                <div className="mt-9 space-y-6 text-sm font-normal leading-7 sm:text-base sm:leading-8">
                  <p>
                    約3年半フレンチレストランに勤務したのち、
                    <br />
                    Web業界へ転職。
                  </p>
                  <p>
                    現在はWeb制作会社で、
                    <br />
                    フロントエンドエンジニア・デザイナーとして働いています。
                  </p>
                  <p>
                    実装するだけではなく、
                    <br />
                    長く運用できる設計や、
                    <br />
                    全体を見据えたスケジューリング、
                    <br />
                    クライアントの想いを整理するデザインを
                    <br />
                    大切にしながら制作しています。
                  </p>
                </div>
              </div>

              <div className="grid place-items-center border-t border-foreground/40 pt-12 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
                <Image
                  src="/img/about-profile.png"
                  alt="TOMOのプロフィールイラスト"
                  width={709}
                  height={724}
                  className="h-auto w-64 max-w-full sm:w-full sm:max-w-xs"
                  sizes="(max-width: 1023px) 80vw, 30vw"
                />
              </div>
            </div>

            <div className="mt-14 border-t border-foreground/40 pt-7">
              <h3 className="inline-block border-b border-foreground/60 pb-2 text-lg font-bold">
                好きなもの
              </h3>

              <div className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-0">
                {favorites.map((favorite, index) => (
                  <div
                    key={favorite.label}
                    className={`grid content-start gap-4 ${
                      index === 0
                        ? "sm:pr-8"
                        : "sm:border-l sm:border-foreground/40 sm:px-8"
                    }`}
                  >
                    <h4 className="text-base font-bold">{favorite.label}</h4>
                    <Image
                      src={favorite.src}
                      alt={`${favorite.label}のイラスト`}
                      width={favorite.width}
                      height={favorite.height}
                      className="h-36 w-full object-contain"
                      sizes="(max-width: 639px) 80vw, 22vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="notes"
          data-section
          className="min-h-full px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
          aria-labelledby="notes-title"
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
              <div>
                <p className="text-sm font-bold tracking-[0.18em]">NOTES</p>
                <h2
                  id="notes-title"
                  className="mt-3 text-5xl font-bold leading-none lg:text-6xl"
                >
                  Notes
                </h2>
                <p className="mt-8 text-sm font-bold leading-8 sm:text-base sm:leading-9">
                  日々の制作で学んだことや、
                  <br />
                  フロントエンド、デザイン、好きなものについて
                  <br />
                  メモのように残しています。
                </p>
              </div>

              <div className="relative mx-auto aspect-[1324/507] w-full max-w-md lg:max-w-lg">
                <Image
                  src="/img/notes-eyecatch.png"
                  alt="ノートとペンとマグカップのイラスト"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1023px) 80vw, 34vw"
                />
              </div>
            </div>

            <div className="mt-10 border-t border-foreground/40 pt-7 lg:mt-12">
              <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                {notesPosts.map((post) => (
                  <article
                    key={`${post.category}-${post.date}`}
                    className="grid overflow-hidden rounded-lg bg-white/65 shadow-lg ring-1 ring-foreground/5"
                  >
                    <div className="relative aspect-video overflow-hidden bg-background/70">
                      <Image
                        src={post.thumbnail}
                        alt=""
                        width={1600}
                        height={900}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 639px) 100vw, 10rem"
                      />
                    </div>

                    <div className="grid min-h-64 content-between gap-6 p-5 sm:min-h-60 lg:min-h-64 lg:p-6">
                      <div>
                        <div className="mb-4 flex items-start justify-between gap-4 text-xs font-bold leading-none">
                          <span>{post.category}</span>
                          <time dateTime={post.date.replaceAll(".", "-")}>
                            {post.date}
                          </time>
                        </div>
                        <h3 className="text-lg font-bold leading-8 lg:text-xl lg:leading-9">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-sm font-normal leading-7">
                          {post.description}
                        </p>
                      </div>

                      <a
                        className="inline-flex text-xs font-bold tracking-[0.12em]"
                        href="#notes"
                        aria-label={`${post.title}を読む`}
                      >
                        READ MORE
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-9 flex justify-center lg:mt-10">
                <a
                  className="inline-flex text-xs font-bold tracking-[0.12em]"
                  href="#notes"
                >
                  VIEW ALL NOTES
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          data-section
          className="min-h-full px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
          aria-labelledby="contact-title"
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
              <div>
                <p className="text-sm font-bold tracking-[0.18em]">CONTACT</p>
                <h2
                  id="contact-title"
                  className="mt-3 text-5xl font-bold leading-none lg:text-6xl"
                >
                  Contact
                </h2>
                <p className="mt-8 text-sm font-bold leading-8 sm:text-base sm:leading-9">
                  ご相談・お仕事のご依頼など、
                  <br />
                  お気軽にお問い合わせください。
                  <br />
                  内容を確認後、
                  <br />
                  2〜3営業日以内にご返信いたします。
                </p>
              </div>

              <div className="relative mx-auto aspect-[1120/498] w-full max-w-md lg:max-w-lg">
                <Image
                  src="/img/contact-eyecatch.png"
                  alt="封筒と植物のイラスト"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1023px) 80vw, 34vw"
                />
              </div>
            </div>

            <form
              className="mt-10 border-t border-foreground/40 pt-9 lg:mt-12 lg:pt-10"
              onSubmit={handleContactSubmit}
            >
              <div className="grid gap-6 lg:gap-7">
                <div className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:items-center lg:gap-8">
                  <label className="text-base font-bold" htmlFor="name">
                    お名前
                  </label>
                  <input
                    className="w-full rounded-lg border border-foreground/20 bg-white/40 p-3 text-sm font-normal outline-none transition focus:border-foreground/70"
                    id="name"
                    name="name"
                    placeholder="例）山田 太郎"
                    type="text"
                  />
                </div>

                <div className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:items-center lg:gap-8">
                  <label className="text-base font-bold" htmlFor="email">
                    メールアドレス
                  </label>
                  <input
                    className="w-full rounded-lg border border-foreground/20 bg-white/40 p-3 text-sm font-normal outline-none transition focus:border-foreground/70"
                    id="email"
                    name="email"
                    placeholder="例）tomo@example.com"
                    type="email"
                  />
                </div>

                <div className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:items-center lg:gap-8">
                  <label className="text-base font-bold" htmlFor="budget">
                    ご予算
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none rounded-lg border border-foreground/20 bg-white/40 py-3 pl-3 pr-9 text-sm font-normal text-muted outline-none transition focus:border-foreground/70"
                      id="budget"
                      name="budget"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        選択してください
                      </option>
                      <option value="under-100000">〜10万円</option>
                      <option value="100000-300000">10〜30万円</option>
                      <option value="300000-500000">30〜50万円</option>
                      <option value="over-500000">50万円〜</option>
                      <option value="undecided">未定・相談したい</option>
                    </select>
                    <svg
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-foreground/60"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="m4 6 4 4 4-4"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:gap-8">
                  <label className="text-base font-bold" htmlFor="message">
                    お問い合わせ内容
                  </label>
                  <textarea
                    className="min-h-44 w-full resize-y rounded-lg border border-foreground/20 bg-white/40 p-3 text-sm font-normal leading-8 outline-none transition focus:border-foreground/70"
                    id="message"
                    name="message"
                    placeholder="ご相談内容やご依頼の概要をご記入ください"
                  />
                </div>
              </div>

              <div className="mt-9 flex justify-center">
                <button
                  className="inline-flex h-16 w-full max-w-xs items-center justify-center rounded-lg bg-foreground px-8 text-lg font-bold text-white shadow-lg transition hover:bg-foreground/85 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <nav
        className="absolute bottom-6 left-6 right-6 z-20 lg:bottom-auto lg:left-auto lg:right-12 lg:top-1/2 lg:-translate-y-1/2 xl:right-20"
        aria-label="Primary navigation"
      >
        <ul className="flex justify-between gap-3 lg:grid lg:gap-16">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              {activeSection === item.id ? (
                <span
                  className="absolute -top-3 left-0 h-1.5 w-1.5 rounded-full bg-current lg:-left-6 lg:top-6 lg:h-2.5 lg:w-2.5"
                  aria-hidden="true"
                />
              ) : null}
              <a
                className="grid gap-1 text-xs font-bold leading-none sm:text-sm lg:gap-3 lg:text-base"
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
              >
                <span className="text-xs font-normal lg:text-sm">
                  {item.number}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="absolute bottom-6 left-6 z-20 hidden text-xs font-normal lg:bottom-10 lg:left-10 lg:block lg:text-base">
        © 2024 TOMO.
      </p>
    </div>
  );
}
