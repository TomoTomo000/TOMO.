"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type MouseEvent,
} from "react";

const navItems = [
  { number: "01", label: "Home", id: "home" },
  { number: "02", label: "About", id: "about" },
  { number: "03", label: "Notes", id: "notes" },
  { number: "04", label: "Contact", id: "contact" },
] as const;

type SectionId = (typeof navItems)[number]["id"];

type NotePost = {
  id: string;
  category: "Frontend" | "Design" | "Life";
  publishedAt: string;
  title: string;
  description: string;
  thumbnail: string;
};

const sectionIds = navItems.map((item) => item.id);
const notesThumbnailSrc =
  "https://placehold.co/1600x900/f7f3f0/0a0a0a/png?text=NO%20IMAGE";
const notesPosts = [
  {
    id: "nextjs-app-router-notes",
    category: "Frontend",
    publishedAt: "2024-05-12",
    title: "Next.jsのApp Routerを使って開発してみて感じたこと",
    description:
      "実際のプロジェクトでApp Routerを導入してみて、良かった点やハマったポイントをまとめました。",
    thumbnail: notesThumbnailSrc,
  },
  {
    id: "layout-spacing",
    category: "Design",
    publishedAt: "2024-04-28",
    title: "余白を意識したレイアウトの作り方",
    description:
      "デザインにおける余白の役割や、心地よい余白の取り方について考えを整理しました。",
    thumbnail: notesThumbnailSrc,
  },
  {
    id: "css-animation-basics",
    category: "Frontend",
    publishedAt: "2024-04-15",
    title: "CSSアニメーションの基本と実装のコツ",
    description:
      "よく使うアニメーションのパターンと、実装する上で意識しているポイントを紹介します。",
    thumbnail: notesThumbnailSrc,
  },
  {
    id: "vintage-clothes",
    category: "Life",
    publishedAt: "2024-04-02",
    title: "最近購入した古着とコーディネート",
    description:
      "最近購入した古着と、コーディネートの記録。古着の魅力やおすすめのショップも紹介します。",
    thumbnail: notesThumbnailSrc,
  },
] satisfies readonly NotePost[];

const formControlClassName =
  "w-full rounded-xl border border-foreground/15 bg-surface text-sm outline-none transition placeholder:text-muted/60 hover:border-foreground/30 focus:border-foreground/55 focus:ring-3 focus:ring-foreground/7";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function NoteCard({ post }: { post: NotePost }) {
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-white/70 bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-raised">
      <div className="relative aspect-video overflow-hidden bg-background/70">
        <Image
          src={post.thumbnail}
          alt=""
          width={1600}
          height={900}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1023px) 100vw, 34vw"
        />
      </div>

      <div className="grid min-h-60 content-between gap-6 p-5 lg:p-6">
        <div>
          <div className="mb-4 flex items-start justify-between gap-4 text-xs font-bold leading-none">
            <span>{post.category}</span>
            <time dateTime={post.publishedAt}>
              {post.publishedAt.replaceAll("-", ".")}
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
  );
}

export function PortfolioPage() {
  const panelRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    const sections = sectionIds.flatMap((id) => {
      const section = panel.querySelector<HTMLElement>(`#${id}`);
      return section ? [{ id, element: section }] : [];
    });
    const updateActiveSection = () => {
      const panelRect = panel.getBoundingClientRect();
      const panelCenter = panelRect.top + panelRect.height / 2;
      let nextSection: SectionId | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach(({ id, element }) => {
        const sectionRect = element.getBoundingClientRect();
        const distance =
          panelCenter < sectionRect.top
            ? sectionRect.top - panelCenter
            : panelCenter > sectionRect.bottom
              ? panelCenter - sectionRect.bottom
              : 0;

        if (distance < closestDistance) {
          nextSection = id;
          closestDistance = distance;
        }
      });

      const selectedSection = nextSection;

      if (selectedSection) {
        setActiveSection((currentSection) =>
          currentSection === selectedSection ? currentSection : selectedSection,
        );
      }
    };
    const observer = new IntersectionObserver(updateActiveSection, {
      root: panel,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    });

    sections.forEach(({ element }) => observer.observe(element));
    const initialFrame = window.requestAnimationFrame(updateActiveSection);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: SectionId,
  ) => {
    const panel = panelRef.current;
    const target = panel?.querySelector<HTMLElement>(`#${sectionId}`);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    if (event.detail === 0) {
      target.querySelector<HTMLElement>("h1, h2")?.focus({
        preventScroll: true,
      });
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative h-dvh bg-background bg-[radial-gradient(circle_at_8%_12%,rgb(255_255_255/0.72),transparent_25%),radial-gradient(circle_at_88%_86%,rgb(224_210_202/0.58),transparent_30%)] p-3 sm:p-6 lg:px-8 lg:py-7">
      <header className="absolute left-3 right-3 top-3 z-20 rounded-t-panel border-b border-foreground/10 bg-chrome/90 px-6 py-5 text-lg font-bold leading-none shadow-soft backdrop-blur-md sm:left-6 sm:right-6 sm:top-6 sm:rounded-t-3xl sm:px-8 sm:text-xl lg:left-10 lg:right-auto lg:top-10 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:text-3xl lg:shadow-none lg:backdrop-blur-none">
        <div className="flex items-center justify-between lg:block">
          <span>TOMO.</span>
          <button
            ref={menuButtonRef}
            className="grid size-8 place-items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground lg:hidden"
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
        className="relative mx-auto h-full w-full max-w-7xl overflow-y-auto rounded-panel border border-white/70 bg-surface shadow-panel sm:rounded-3xl lg:w-3/4"
      >
        <section
          id="home"
          data-section
          className="relative grid min-h-full place-items-center px-7 pb-20 pt-24 sm:px-12 lg:px-16 lg:pb-24 lg:pt-16"
          aria-label="Introduction"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <h1
              className="text-5xl font-bold leading-[1.08] lg:text-6xl"
              tabIndex={-1}
            >
              Hello.I’m TOMO.
            </h1>
            <p className="mt-5 text-xl font-bold leading-tight lg:text-2xl">
              Frontend Engineer | Web Designer
            </p>
            <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-muted lg:mt-6">
              Building thoughtful websites through code and design.
            </p>
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
                <h2
                  id="about-title"
                  className="text-5xl font-bold leading-none lg:text-6xl"
                  tabIndex={-1}
                >
                  ABOUT
                </h2>

                <div className="mt-8">
                  <p className="text-3xl font-bold">TOMO</p>
                  <div className="mt-4 space-y-6 text-sm leading-7 sm:text-base sm:leading-8">
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
              </div>

              <div className="grid place-items-center border-t border-foreground/60 pt-12 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
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
                <h2
                  id="notes-title"
                  className="text-5xl font-bold leading-none lg:text-6xl"
                  tabIndex={-1}
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

            <div className="pt-9 lg:pt-10">
              <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                {notesPosts.map((post) => (
                  <NoteCard key={post.id} post={post} />
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
                <h2
                  id="contact-title"
                  className="text-5xl font-bold leading-none lg:text-6xl"
                  tabIndex={-1}
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

            <div className="pt-9 lg:pt-10">
              <form onSubmit={handleContactSubmit}>
                <div className="grid gap-6 lg:gap-7">
                  <div className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:items-center lg:gap-8">
                    <label className="text-base font-bold" htmlFor="name">
                      お名前
                    </label>
                    <input
                      className={`${formControlClassName} p-3`}
                      id="name"
                      name="name"
                      placeholder="例）山田 太郎"
                      type="text"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:items-center lg:gap-8">
                    <label className="text-base font-bold" htmlFor="email">
                      メールアドレス
                    </label>
                    <input
                      className={`${formControlClassName} p-3`}
                      id="email"
                      name="email"
                      placeholder="例）tomo@example.com"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:items-center lg:gap-8">
                    <label className="text-base font-bold" htmlFor="budget">
                      ご予算
                    </label>
                    <div className="relative">
                      <select
                        className={`${formControlClassName} appearance-none py-3 pl-3 pr-9 text-muted`}
                        id="budget"
                        name="budget"
                        defaultValue=""
                        required
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
                      className={`${formControlClassName} min-h-44 resize-y p-3 leading-7`}
                      id="message"
                      name="message"
                      placeholder="ご相談内容やご依頼の概要をご記入ください"
                      required
                    />
                  </div>
                </div>

                <div className="mt-9 flex justify-center">
                  <button
                    className="inline-flex h-14 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-8 text-base font-bold text-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:bg-foreground/85 hover:shadow-raised focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background"
                    type="submit"
                  >
                    送信する
                  </button>
                </div>
              </form>
            </div>
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
                <span className="text-sm">{item.number}</span>
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
