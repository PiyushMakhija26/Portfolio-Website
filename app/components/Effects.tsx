"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { ArrowUpRight, GraduationCap, Globe, LifeBuoy, Smartphone, Users, X } from "lucide-react"

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* Interactive particle network that reacts to the mouse */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    const mouse = { x: -9999, y: -9999 }
    type P = { x: number; y: number; vx: number; vy: number; r: number }
    let pts: P[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.floor((w * h) / 18000))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d = Math.hypot(dx, dy)
        if (d < 160) {
          p.vx += (dx / d) * 0.012
          p.vy += (dy / d) * 0.012
        }
        p.vx *= 0.995
        p.vy *= 0.995
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(94, 234, 212, 0.75)"
        ctx.fill()
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i]
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(167, 139, 250, ${(1 - d / 130) * 0.28})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const m = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y)
        if (m < 170) {
          ctx.strokeStyle = `rgba(244, 114, 182, ${(1 - m / 170) * 0.5})`
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    resize()
    if (reducedMotion()) {
      draw()
      cancelAnimationFrame(raf)
    } else {
      draw()
    }
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return <canvas ref={ref} className="particles" aria-hidden />
}

const SERVICES = [
  { icon: Smartphone, title: "App Development", text: "Mobile and cross-platform apps, from idea and prototype to a working release." },
  { icon: Globe, title: "Website Development", text: "Fast, responsive, modern websites and web apps — portfolios, landing pages, dashboards and more." },
  { icon: GraduationCap, title: "Customized College Projects", text: "Resume-worthy projects tailored to your course and goals, built properly and explained so you can present them with confidence." },
  { icon: LifeBuoy, title: "Web Support", text: "Bug fixes, updates, deployments and ongoing help to keep your site running smoothly." },
  { icon: Users, title: "Build Your Project With Your Team", text: "Hire me to join your team and help build your project — backend, frontend or end to end." },
]

function ServicesModal({ onClose }: { onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    closeBtn.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__panel" role="dialog" aria-modal="true" aria-labelledby="services-title" onClick={(e) => e.stopPropagation()}>
        <button ref={closeBtn} className="modal__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <p className="eyebrow">Services</p>
        <h2 id="services-title" className="h2">
          How I can <span className="gradient-text">help you</span>
        </h2>
        <ul className="services">
          {SERVICES.map((s, i) => (
            <li key={s.title} style={{ ["--i" as string]: i } as CSSProperties}>
              <span className="services__icon">
                <s.icon size={22} />
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="btn btn--glow btn--block"
          onClick={() => {
            onClose()
          }}
        >
          Start a project <ArrowUpRight size={18} />
        </a>
      </div>
    </div>
  )
}

/* Soft spotlight that trails the cursor + scroll progress bar + active nav link */
export function PageChrome({ sections }: { sections: string[] }) {
  const glow = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(sections[0])
  const [scrolled, setScrolled] = useState(false)
  const [hire, setHire] = useState(false)

  useEffect(() => {
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty
    let raf = 0
    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      if (glow.current) glow.current.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      setScrolled(window.scrollY > 20)
      let current = sections[0]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id
      }
      setActive(current)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    if (!reducedMotion()) loop()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [sections])

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden />
      <div className="progress" aria-hidden>
        <div ref={bar} />
      </div>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a href="#top" className="nav__logo">
          <span className="nav__dot" /> PM
        </a>
        <div className="nav__links">
          {sections.map((s) => (
            <a key={s} href={`#${s}`} className={active === s ? "is-active" : ""}>
              {s}
            </a>
          ))}
        </div>
        <button type="button" className="btn btn--sm btn--glow" onClick={() => setHire(true)}>
          Hire me
        </button>
      </nav>
      {hire && <ServicesModal onClose={() => setHire(false)} />}
    </>
  )
}

/* Fade/slide in when scrolled into view */
export function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: {
  children: ReactNode
  delay?: number
  className?: string
  from?: "up" | "left" | "right" | "zoom"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal reveal--${from} ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Typewriter that cycles through phrases */
export function Typing({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState("")

  useEffect(() => {
    if (reducedMotion()) {
      setText(phrases[0])
      return
    }
    let i = 0
    let n = 0
    let del = false
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      const full = phrases[i]
      n += del ? -1 : 1
      setText(full.slice(0, n))
      let wait = del ? 35 : 75
      if (!del && n === full.length) {
        del = true
        wait = 1500
      } else if (del && n === 0) {
        del = false
        i = (i + 1) % phrases.length
        wait = 300
      }
      t = setTimeout(tick, wait)
    }
    tick()
    return () => clearTimeout(t)
  }, [phrases])

  return (
    <span className="typing">
      {text}
      <i className="typing__caret" />
    </span>
  )
}

/* Count up when visible */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (reducedMotion()) return setV(to)
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - start) / 1400, 1)
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])

  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  )
}

/* 3D tilt + moving spotlight on hover */
export function Tilt({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty("--rx", `${(0.5 - py) * max}deg`)
    el.style.setProperty("--ry", `${(px - 0.5) * max}deg`)
    el.style.setProperty("--mx", `${px * 100}%`)
    el.style.setProperty("--my", `${py * 100}%`)
  }
  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
  }

  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  )
}

/* Button that gently pulls toward the cursor */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const leave = () => {
    if (ref.current) ref.current.style.transform = ""
  }
  return (
    <span ref={ref} className="magnetic" onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  )
}

/* Contact form: posts to FormSubmit, which emails the message to `to` */
export function ContactForm({ to }: { to: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setStatus("sending")
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          message: f.get("message"),
          _subject: `Portfolio message from ${f.get("name")}`,
          _replyto: f.get("email"),
          _captcha: "false",
        }),
      })
      const data = await res.json()
      if (!res.ok || data.success === "false" || data.success === false) throw new Error(data.message)
      form.reset()
      setStatus("sent")
    } catch {
      setStatus("error")
    }
    setTimeout(() => setStatus("idle"), 5000)
  }
  const style = (i: number): CSSProperties => ({ ["--i" as string]: i })
  const label = { idle: "Send message", sending: "Sending…", sent: "Message sent ✓", error: "Couldn't send — try again" }[status]

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__row">
        <label className="field" style={style(0)}>
          <input name="name" required placeholder=" " />
          <span>Name</span>
        </label>
        <label className="field" style={style(1)}>
          <input name="email" type="email" required placeholder=" " />
          <span>Email</span>
        </label>
      </div>
      <label className="field" style={style(2)}>
        <textarea name="message" required rows={5} placeholder=" " />
        <span>Tell me about your project…</span>
      </label>
      <button className={`btn btn--glow btn--block ${status === "sent" ? "is-sent" : ""}`} type="submit" disabled={status === "sending"}>
        {label}
      </button>
    </form>
  )
}

/* Profile photo with an initials fallback if the image is missing or broken */
export function Avatar({ src, alt, initials }: { src: string; alt: string; initials: string }) {
  const [ok, setOk] = useState(true)
  const img = useRef<HTMLImageElement>(null)
  // the error can fire before hydration, so also check once mounted
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth === 0) setOk(false)
  }, [])
  return ok ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={img} src={src} alt={alt} className="avatar__img" onError={() => setOk(false)} />
  ) : (
    <div className="avatar__img avatar__fallback" role="img" aria-label={alt}>
      {initials}
    </div>
  )
}
