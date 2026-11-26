import { useEffect, useState } from 'react';
import MaterialIcon from '../components/MaterialIcon';
import SectionHeading from '../components/SectionHeading';
import { CONTACT, SCOPES, telHref, whatsappHref } from '../data/content';

const MESSAGES = {
  scope: { tone: 'text-ink', text: 'Pick at least one thing you need, so the brief arrives with context' },
  sending: { tone: 'text-muted', text: 'Sending your brief…' },
  sent: { tone: 'text-ok', text: "Thanks, your brief is in my inbox. I'll reply to your email soon." },
};

const LINKS = [
  { label: 'Email', href: `mailto:${CONTACT.email}`, detail: CONTACT.email, icon: 'mail' },
  { label: 'Phone', href: telHref(CONTACT.phone), detail: CONTACT.phone, icon: 'call' },
  { label: 'WhatsApp', href: whatsappHref(CONTACT.phone), detail: 'Message me directly', icon: 'chat' },
  { label: 'GitHub', href: CONTACT.github, detail: 'github.com/shafayhussaindev', icon: 'code' },
  { label: 'LinkedIn', href: CONTACT.linkedin, detail: 'Shafay Hussain', icon: 'work' },
];

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [sent, setSent] = useState(false);

  // The submit button confirms for a moment, then returns to its normal label.
  useEffect(() => {
    if (!sent) return;
    const timer = setTimeout(() => setSent(false), 3000);
    return () => clearTimeout(timer);
  }, [sent]);

  // Posts the brief to /api/contact (api/contact.js), which emails it to me.
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const scope = data.getAll('scope');
    if (scope.length === 0) {
      setStatus('scope');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(data), scope }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error);
      setStatus('sent');
      setSent(true);
      form.reset();
    } catch (error) {
      const text = error.message || 'The message could not be sent right now. Please email or WhatsApp instead.';
      setStatus({ tone: 'text-warn', text: `${text} (${CONTACT.email})` });
    }
  };

  const message = typeof status === 'string' ? MESSAGES[status] : status;
  const sending = status === 'sending';

  return (
    <section id="contact" data-enter className="px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            as="h1"
            label="Start a project"
            title="Have a build in mind?"
            size="text-[clamp(2.25rem,4.2vw,3.5rem)]"
          >
            Tell me what you need and where it is headed. Every inquiry gets a direct reply from me. I'm based in Pakistan and work remotely with clients wherever they are.
          </SectionHeading>
          <p className="reveal mt-6 flex items-center gap-2 text-sm text-soft">
            <span className="led size-2 rounded-full bg-ok" />
            Available for select projects
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {LINKS.map((l, i) => (
              <li key={l.label} className="reveal">
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex h-16 items-center gap-4"
                >
                  <MaterialIcon name={l.icon} size={20} className="text-muted" />
                  <span className="flex-1">
                    <span className="block font-medium">{l.label}</span>
                    <span className="label">{l.detail}</span>
                  </span>
                  <MaterialIcon
                    name="arrow_outward"
                    size={18}
                    className="text-muted transition-colors group-hover:text-ink"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="reveal card p-6 md:p-8 lg:col-span-7">
          <fieldset>
            <legend className="label">What do you need?</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {SCOPES.map((s) => (
                <label key={s} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name="scope"
                    value={s}
                    onChange={() => status === 'scope' && setStatus(null)}
                    className="peer sr-only"
                  />
                  <span className="key inline-flex h-9 items-center rounded-lg px-3 text-sm text-soft hover:text-ink">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="label">Name</span>
              <input name="name" required autoComplete="name" className="field mt-2" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="label">Email</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="field mt-2"
                placeholder="you@company.com"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="label">Brief</span>
            <textarea
              name="brief"
              required
              minLength={20}
              rows={5}
              className="field mt-2 resize-none"
              placeholder="What are you building, who is it for, and when does it need to launch?"
            />
          </label>

          {/* Spam trap: hidden from people, filled in by bots. */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p aria-live="polite" className={`text-sm ${message ? message.tone : 'text-muted'}`}>
              {message ? message.text : 'Goes straight to my inbox. I reply within a day.'}
            </p>
            <button
              type="submit"
              disabled={sending}
              className={`btn self-start disabled:cursor-wait disabled:opacity-70 md:self-auto ${sent ? 'btn-sent' : 'btn-primary'}`}
            >
              {sent ? (
                <span key="sent" className="flex items-center gap-2 animate-[preview-pop_400ms_var(--ease)]">
                  <MaterialIcon name="check" size={18} />
                  Sent
                </span>
              ) : (
                <>
                  {sending ? 'Sending…' : 'Send brief'}
                  <MaterialIcon name="send" size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
