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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="relative h-screen overflow-hidden bg-background bg-[radial-gradient(circle_at_8%_12%,rgb(255_255_255/0.72),transparent_25%),radial-gradient(circle_at_88%_86%,rgb(224_210_202/0.58),transparent_30%)] px-3 py-3 text-foreground selection:bg-foreground/15 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
      <header
        className="absolute left-3 right-3 top-3 z-20 rounded-t-[1.75rem] border-b border-foreground/10 bg-[#faf8f6]/90 px-6 py-5 text-lg font-bold leading-none shadow-[0_12px_30px_rgba(72,54,44,0.06)] backdrop-blur-md sm:left-6 sm:right-6 sm:top-6 sm:rounded-t-3xl sm:px-8 sm:text-xl lg:left-10 lg:right-auto lg:top-10 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:text-3xl lg:shadow-none lg:backdrop-blur-none"
      >
        <div className="flex items-center justify-between lg:block">
          <span>TOMO.</span>
          <button
            className="grid size-8 place-items-center lg:hidden"
            type="button"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span
                className={`absolute inset-x-0 top-1/2 block h-px w-full origin-center bg-current transition-transform ${
                  isMenuOpen
                    ? "-translate-y-1/2 rotate-45"
                    : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current transition-opacity ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 block h-px w-full origin-center bg-current transition-transform ${
                  isMenuOpen
                    ? "-translate-y-1/2 -rotate-45"
                    : "translate-y-[4px]"
                }`}
              />
            </span>
          </button>
        </div>

        {isMenuOpen ? (
          <nav
            id="mobile-navigation"
            className="mt-5 border-t border-foreground/10 pt-3 lg:hidden"
            aria-label="Mobile primary navigation"
          >
            <ul className="grid">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    className={`grid grid-cols-[2rem_0.5rem_1fr] items-center gap-3 rounded-xl px-2 py-3 text-sm transition-colors ${
                      activeSection === item.id ? "bg-foreground/5" : ""
                    }`}
                    href={`#${item.id}`}
                    onClick={(event) => {
                      handleNavClick(event, item.id);
                      setIsMenuOpen(false);
                    }}
                    aria-current={
                      activeSection === item.id ? "location" : undefined
                    }
                  >
                    <span className="text-xs font-normal">{item.number}</span>
                    <span
                      className={`block size-1.5 rounded-full ${
                        activeSection === item.id
                          ? "bg-foreground"
                          : "bg-foreground/20"
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>

      <main
        ref={panelRef}
        className="relative mx-auto h-[calc(100vh-1.5rem)] w-full max-w-7xl overflow-y-auto rounded-[1.75rem] border border-white/70 bg-surface shadow-[0_24px_70px_rgba(72,54,44,0.12)] sm:h-[calc(100vh-3rem)] sm:rounded-3xl lg:h-[calc(100vh-3.5rem)] lg:w-3/4"
      >
        <section
          id="home"
          data-section
          className="relative grid min-h-full place-items-center px-7 pb-20 pt-24 sm:px-12 lg:px-16 lg:pb-24 lg:pt-16"
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
              <h1 className="text-5xl font-bold leading-[1.08] lg:text-6xl">
                I’m TOMO.
              </h1>
              <p className="mt-5 text-xl font-bold leading-tight lg:text-2xl">
                Frontend Engineer
                <br />
                Designer
              </p>
              <p className="mt-5 text-base leading-8 text-muted lg:mt-6">
                Building thoughtful websites
                <br />
                through code and design.
              </p>
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
            <p className="m-0 text-xs">Scroll</p>
          </div>
        </section>

        <section
          id="about"
          data-section
          className="min-h-full px-7 py-20 sm:px-12 lg:px-16 lg:py-24"
          aria-labelledby="about-title"
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
              <div className="lg:pr-14">
                <p className="text-sm font-bold">ABOUT</p>
                <h2
                  id="about-title"
                  className="mt-3 text-5xl font-bold leading-none lg:text-6xl"
                >
                  TOMO
                </h2>

                <div className="mt-9 space-y-6 text-sm leading-7 sm:text-base sm:leading-8">
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

              <div className="grid place-items-center border-t border-foreground/20 pt-12 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
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

            <div className="mt-16 border-t border-foreground/20 pt-8">
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
                        : "sm:border-l sm:border-foreground/20 sm:px-8"
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
          className="min-h-full px-7 py-20 sm:px-12 lg:px-16 lg:py-24"
          aria-labelledby="notes-title"
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
              <div>
                <p className="text-sm font-bold">NOTES</p>
                <h2
                  id="notes-title"
                  className="mt-3 text-5xl font-bold leading-none lg:text-6xl"
                >
                  Notes
                </h2>
                <p className="mt-8 text-sm leading-8 sm:text-base sm:leading-9">
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

            <div className="mt-12 border-t border-foreground/20 pt-8">
              <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                {notesPosts.map((post) => (
                  <article
                    key={`${post.category}-${post.date}`}
                    className="group grid overflow-hidden rounded-2xl border border-white/80 bg-white/65 shadow-[0_12px_36px_rgba(72,54,44,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(72,54,44,0.13)]"
                  >
                    <div className="relative aspect-video overflow-hidden bg-background/70">
                      <Image
                        src={post.thumbnail}
                        alt=""
                        width={1600}
                        height={900}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 639px) 100vw, 10rem"
                      />
                    </div>

                    <div className="grid min-h-60 content-between gap-6 p-5 lg:p-6">
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
                        <p className="mt-3 text-sm leading-7 text-muted">
                          {post.description}
                        </p>
                      </div>

                      <a
                        className="inline-flex w-fit text-xs font-bold transition-opacity hover:opacity-55"
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
                  className="inline-flex border-b border-current pb-1 text-xs font-bold transition-opacity hover:opacity-55"
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
          className="min-h-full px-7 py-20 sm:px-12 lg:px-16 lg:py-24"
          aria-labelledby="contact-title"
        >
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
              <div>
                <p className="text-sm font-bold">CONTACT</p>
                <h2
                  id="contact-title"
                  className="mt-3 text-5xl font-bold leading-none lg:text-6xl"
                >
                  Contact
                </h2>
                <p className="mt-8 text-sm leading-8 sm:text-base sm:leading-9">
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
              className="mt-12 border-t border-foreground/20 pt-9 lg:pt-10"
              onSubmit={handleContactSubmit}
            >
              <div className="grid gap-6 lg:gap-7">
                <div className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:items-center lg:gap-8">
                  <label className="text-base font-bold" htmlFor="name">
                    お名前
                  </label>
                  <input
                    className="w-full rounded-xl border border-foreground/15 bg-white/60 p-3 text-sm outline-none transition placeholder:text-muted/60 hover:border-foreground/30 focus:border-foreground/55 focus:ring-3 focus:ring-foreground/7"
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
                    className="w-full rounded-xl border border-foreground/15 bg-white/60 p-3 text-sm outline-none transition placeholder:text-muted/60 hover:border-foreground/30 focus:border-foreground/55 focus:ring-3 focus:ring-foreground/7"
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
                      className="w-full appearance-none rounded-xl border border-foreground/15 bg-white/60 py-3 pl-3 pr-9 text-sm text-muted outline-none transition hover:border-foreground/30 focus:border-foreground/55 focus:ring-3 focus:ring-foreground/7"
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
                    className="min-h-44 w-full resize-y rounded-xl border border-foreground/15 bg-white/60 p-3 text-sm leading-7 outline-none transition placeholder:text-muted/60 hover:border-foreground/30 focus:border-foreground/55 focus:ring-3 focus:ring-foreground/7"
                    id="message"
                    name="message"
                    placeholder="ご相談内容やご依頼の概要をご記入ください"
                  />
                </div>
              </div>

              <div className="mt-9 flex justify-center">
                <button
                  className="inline-flex h-14 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-8 text-base font-bold text-white shadow-[0_10px_24px_rgba(10,10,10,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-foreground/85 hover:shadow-[0_14px_28px_rgba(10,10,10,0.22)] focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background"
                  type="submit"
                >
                  送信する
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <nav
        className="absolute right-12 top-1/2 z-20 hidden -translate-y-1/2 lg:block xl:right-20"
        aria-label="Primary navigation"
      >
        <ul className="grid gap-16">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <span
                className={`absolute -left-6 top-6 h-2.5 w-2.5 rounded-full transition-colors ${
                  activeSection === item.id
                    ? "bg-foreground"
                    : "bg-foreground/20"
                }`}
                aria-hidden="true"
              />
              <a
                className={`grid gap-3 text-base font-bold leading-none transition-opacity ${
                  activeSection === item.id
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
              >
                <span className="text-sm">
                  {item.number}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="absolute bottom-10 left-0 right-[87.5%] z-20 hidden pr-6 text-right text-xs leading-5 lg:block">
        © TOMO. All Rights Reserved.
      </p>
    </div>
  );
}
