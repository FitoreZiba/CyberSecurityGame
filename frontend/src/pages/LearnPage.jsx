import { useState } from 'react'

const TOPICS = [
    {
        id: 'phishing',
        icon: '🎣',
        title: 'What is Phishing?',
        color: 'amber',
        border: 'border-cyber-amber/40',
        bg: 'bg-cyber-amber/10',
        accent: 'text-cyber-amber',
        glow: 'glow-amber',
        difficulty: 'BEGINNER',
        readTime: '3 min read',
        summary: 'Phishing is when bad guys pretend to be someone you trust to trick you into giving away passwords or personal information.',
        sections: [
            {
                heading: '🤔 What is Phishing?',
                content: `Imagine you get a letter pretending to be from your school, asking for your home address and phone number. That would be suspicious, right? Phishing works the same way — but online!

Phishing is when a scammer pretends to be someone trustworthy (like your bank, Google, or even a friend) to trick you into clicking a fake link or giving away your personal information like passwords, credit card numbers, or your address.

The word "phishing" sounds like "fishing" — because scammers are "fishing" for your information, hoping you'll take the bait!`,
            },
            {
                heading: '🚩 Warning Signs of Phishing',
                content: `Here are the biggest red flags to watch for:

- URGENCY — "Act NOW or your account will be deleted!" Real companies don't panic you.
- TOO GOOD TO BE TRUE — "You won a free iPhone!" You can't win something you didn't enter.
- WRONG EMAIL ADDRESS — support@paypa1.com uses "1" instead of "l". Always check carefully!
- ASKING FOR PASSWORDS — No real company ever asks for your password by email.
- BAD SPELLING — Lots of typos and grammar mistakes are a big warning sign.
- SCARY THREATS — "Your account has been hacked!" This is to make you panic and click without thinking.`,
            },
            {
                heading: '📧 Types of Phishing',
                content: `Email Phishing — The most common type. You get a fake email pretending to be from a company you know.

Spear Phishing — A targeted attack where the scammer knows your name and personal details, making it more convincing.

Smishing — Phishing via SMS text messages. "Your parcel could not be delivered, click here."

Vishing — Phishing via phone calls. Someone calls pretending to be from your bank or Microsoft.

Clone Phishing — A real email you received is copied exactly, but the links are replaced with fake ones.`,
            },
            {
                heading: '🛡️ How to Stay Safe',
                content: `• Always check the full email address — not just the name shown.
- Hover over links before clicking to see the real destination URL.
- When in doubt, go directly to the website by typing it yourself.
- Never enter passwords after clicking a link from an email.
- Use two-factor authentication (2FA) so even stolen passwords aren't enough.
- Report suspicious emails to an adult or your IT department.
- If it feels wrong, it probably is — trust your instincts!`,
            },
        ],
    },
    {
        id: 'passwords',
        icon: '🔐',
        title: 'Password Safety',
        color: 'green',
        border: 'border-cyber-green/40',
        bg: 'bg-cyber-green/10',
        accent: 'text-cyber-green',
        glow: 'glow-green',
        difficulty: 'BEGINNER',
        readTime: '4 min read',
        summary: 'A strong password is your first line of defence online. Learn how to create passwords that even the smartest hackers cannot crack.',
        sections: [
            {
                heading: '🔑 Why Passwords Matter',
                content: `Your password is like the key to your house. If someone has it, they can get into everything — your emails, social media, bank accounts, and more.

Every year, millions of accounts get hacked because people use weak passwords. The most common password in the world is still "password" — and the second most common is "123456"! These get cracked in less than one second.

A good password is the single most important thing you can do to protect yourself online.`,
            },
            {
                heading: '💪 What Makes a Strong Password?',
                content: `LENGTH — The longer, the better! Each extra character makes it exponentially harder to crack. Aim for at least 12 characters.

MIX IT UP — Use uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and symbols (!@#$%^&*).

UNPREDICTABLE — Don't use your name, birthday, pet's name, or anything someone could guess about you.

UNIQUE — Never use the same password on two different websites. If one site gets hacked, all your accounts are at risk.

THE PASSPHRASE METHOD — Try stringing 4 random words together: Coffee!Rocket$Mountain7Tree — long, memorable, and incredibly hard to crack!`,
            },
            {
                heading: '❌ Passwords You Should NEVER Use',
                content: `These passwords are cracked in under one second by hackers:

- password, password1, Password123
- 123456, 12345678, 123456789
- qwerty, qwerty123, keyboard
- Your name, your birthday, your pet's name
- Your school name, your favourite sports team
- abc123, letmein, welcome
- Any single word from the dictionary

If your password is on this list — change it right now!`,
            },
            {
                heading: '🗝️ Password Managers',
                content: `Remembering 50 different strong passwords is impossible for humans — but that's exactly what password managers are for!

A password manager is an app that:
- Generates super-strong unique passwords for every website
- Remembers all your passwords so you don't have to
- Automatically fills in your passwords when you visit a site
- Protects everything with one single master password

Popular password managers: Bitwarden (free!), 1Password, Dashlane, LastPass.

Ask a parent or teacher to help you set one up — it's one of the best things you can do for your online safety!`,
            },
            {
                heading: '📱 Two-Factor Authentication (2FA)',
                content: `Even the strongest password can sometimes be stolen. That's where 2FA comes in!

Two-factor authentication means that logging in requires TWO things:
1. Something you KNOW — your password
2. Something you HAVE — your phone (a code is sent to it)

Even if a hacker steals your password, they still can't get in without your phone. It's like a bank vault with two keys — both are needed to open it.

Always turn on 2FA wherever it's available — especially for email and social media!`,
            },
        ],
    },
    {
        id: 'malware',
        icon: '🦠',
        title: 'Malware & Viruses',
        color: 'cyan',
        border: 'border-cyber-cyan/40',
        bg: 'bg-cyber-cyan/10',
        accent: 'text-cyber-cyan',
        glow: 'glow-cyan',
        difficulty: 'INTERMEDIATE',
        readTime: '4 min read',
        summary: 'Malware is malicious software designed to damage or gain unauthorised access to your computer. Learn to spot and stop it.',
        sections: [
            {
                heading: '🦠 What is Malware?',
                content: `Malware is short for "malicious software" — any program designed to harm your computer or steal your information without your knowledge.

Think of it like a biological virus, but for computers. Just like how a cold virus spreads from person to person, computer malware spreads from device to device through downloads, emails, and websites.

Malware is created by cybercriminals to steal money, spy on people, or cause damage — and there are millions of new malware programs created every single year.`,
            },
            {
                heading: '🔍 Types of Malware',
                content: `Virus — Attaches itself to files and spreads when you share them. Like a biological virus it needs a "host" to travel.

Trojan Horse — Pretends to be a legitimate program (like a free game) but secretly does harmful things once installed. Named after the famous Greek story!

Ransomware — Locks all your files and demands money (ransom) to unlock them. Very dangerous for businesses and schools.

Spyware — Secretly watches everything you do — websites visited, passwords typed, even turning on your webcam without you knowing.

Adware — Bombards you with unwanted adverts and pop-ups. Usually less harmful but very annoying.

Cryptojacker — Uses your computer's power to mine cryptocurrency for the attacker, making your computer very slow.`,
            },
            {
                heading: '⚠️ Warning Signs Your Device is Infected',
                content: `• Your computer is suddenly very slow for no reason
- You see lots of pop-up adverts even when not browsing
- Programs crash or stop working randomly
- Your internet is much slower than usual
- Strange new programs appear that you didn't install
- Your webcam light turns on by itself
- Files have disappeared or been renamed
- Your friends say they're getting weird messages from you

If you notice any of these signs, tell an adult or IT teacher immediately!`,
            },
            {
                heading: '🛡️ How to Stay Protected',
                content: `• Never download software from unofficial websites — only use trusted sources like official app stores.
- Never open email attachments you weren't expecting, especially .exe, .zip, or .doc files.
- Keep your operating system and apps updated — updates fix security holes.
- Use a good antivirus program and keep it updated.
- Don't disable your antivirus even if a website tells you to.
- Be very suspicious of anything that offers something for free that normally costs money.
- Never plug in a USB drive you found somewhere — it could contain malware.
- Always back up your important files so ransomware can't destroy them.`,
            },
        ],
    },
    {
        id: 'fake-websites',
        icon: '🌐',
        title: 'Fake Websites',
        color: 'purple',
        border: 'border-cyber-purple/40',
        bg: 'bg-cyber-purple/10',
        accent: 'text-cyber-purple',
        glow: 'glow-purple',
        difficulty: 'INTERMEDIATE',
        readTime: '3 min read',
        summary: 'Fake websites are designed to look identical to real ones to steal your login details and personal information.',
        sections: [
            {
                heading: '🌐 What are Fake Websites?',
                content: `Imagine an exact copy of your bank's website — same logo, same colours, same layout — but run by criminals who record everything you type, including your password and card number. That's exactly what fake websites do.

Cybercriminals create websites that look identical to real ones to trick you into entering your username, password, credit card details, or other personal information. This is called "spoofing."

These fake sites can be shared through phishing emails, fake adverts, or even appear in search engine results.`,
            },
            {
                heading: '🔍 How to Spot a Fake Website',
                content: `CHECK THE URL — Look at the address bar very carefully:
- paypa1.com (number 1 instead of letter l)
- amazon-security-alert.net (Amazon never uses this domain)
- secure-login.netflix-accounts.verify-now.com (real domain is verify-now.com!)

LOOK FOR HTTPS — The padlock icon means your connection is encrypted. But beware — fake sites can have padlocks too! HTTPS does NOT guarantee the site is real.

CHECK THE DESIGN — Poor image quality, broken layouts, or odd fonts can indicate a fake site.

LOOK FOR CONTACT INFO — Real companies have clear contact pages, privacy policies, and physical addresses.

CHECK THE DATE — Newly registered domains (you can check with WHOIS) are suspicious.`,
            },
            {
                heading: '🧠 Understanding URLs',
                content: `The URL (web address) is your most powerful tool for spotting fake sites. Here is how to read one:

https://secure-login.paypal.com.fake-site.com/login

Breaking this down:
- "https" — the protocol (connection type)
- "secure-login.paypal.com" — this looks official but it is a SUBDOMAIN
- "fake-site.com" — this is the REAL DOMAIN — the part just before the first /
- "/login" — this is just the page path

The REAL domain is always the last part before the first forward slash. Everything to the left of it is just a subdomain that anyone can create!`,
            },
            {
                heading: '✅ Safe Browsing Habits',
                content: `• Type important website addresses directly into your browser — don't click links in emails.
- Bookmark sites you use regularly (bank, school, shopping) so you always go to the real one.
- Before entering any password, double-check the full URL in the address bar.
- If you're unsure, close the tab and search for the official website from a search engine.
- Never enter payment information on a site without HTTPS (though HTTPS alone isn't enough!).
- Use a browser with built-in phishing protection (Chrome, Firefox, and Edge all have this).
- If a site asks for unnecessary personal information — leave immediately.`,
            },
        ],
    },
    {
        id: 'spam',
        icon: '📧',
        title: 'Spam & Unwanted Messages',
        color: 'pink',
        border: 'border-cyber-pink/40',
        bg: 'bg-cyber-pink/10',
        accent: 'text-cyber-pink',
        glow: '',
        difficulty: 'BEGINNER',
        readTime: '2 min read',
        summary: 'Spam is unsolicited junk messages sent in bulk. Learn the difference between spam, scams, and legitimate emails.',
        sections: [
            {
                heading: '📧 What is Spam?',
                content: `Spam is any unsolicited (unwanted) message sent in bulk to lots of people at once. It gets its name from a famous Monty Python comedy sketch!

Most spam is annoying but harmless — like adverts for products you never asked about. But some spam is genuinely dangerous — containing phishing links, malware attachments, or scam offers.

About 45% of all email sent worldwide is spam — that's roughly 150 billion spam messages every single day!`,
            },
            {
                heading: '🚦 Types of Messages — Good vs Bad',
                content: `SAFE (Legitimate) ✅
- Newsletter you signed up for
- Order confirmation from a shop
- Password reset you requested
- Message from a known contact

SPAM (Annoying but usually safe) ⚠️
- Adverts from companies you never contacted
- Mass marketing emails
- Chain letters asking you to forward

DANGEROUS 🚨
- Emails claiming you won a prize
- Messages asking for your password
- Urgent warnings about your account
- Emails with unexpected attachments
- Messages asking you to pay money`,
            },
            {
                heading: '🛡️ Staying Safe from Spam',
                content: `• Use your email provider's spam filter — Gmail, Outlook, and others are very good at catching spam.
- Never reply to spam — it confirms your email address is active, causing more spam.
- Never click "unsubscribe" in suspicious emails — it can confirm your address is active.
- Don't share your email address publicly on social media or websites.
- Use a separate email address for signing up to websites and apps.
- Report spam using your email app's "Report Spam" button.
- Never forward chain messages — they spread spam and misinformation.`,
            },
        ],
    },
    {
        id: 'privacy',
        icon: '🕵️',
        title: 'Online Privacy',
        color: 'blue',
        border: 'border-cyber-blue/40',
        bg: 'bg-cyber-blue/10',
        accent: 'text-cyber-blue',
        glow: '',
        difficulty: 'BEGINNER',
        readTime: '3 min read',
        summary: 'Your personal information is valuable. Learn how to protect your privacy and what information should always stay private.',
        sections: [
            {
                heading: '🕵️ What is Online Privacy?',
                content: `Online privacy means controlling who can see your personal information when you use the internet. Every website you visit, every app you use, and every account you create collects data about you.

This information includes things like your name, age, location, interests, and browsing habits. This data is very valuable — companies buy and sell it, and criminals want to steal it.

Understanding privacy helps you make smart choices about what you share and with whom.`,
            },
            {
                heading: '🔒 What Information Should Stay Private?',
                content: `ALWAYS KEEP PRIVATE 🚨:
- Full name + school name + location together
- Home address
- Phone number
- Passwords
- Photos of your home or school
- Daily routine (when you're home alone, what route you walk)

BE CAREFUL WITH ⚠️:
- Email address (use a separate one for websites)
- Date of birth
- Photos of yourself
- Social media accounts on public setting

OK TO SHARE GENERALLY ✅:
- Username / gamertag
- General interests and hobbies
- Favourite books, games, or music`,
            },
            {
                heading: '🌍 Your Digital Footprint',
                content: `Every time you go online, you leave a "digital footprint" — a trail of data showing what you did, where you went, and what you said.

This footprint is permanent. Photos posted online can be shared and saved by others. Comments you make can be screenshotted. Once something is on the internet, it can be almost impossible to remove.

Before you post anything online, ask yourself: "Would I be happy if my teacher, parent, or future employer saw this?" If the answer is no — don't post it!`,
            },
            {
                heading: '⚙️ Privacy Settings',
                content: `Most social media apps and websites have privacy settings that let you control who sees your information. Here's what to do:

- Set social media profiles to PRIVATE — only people you approve can see your posts.
- Review app permissions — does a game really need access to your camera and contacts?
- Use different usernames on different platforms — harder to track across sites.
- Regularly check what data apps have collected about you.
- Use a VPN (Virtual Private Network) when on public WiFi to encrypt your traffic.
- Clear cookies and browsing history regularly.
- Read privacy policies before signing up to new services (or ask an adult to help).`,
            },
        ],
    },
    {
        id: 'cyber-safety',
        icon: '🛡️',
        title: 'General Cyber Safety',
        color: 'green',
        border: 'border-cyber-green/40',
        bg: 'bg-cyber-green/10',
        accent: 'text-cyber-green',
        glow: 'glow-green',
        difficulty: 'BEGINNER',
        readTime: '3 min read',
        summary: 'Core cybersecurity habits that everyone should practice every day to stay safe online.',
        sections: [
            {
                heading: '🛡️ The Golden Rules of Cyber Safety',
                content: `Just like there are rules for staying safe in the real world (look both ways before crossing the road!), there are rules for staying safe online.

These golden rules will protect you from the vast majority of online threats — and they are simpler than you might think!`,
            },
            {
                heading: '📋 Your Cyber Safety Checklist',
                content: `PASSWORDS ✅
□ Use a unique strong password for every account
□ Enable two-factor authentication (2FA)
□ Use a password manager
□ Never share passwords with friends

EMAILS & MESSAGES ✅
□ Think before clicking links
□ Check email addresses carefully
□ Never open unexpected attachments
□ Report suspicious messages

DOWNLOADS & SOFTWARE ✅
□ Only download from official sources
□ Keep all software and apps updated
□ Keep antivirus software active
□ Don't install software that disables your security

SOCIAL MEDIA & PRIVACY ✅
□ Set profiles to private
□ Think before posting — it's permanent
□ Don't share personal information publicly
□ Only connect with people you know in real life

DEVICES ✅
□ Lock your devices with a PIN or password
□ Don't leave devices unattended in public
□ Back up your important files regularly
□ Use secure WiFi — avoid public hotspots for sensitive tasks`,
            },
            {
                heading: '🆘 What To Do If Something Goes Wrong',
                content: `If you think you have been hacked, scammed, or targeted online:

1. DON'T PANIC — It happens to adults too. You're not in trouble for being tricked.

2. TELL AN ADULT — A parent, teacher, or trusted adult can help you report it and fix it.

3. CHANGE YOUR PASSWORDS — Especially for email and any account that might be affected.

4. CHECK YOUR ACCOUNTS — Look for anything strange like purchases you didn't make.

5. REPORT IT — In the UK, report to Action Fraud. In the US, report to the FTC at reportfraud.ftc.gov.

6. LEARN FROM IT — Every experience makes you a better cyber detective!`,
            },
        ],
    },
]

const DIFF_STYLES = {
    BEGINNER:     'bg-cyber-green/20  text-cyber-green  border-cyber-green/40',
    INTERMEDIATE: 'bg-cyber-amber/20  text-cyber-amber  border-cyber-amber/40',
    ADVANCED:     'bg-cyber-danger/20 text-cyber-danger border-cyber-danger/40',
}

const COLOR_BTN = {
    amber:  'bg-cyber-amber  text-cyber-bg hover:shadow-[0_0_20px_rgba(255,215,64,0.5)]',
    green:  'bg-cyber-green  text-cyber-bg hover:shadow-[0_0_20px_rgba(0,230,118,0.5)]',
    cyan:   'bg-cyber-cyan   text-cyber-bg hover:shadow-[0_0_20px_rgba(24,255,255,0.5)]',
    purple: 'bg-cyber-purple text-white    hover:shadow-[0_0_20px_rgba(224,64,251,0.5)]',
    pink:   'bg-cyber-pink   text-white    hover:shadow-[0_0_20px_rgba(255,64,129,0.5)]',
    blue:   'bg-cyber-blue   text-white    hover:shadow-[0_0_20px_rgba(68,138,255,0.5)]',
}

export default function LearnPage() {
    const [selected, setSelected] = useState(null)
    const [openSection, setOpenSection] = useState(null)

    const topic = TOPICS.find(t => t.id === selected)

    // ── Topic detail view ───────────────────────────
    if (topic) return (
        <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">

            {/* Back button */}
            <button
                onClick={() => { setSelected(null); setOpenSection(null) }}
                className="flex items-center gap-2 font-display font-bold text-sm tracking-widest uppercase text-cyber-secondary border-2 border-cyber-muted/30 rounded-xl px-4 py-2 hover:text-white hover:border-cyber-secondary transition-all mb-8"
            >
                ← BACK TO TOPICS
            </button>

            {/* Header */}
            <div className={`${topic.bg} border-2 ${topic.border} rounded-2xl p-8 mb-8`}>
                <div className="flex items-start gap-5">
                    <div className="text-6xl animate-float shrink-0">{topic.icon}</div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
              <span className={`font-mono text-xs px-3 py-1 rounded-lg border-2 ${DIFF_STYLES[topic.difficulty]}`}>
                {topic.difficulty}
              </span>
                            <span className="font-mono text-xs text-cyber-muted">📖 {topic.readTime}</span>
                        </div>
                        <h1 className={`font-display font-bold text-4xl ${topic.accent} ${topic.glow} mb-3`}>
                            {topic.title}
                        </h1>
                        <p className="font-body text-cyber-secondary text-lg leading-relaxed">
                            {topic.summary}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sections — accordion style */}
            <div className="flex flex-col gap-4">
                {topic.sections.map((section, i) => (
                    <div
                        key={i}
                        className={`bg-cyber-card border-2 rounded-2xl overflow-hidden transition-all duration-300
              ${openSection === i ? topic.border : 'border-white/10 hover:border-white/25'}`}
                    >
                        {/* Section header */}
                        <button
                            onClick={() => setOpenSection(openSection === i ? null : i)}
                            className="w-full flex items-center justify-between px-6 py-5 text-left"
                        >
                            <h2 className="font-display font-bold text-xl text-white">{section.heading}</h2>
                            <span className={`text-2xl transition-transform duration-300 ${openSection === i ? 'rotate-180' : ''} ${topic.accent}`}>
                ▾
              </span>
                        </button>

                        {/* Section content */}
                        {openSection === i && (
                            <div className="px-6 pb-6 animate-fade-in">
                                <div className={`h-0.5 ${topic.bg} mb-5 rounded`} />
                                {section.content.split('\n').map((line, j) => (
                                    line.trim() === '' ? (
                                        <div key={j} className="h-3" />
                                    ) : line.startsWith('•') ? (
                                        <div key={j} className="flex items-start gap-3 mb-2">
                                            <span className={`${topic.accent} mt-0.5 shrink-0`}>●</span>
                                            <p className="font-body text-white/85 text-base leading-relaxed">
                                                {line.replace('•', '').trim()}
                                            </p>
                                        </div>
                                    ) : line.startsWith('□') ? (
                                        <div key={j} className="flex items-start gap-3 mb-2">
                                            <span className="text-cyber-muted mt-0.5 shrink-0">☐</span>
                                            <p className="font-body text-white/85 text-base leading-relaxed">
                                                {line.replace('□', '').trim()}
                                            </p>
                                        </div>
                                    ) : (
                                        <p key={j} className="font-body text-white/85 text-base leading-relaxed mb-2">
                                            {line}
                                        </p>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className={`mt-8 ${topic.bg} border-2 ${topic.border} rounded-2xl p-6 text-center`}>
                <p className="font-display font-bold text-lg text-white mb-2">
                    Ready to test your knowledge? 🎮
                </p>
                <p className="font-body text-cyber-secondary text-sm mb-5">
                    Now that you have read about {topic.title.toLowerCase()}, try the related challenge!
                </p>
                <button
                    onClick={() => setSelected(null)}
                    className={`px-6 py-3 font-display font-bold text-sm tracking-widest uppercase rounded-xl transition-all ${COLOR_BTN[topic.color]}`}
                >
                    BACK TO ALL TOPICS →
                </button>
            </div>
        </div>
    )

    // ── Topic grid ──────────────────────────────────
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">

            <div className="mb-10">
                <p className="font-mono text-cyber-green text-sm mb-2">● KNOWLEDGE BASE</p>
                <h1 className="font-display font-bold text-5xl text-white mb-3">
                    📚 Learn & <span className="text-gradient-green">Level Up</span>
                </h1>
                <p className="font-body text-cyber-secondary text-xl max-w-2xl">
                    Before you play the challenges, read up on the topics! The more you know, the better agent you become. 🕵️
                </p>
            </div>

            {/* Topic grid */}
            <div className="grid grid-cols-3 gap-5 mb-10">
                {TOPICS.map((topic, i) => (
                    <button
                        key={topic.id}
                        onClick={() => { setSelected(topic.id); setOpenSection(0) }}
                        className={`
              text-left bg-cyber-card border-2 ${topic.border}/50
              hover:${topic.border} rounded-2xl p-6
              hover:scale-105 transition-all duration-200 animate-fade-in
              group
            `}
                        style={{ animationDelay: `${i * 0.08}s` }}
                    >
                        <div className="text-5xl mb-4 group-hover:animate-float">{topic.icon}</div>
                        <div className="flex items-center gap-2 mb-3">
              <span className={`font-mono text-xs px-2 py-0.5 rounded-lg border ${DIFF_STYLES[topic.difficulty]}`}>
                {topic.difficulty}
              </span>
                            <span className="font-mono text-xs text-cyber-muted">{topic.readTime}</span>
                        </div>
                        <h2 className={`font-display font-bold text-xl ${topic.accent} mb-2`}>
                            {topic.title}
                        </h2>
                        <p className="font-body text-cyber-secondary text-sm leading-relaxed">
                            {topic.summary}
                        </p>
                        <div className={`mt-4 font-display font-bold text-sm ${topic.accent} flex items-center gap-2`}>
                            READ MORE <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Quick tips banner */}
            <div className="bg-cyber-panel border-2 border-cyber-amber/30 rounded-2xl p-8">
                <h2 className="font-display font-bold text-2xl text-cyber-amber glow-amber mb-5">
                    ⚡ Quick Cyber Safety Tips
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { tip: 'Never share your password with anyone — not even your best friend!', icon: '🔐' },
                        { tip: 'If an email feels wrong — delete it. Trust your instincts!', icon: '🗑️' },
                        { tip: 'Think before you click! Hover over links to see where they really go.', icon: '🖱️' },
                        { tip: 'Keep your apps and devices updated — updates fix security holes.', icon: '🔄' },
                        { tip: 'Back up your files regularly so hackers can\'t hold them hostage.', icon: '💾' },
                        { tip: 'Use 2FA everywhere — it makes stolen passwords useless to hackers.', icon: '📱' },
                    ].map(({ tip, icon }) => (
                        <div key={tip} className="flex items-start gap-3 bg-cyber-card border border-cyber-amber/20 rounded-xl p-4">
                            <span className="text-2xl shrink-0">{icon}</span>
                            <p className="font-body text-white/80 text-sm leading-relaxed">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}