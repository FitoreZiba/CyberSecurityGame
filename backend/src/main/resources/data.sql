-- ─────────────────────────────────────────────
-- GAME CATEGORIES
-- ─────────────────────────────────────────────
INSERT INTO game_category (id, name, description) VALUES
                                                      (1, 'Spot the Phishing',    'Analyze emails and decide if they are safe, spam, or phishing attempts.'),
                                                      (2, 'Build a Strong Password', 'Choose or construct strong passwords and learn best practices.'),
                                                      (3, 'Detect Malware',       'Decide whether files, downloads, or actions are safe or harmful.'),
                                                      (4, 'Fake Website Checker', 'Inspect URLs and website details to identify fake or dangerous sites.')
    ON CONFLICT (id) DO NOTHING;


-- ─────────────────────────────────────────────
-- QUESTIONS: Category 1 — Spot the Phishing
-- ─────────────────────────────────────────────
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (1,
                                                                                               'You receive an email from "support@paypa1.com" saying your account is suspended. It asks you to click a link to verify your identity. What is this?',
                                                                                               'Phishing',
                                                                                               'The domain "paypa1.com" uses the number 1 instead of the letter l — a classic typosquatting trick. Legitimate PayPal emails always come from paypal.com. Never click links in unsolicited emails asking you to verify your account.',
                                                                                               'BEGINNER', 1),

                                                                                              (2,
                                                                                               'An email from "hr@yourcompany.com" says: "Hi team, please find the meeting notes attached." The attachment is called "meeting_notes.exe". What should you do?',
                                                                                               'Delete it — the .exe attachment is dangerous',
                                                                                               'Legitimate meeting notes are never .exe files. An executable file disguised as a document is a major malware red flag. Even if the sender address looks real, the email could be spoofed. Never open unexpected .exe attachments.',
                                                                                               'BEGINNER', 1),

                                                                                              (3,
                                                                                               'You get an email from "noreply@amazon-security-alert.net" saying unusual activity was detected on your account. It urges you to log in immediately via the link provided. What is this?',
                                                                                               'Phishing',
                                                                                               'Amazon sends emails from amazon.com domains only — never from "amazon-security-alert.net". Attackers register lookalike domains to fool users. Always check the full domain, not just the brand name in the email.',
                                                                                               'BEGINNER', 1),

                                                                                              (4,
                                                                                               'Your bank emails you a monthly statement PDF. The sender is "statements@yourbank.com", there is no urgency, no links — just a PDF attachment. What is this?',
                                                                                               'Legitimate email',
                                                                                               'This has all the hallmarks of a safe email: known sender domain, no urgency, no suspicious links, and a relevant PDF attachment. Always look for urgency, spoofed domains, and unexpected links as the real red flags.',
                                                                                               'BEGINNER', 1),

                                                                                              (5,
                                                                                               'An email says: "You have won a $500 Amazon gift card! Click here to claim in the next 10 minutes or lose your prize." The sender is "prizes@amaz0n-gifts.co". What is this?',
                                                                                               'Phishing / Scam',
                                                                                               'Fake urgency and a prize you never entered are classic social engineering tactics. The domain "amaz0n-gifts.co" is not Amazon. Legitimate companies do not pressure you with countdown timers to claim prizes via email.',
                                                                                               'BEGINNER', 1),

                                                                                              (6,
                                                                                               'A colleague forwards you an email from "ceo@yourcompany-corp.net" urgently asking you to buy $500 in gift cards and send the codes. The real CEO domain is "yourcompany.com". What is this?',
                                                                                               'CEO Fraud / Spear Phishing',
                                                                                               'This is a Business Email Compromise (BEC) attack. Attackers register a similar domain and impersonate executives to trick employees into sending money or gift cards. Always verify unusual financial requests through a separate channel like a phone call.',
                                                                                               'INTERMEDIATE', 1),

                                                                                              (7,
                                                                                               'You receive a password reset email you did not request from "security@google.com". It contains a link to "accounts.google.com.reset-password.xyz/verify". Where does the link actually go?',
                                                                                               'To a fake phishing site — not Google',
                                                                                               'The real domain is everything after the last dot before the path. Here that is "reset-password.xyz", not google.com. Attackers put "accounts.google.com" as a subdomain to fool you. Always read the full URL carefully.',
                                                                                               'INTERMEDIATE', 1),

                                                                                              (8,
                                                                                               'An email arrives with no greeting, poor grammar, and says: "Dear Customer your account will close unless you update your informations at the link below." What red flags are present?',
                                                                                               'Urgency, poor grammar, and a vague greeting',
                                                                                               'Three classic phishing signals: impersonal greeting, grammatical errors, and manufactured urgency. Legitimate companies personalize emails, use correct grammar, and never threaten immediate account closure to force quick action.',
                                                                                               'BEGINNER', 1),

                                                                                              (9,
                                                                                               'You get a LinkedIn connection request email from "notifications@linkedln.com" (note the extra n). What is this?',
                                                                                               'Phishing — typosquatted LinkedIn domain',
                                                                                               'The domain "linkedln.com" has an extra "n". This is a typosquatting attack that mimics LinkedIn notifications. Always hover over links and inspect the exact domain spelling before clicking.',
                                                                                               'INTERMEDIATE', 1),

                                                                                              (10,
                                                                                               'An email from your IT department says: "We are upgrading our systems. Please reply with your username and password so we can migrate your account." What should you do?',
                                                                                               'Refuse — IT departments never ask for passwords',
                                                                                               'No legitimate IT department, bank, or service will ever ask for your password via email. This is a credential harvesting attack. Report it to your real IT department immediately.',
                                                                                               'BEGINNER', 1);


-- options for category 1 questions
INSERT INTO question_options (question_id, options) VALUES
                                                        (1,  'Legitimate email'),
                                                        (1,  'Spam'),
                                                        (1,  'Phishing'),
                                                        (1,  'Newsletter'),

                                                        (2,  'Open it to check the content'),
                                                        (2,  'Delete it — the .exe attachment is dangerous'),
                                                        (2,  'Forward it to colleagues'),
                                                        (2,  'Reply asking for a PDF version'),

                                                        (3,  'Legitimate Amazon security alert'),
                                                        (3,  'Spam newsletter'),
                                                        (3,  'Phishing'),
                                                        (3,  'Automated system email'),

                                                        (4,  'Phishing attempt'),
                                                        (4,  'Legitimate email'),
                                                        (4,  'Spam'),
                                                        (4,  'Malware delivery'),

                                                        (5,  'Legitimate prize notification'),
                                                        (5,  'Spam'),
                                                        (5,  'Phishing / Scam'),
                                                        (5,  'Marketing email'),

                                                        (6,  'Legitimate request from CEO'),
                                                        (6,  'Spam'),
                                                        (6,  'CEO Fraud / Spear Phishing'),
                                                        (6,  'Internal IT request'),

                                                        (7,  'To Google account recovery'),
                                                        (7,  'To a fake phishing site — not Google'),
                                                        (7,  'To your email provider'),
                                                        (7,  'To a Google partner site'),

                                                        (8,  'Urgency only'),
                                                        (8,  'Poor grammar only'),
                                                        (8,  'Urgency, poor grammar, and a vague greeting'),
                                                        (8,  'Nothing — it looks legitimate'),

                                                        (9,  'Legitimate LinkedIn notification'),
                                                        (9,  'Spam'),
                                                        (9,  'Phishing — typosquatted LinkedIn domain'),
                                                        (9,  'Automated recruiter message'),

                                                        (10, 'Comply and reply with credentials'),
                                                        (10, 'Refuse — IT departments never ask for passwords'),
                                                        (10, 'Reply asking for more details'),
                                                        (10, 'Forward to a colleague');


-- ─────────────────────────────────────────────
-- QUESTIONS: Category 2 — Build a Strong Password
-- ─────────────────────────────────────────────
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (11,
                                                                                               'Which of these passwords is the strongest?',
                                                                                               'Tr0ub4dor&3#Sky!',
                                                                                               '"Tr0ub4dor&3#Sky!" combines uppercase, lowercase, numbers, and symbols across 16 characters, making it extremely hard to crack. "password123" and "qwerty" are among the most common passwords in the world and are cracked instantly.',
                                                                                               'BEGINNER', 2),

                                                                                              (12,
                                                                                               'You need to create a memorable but strong password. Which method is most secure?',
                                                                                               'A passphrase: "Coffee!Rocket$Mountain7Tree"',
                                                                                               'Passphrases combine multiple random words with symbols and numbers. They are long (which is the most important factor in password strength) yet memorable. Length beats complexity — a 25-character passphrase is stronger than an 8-character complex password.',
                                                                                               'BEGINNER', 2),

                                                                                              (13,
                                                                                               'Which of the following is the WORST password practice?',
                                                                                               'Using the same password on every website',
                                                                                               'Password reuse is the most dangerous habit. If one site is breached, attackers use credential stuffing to try your password on every other site. Always use unique passwords for every account.',
                                                                                               'BEGINNER', 2),

                                                                                              (14,
                                                                                               'A website forces you to use exactly 8 characters, one uppercase, one number. What does this tell you about the site?',
                                                                                               'The site likely stores passwords poorly (e.g., plain text or weak hashing)',
                                                                                               'Maximum length limits and overly specific rules suggest the site may store passwords in plain text or use a weak hashing algorithm with fixed-length fields. Good sites let you use long passphrases freely.',
                                                                                               'INTERMEDIATE', 2),

                                                                                              (15,
                                                                                               'What is a "brute force" attack on a password?',
                                                                                               'Trying every possible combination of characters until the right one is found',
                                                                                               'Brute force attacks systematically try every combination. This is why length matters so much — adding just one character multiplies the combinations exponentially. A 12-character password takes billions of times longer to brute force than an 8-character one.',
                                                                                               'BEGINNER', 2),

                                                                                              (16,
                                                                                               'You use the password "P@ssw0rd!" on your work account. How secure is it?',
                                                                                               'Very weak — it is on every attacker dictionary list',
                                                                                               'Despite looking complex, "P@ssw0rd!" is one of the most common "complex-looking" passwords and appears in every password cracking dictionary. Attackers try these first before brute forcing.',
                                                                                               'BEGINNER', 2),

                                                                                              (17,
                                                                                               'What is the safest way to store your many unique passwords?',
                                                                                               'Use a reputable password manager',
                                                                                               'Password managers generate, store, and autofill strong unique passwords for every site. They encrypt your vault with one master password. This is the industry-recommended approach — security experts all use them.',
                                                                                               'BEGINNER', 2),

                                                                                              (18,
                                                                                               'Which adds the most security to a password-protected account?',
                                                                                               'Enabling two-factor authentication (2FA)',
                                                                                               '2FA means even if your password is stolen, the attacker cannot access your account without the second factor (your phone, an authenticator app, etc.). It is the single most effective account security improvement you can make.',
                                                                                               'BEGINNER', 2),

                                                                                              (19,
                                                                                               'A hacker obtains a database of hashed passwords. Your password hash is cracked in 0.002 seconds. What was likely wrong with your password?',
                                                                                               'It was too short or too common — found in a rainbow table',
                                                                                               'Rainbow tables are precomputed lists of password hashes. Short or common passwords are cracked instantly. Long, unique passwords combined with proper salting by the website make rainbow table attacks infeasible.',
                                                                                               'INTERMEDIATE', 2),

                                                                                              (20,
                                                                                               'How often should you change your passwords?',
                                                                                               'Only when you suspect a breach or when a service you use is compromised',
                                                                                               'NIST (the US security standards body) updated its guidelines in 2020: forced regular password changes actually reduce security because users choose weaker, predictable passwords. Change passwords when there is a reason — a breach, a shared device, or suspected compromise.',
                                                                                               'ADVANCED', 2);


INSERT INTO question_options (question_id, options) VALUES
                                                        (11, 'password123'),
                                                        (11, 'Tr0ub4dor&3#Sky!'),
                                                        (11, 'qwerty12345'),
                                                        (11, 'MyName1990'),

                                                        (12, 'Your pet name + birth year'),
                                                        (12, 'A passphrase: "Coffee!Rocket$Mountain7Tree"'),
                                                        (12, 'A keyboard pattern like "qwerty!@#"'),
                                                        (12, 'Your company name + "123"'),

                                                        (13, 'Using a password manager'),
                                                        (13, 'Enabling 2FA'),
                                                        (13, 'Using the same password on every website'),
                                                        (13, 'Using a passphrase'),

                                                        (14, 'The site has excellent security'),
                                                        (14, 'The site likely stores passwords poorly (e.g., plain text or weak hashing)'),
                                                        (14, 'The site is GDPR compliant'),
                                                        (14, 'Nothing — all sites do this'),

                                                        (15, 'Guessing based on personal info'),
                                                        (15, 'Trying every possible combination of characters until the right one is found'),
                                                        (15, 'Using stolen password lists'),
                                                        (15, 'Intercepting network traffic'),

                                                        (16, 'Very strong — it uses symbols and numbers'),
                                                        (16, 'Moderate — acceptable for low-risk accounts'),
                                                        (16, 'Very weak — it is on every attacker dictionary list'),
                                                        (16, 'Strong enough if changed monthly'),

                                                        (17, 'Write them in a notebook'),
                                                        (17, 'Use a reputable password manager'),
                                                        (17, 'Save them in your browser only'),
                                                        (17, 'Use the same base password with variations'),

                                                        (18, 'Making the password longer'),
                                                        (18, 'Changing it every 30 days'),
                                                        (18, 'Enabling two-factor authentication (2FA)'),
                                                        (18, 'Using a different browser'),

                                                        (19, 'The hashing algorithm was too new'),
                                                        (19, 'The website stored it incorrectly'),
                                                        (19, 'It was too short or too common — found in a rainbow table'),
                                                        (19, 'The attacker got lucky'),

                                                        (20, 'Every 30 days'),
                                                        (20, 'Every 90 days as IT policy requires'),
                                                        (20, 'Never change it once set'),
                                                        (20, 'Only when you suspect a breach or when a service you use is compromised');


-- ─────────────────────────────────────────────
-- QUESTIONS: Category 3 — Detect Malware
-- ─────────────────────────────────────────────
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (21,
                                                                                               'You download a free video converter from a site. The installer asks permission to install a "search toolbar" and change your homepage. What should you do?',
                                                                                               'Decline and uncheck all optional software',
                                                                                               'Bundled software installers are one of the most common adware and PUP (Potentially Unwanted Program) delivery methods. Always choose "Custom Install", read every screen, and uncheck anything you did not ask for.',
                                                                                               'BEGINNER', 3),

                                                                                              (22,
                                                                                               'Your computer suddenly becomes very slow, the fan runs constantly, and you notice unknown processes using 90% CPU. What could this indicate?',
                                                                                               'Cryptomining malware (cryptojacker)',
                                                                                               'These are classic signs of a cryptojacker — malware that hijacks your CPU to mine cryptocurrency for attackers. Check Task Manager for unknown high-CPU processes and run a malware scan immediately.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (23,
                                                                                               'A popup appears saying "YOUR COMPUTER HAS 47 VIRUSES! Call Microsoft Support at 1-800-XXX-XXXX immediately!" What is this?',
                                                                                               'A scareware / tech support scam',
                                                                                               'Microsoft never displays phone numbers in browser popups. This is scareware — fake alerts designed to frighten you into calling a premium-rate scam number or installing fake "antivirus" software that is itself malware.',
                                                                                               'BEGINNER', 3),

                                                                                              (24,
                                                                                               'You open an email attachment called "Invoice_2024.pdf.exe". What is this file most likely?',
                                                                                               'Malware disguised as a PDF',
                                                                                               'The real extension is .exe — the .pdf in the name is meant to fool you. Windows hides file extensions by default, making this trick highly effective. Legitimate invoices are never executable files.',
                                                                                               'BEGINNER', 3),

                                                                                              (25,
                                                                                               'All your files suddenly have a ".locked" extension and a README appears demanding Bitcoin to restore them. What happened?',
                                                                                               'You have been infected with ransomware',
                                                                                               'Ransomware encrypts your files and demands payment for the decryption key. Disconnect from the network immediately to stop spread. Never pay — it encourages attackers and payment does not guarantee file recovery. Restore from backups.',
                                                                                               'BEGINNER', 3),

                                                                                              (26,
                                                                                               'A free game you pirated is flagged by Windows Defender as a "Trojan". Your friend says it is a false positive. What should you do?',
                                                                                               'Delete the file and trust the antivirus warning',
                                                                                               'Pirated software is one of the top malware delivery methods. Trojans disguise themselves as legitimate programs. "False positive" is the most common excuse used to bypass security warnings. Trust your antivirus over strangers online.',
                                                                                               'BEGINNER', 3),

                                                                                              (27,
                                                                                               'You notice your webcam light turns on randomly when you are not using it. What could this mean?',
                                                                                               'A Remote Access Trojan (RAT) may have compromised your system',
                                                                                               'Unexpected webcam activation is a major red flag for a RAT — malware that gives attackers remote control of your computer including camera and microphone. Run a full malware scan and cover your webcam as a temporary precaution.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (28,
                                                                                               'Which behavior is a strong indicator that a file is malware?',
                                                                                               'It requests admin privileges, disables antivirus, and contacts an external server',
                                                                                               'This combination of behaviors is the classic malware signature: privilege escalation to gain control, disabling defenses to persist, and command-and-control communication to receive instructions. Any one of these alone is suspicious; all three together is definitive.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (29,
                                                                                               'You receive a Word document that asks you to "Enable Macros" to view the content. What should you do?',
                                                                                               'Do not enable macros — this is a common malware delivery technique',
                                                                                               'Macro-based malware was responsible for some of the largest corporate breaches in history. Legitimate documents rarely need macros enabled. If a document aggressively asks you to enable macros, treat it as malware.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (30,
                                                                                               'What is the best defense against ransomware?',
                                                                                               'Regular offline backups of your important files',
                                                                                               'Backups are the only guaranteed recovery from ransomware. Offline or cloud backups that are not connected to your main system cannot be encrypted by ransomware. Regular backups make ransomware attacks largely ineffective.',
                                                                                               'BEGINNER', 3);


INSERT INTO question_options (question_id, options) VALUES
                                                        (21, 'Accept everything — it is part of the software'),
                                                        (21, 'Decline and uncheck all optional software'),
                                                        (21, 'Cancel the installation entirely'),
                                                        (21, 'Only accept the toolbar'),

                                                        (22, 'Normal Windows update activity'),
                                                        (22, 'Cryptomining malware (cryptojacker)'),
                                                        (22, 'The computer needs a RAM upgrade'),
                                                        (22, 'A background antivirus scan'),

                                                        (23, 'A real Microsoft security warning'),
                                                        (23, 'A scareware / tech support scam'),
                                                        (23, 'A legitimate antivirus alert'),
                                                        (23, 'A Windows system notification'),

                                                        (24, 'A normal PDF invoice'),
                                                        (24, 'A corrupted file'),
                                                        (24, 'Malware disguised as a PDF'),
                                                        (24, 'A compressed archive'),

                                                        (25, 'A Windows update went wrong'),
                                                        (25, 'Your hard drive is failing'),
                                                        (25, 'You have been infected with ransomware'),
                                                        (25, 'A file system error occurred'),

                                                        (26, 'Disable Windows Defender and run the game'),
                                                        (26, 'Add an exception in antivirus and run it'),
                                                        (26, 'Delete the file and trust the antivirus warning'),
                                                        (26, 'Ask your friend to send their copy'),

                                                        (27, 'The camera has a hardware glitch'),
                                                        (27, 'A Remote Access Trojan (RAT) may have compromised your system'),
                                                        (27, 'A video conferencing app is updating'),
                                                        (27, 'Windows is running a camera diagnostic'),

                                                        (28, 'It has a large file size'),
                                                        (28, 'It requests admin privileges, disables antivirus, and contacts an external server'),
                                                        (28, 'It runs slowly on older hardware'),
                                                        (28, 'It creates temporary files during installation'),

                                                        (29, 'Enable macros — the document requires it'),
                                                        (29, 'Do not enable macros — this is a common malware delivery technique'),
                                                        (29, 'Enable macros only if you know the sender'),
                                                        (29, 'Forward the document to IT to enable macros'),

                                                        (30, 'A good antivirus subscription'),
                                                        (30, 'Never opening emails'),
                                                        (30, 'Regular offline backups of your important files'),
                                                        (30, 'Using a VPN at all times');


-- ─────────────────────────────────────────────
-- QUESTIONS: Category 4 — Fake Website Checker
-- ─────────────────────────────────────────────
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (31,
                                                                                               'You want to visit PayPal. You type it into Google and click the first result, which goes to "www.paypa1.com/login". Is this safe?',
                                                                                               'No — the domain uses "1" instead of "l" (typosquatting)',
                                                                                               'Typosquatting replaces letters with numbers or similar-looking characters. "paypa1.com" with the number 1 is not PayPal. Always type important URLs directly into the address bar rather than searching, and bookmark sites you visit frequently.',
                                                                                               'BEGINNER', 4),

                                                                                              (32,
                                                                                               'A website shows a padlock icon (HTTPS) in the address bar. Does this mean the site is safe and legitimate?',
                                                                                               'No — HTTPS only means the connection is encrypted, not that the site is trustworthy',
                                                                                               'HTTPS means data between you and the site is encrypted — but the site itself could still be a phishing page. Attackers routinely use free SSL certificates on fake sites. A padlock is necessary but not sufficient proof of legitimacy.',
                                                                                               'INTERMEDIATE', 4),

                                                                                              (33,
                                                                                               'You land on "http://192.168.1.104/banking/login". What is suspicious about this URL?',
                                                                                               'Legitimate banks use domain names, not raw IP addresses',
                                                                                               'Real banking sites never use raw IP addresses in their URLs. An IP-based URL for a login page is a strong indicator of a phishing site or a local network attack (like a router compromise).',
                                                                                               'INTERMEDIATE', 4),

                                                                                              (34,
                                                                                               'A site URL is "https://secure-login.netflix-accounts.verify-now.com". What is the real domain?',
                                                                                               'verify-now.com — the rest are subdomains',
                                                                                               'The real domain is always the last part before the first single slash: "verify-now.com". Everything to the left is a subdomain. Attackers use "secure-login.netflix-accounts" as subdomains to make the URL look legitimate at a glance.',
                                                                                               'ADVANCED', 4),

                                                                                              (35,
                                                                                               'A website asks for your credit card to "verify your age" for free content. The site has no privacy policy, no company address, and the copyright says 2019. What should you do?',
                                                                                               'Leave immediately — these are red flags of a scam site',
                                                                                               'Multiple red flags: no privacy policy (illegal in most countries), no contact information, and outdated copyright suggest a scam or abandoned/compromised site. Never enter payment info on sites missing basic legitimacy signals.',
                                                                                               'BEGINNER', 4),

                                                                                              (36,
                                                                                               'You hover over a link in an email that says "Click here to track your package". The status bar shows "http://track-parcel.ru/fedex". What should you do?',
                                                                                               'Do not click — the domain is suspicious and does not belong to FedEx',
                                                                                               'The actual destination URL is shown in the status bar when you hover. "track-parcel.ru" (a Russian domain) has nothing to do with FedEx. Attackers use display text like "Click here" to hide the real destination.',
                                                                                               'BEGINNER', 4),

                                                                                              (37,
                                                                                               'How can you check if a website domain was registered recently (e.g., yesterday)?',
                                                                                               'Use a WHOIS lookup tool to check the domain registration date',
                                                                                               'WHOIS services (whois.domaintools.com, etc.) show when a domain was registered. Phishing sites are often registered days or hours before an attack. A legitimate business domain is usually years old.',
                                                                                               'ADVANCED', 4),

                                                                                              (38,
                                                                                               'A pop-up on a website says "Your browser is out of date! Download the update now to continue." The button downloads a file called "ChromeUpdate.exe". What is this?',
                                                                                               'Malware — browsers update through official channels, never website popups',
                                                                                               'Chrome, Firefox, and all legitimate browsers update automatically through their own update systems — never via a download from a random website. This is a drive-by download attack delivering malware.',
                                                                                               'BEGINNER', 4),

                                                                                              (39,
                                                                                               'What does it mean if a website has an EV (Extended Validation) SSL certificate?',
                                                                                               'The organization has been verified by a certificate authority — it adds trust but is not a guarantee',
                                                                                               'EV certificates (shown as a green company name in some browsers) require the organization to prove legal identity to a Certificate Authority. They add a meaningful layer of trust but sophisticated attackers have sometimes obtained them. They are a positive signal, not absolute proof.',
                                                                                               'ADVANCED', 4),

                                                                                              (40,
                                                                                               'You visit an online shop with great prices. It has no HTTPS, asks for payment via bank transfer only, has stock photos for all products, and no return policy. What is this?',
                                                                                               'A scam / fake webshop',
                                                                                               'Every single element is a scam indicator: no HTTPS, bank transfer only (untraceable), stock photos instead of real product photos, and no consumer protections. Legitimate shops offer card payments, real photos, and clear return policies.',
                                                                                               'BEGINNER', 4);


INSERT INTO question_options (question_id, options) VALUES
                                                        (31, 'Yes — it looks like PayPal'),
                                                        (31, 'No — the domain uses "1" instead of "l" (typosquatting)'),
                                                        (31, 'Yes — Google only shows legitimate results'),
                                                        (31, 'It depends on whether you have antivirus installed'),

                                                        (32, 'Yes — HTTPS guarantees the site is safe'),
                                                        (32, 'No — HTTPS only means the connection is encrypted, not that the site is trustworthy'),
                                                        (32, 'Yes — only verified companies can get HTTPS'),
                                                        (32, 'No — HTTPS means the site is government regulated'),

                                                        (33, 'Nothing — IP addresses are normal for banking sites'),
                                                        (33, 'The site is using an older URL format'),
                                                        (33, 'Legitimate banks use domain names, not raw IP addresses'),
                                                        (33, 'The bank is using a private network'),

                                                        (34, 'netflix-accounts.verify-now.com'),
                                                        (34, 'netflix.com'),
                                                        (34, 'verify-now.com — the rest are subdomains'),
                                                        (34, 'secure-login.com'),

                                                        (35, 'Enter a virtual card number for safety'),
                                                        (35, 'Leave immediately — these are red flags of a scam site'),
                                                        (35, 'Proceed — HTTPS means it is safe'),
                                                        (35, 'Contact their support first'),

                                                        (36, 'Click it — the link text says FedEx so it is safe'),
                                                        (36, 'Do not click — the domain is suspicious and does not belong to FedEx'),
                                                        (36, 'Click it only if you are expecting a package'),
                                                        (36, 'Forward the email to FedEx to verify'),

                                                        (37, 'Check how fast the site loads'),
                                                        (37, 'Look at the site design quality'),
                                                        (37, 'Use a WHOIS lookup tool to check the domain registration date'),
                                                        (37, 'Check if the site has a Facebook page'),

                                                        (38, 'A legitimate browser update prompt'),
                                                        (38, 'Malware — browsers update through official channels, never website popups'),
                                                        (38, 'A security patch from your ISP'),
                                                        (38, 'A plugin that needs updating'),

                                                        (39, 'The site is completely safe and verified by government'),
                                                        (39, 'The organization has been verified by a certificate authority — it adds trust but is not a guarantee'),
                                                        (39, 'The site is encrypted end-to-end'),
                                                        (39, 'Nothing — all sites have EV certificates'),

                                                        (40, 'A legitimate discount retailer'),
                                                        (40, 'A grey-market goods seller'),
                                                        (40, 'A scam / fake webshop'),
                                                        (40, 'A wholesale supplier');


-- ─────────────────────────────────────────────
-- MISSIONS
-- ─────────────────────────────────────────────
INSERT INTO mission (id, title, description, level_required) VALUES
                                                                 (1, 'Operation: Inbox Zero',    'A company employee clicked a suspicious email. Trace the attack step by step and contain the breach.', 0),
                                                                 (2, 'Operation: Vault Breaker', 'An attacker gained access to a corporate account. Investigate how the weak password chain was exploited.', 1),
                                                                 (3, 'Operation: Ghost Signal',  'An unknown process is consuming network bandwidth. Identify and neutralize the malware infection chain.', 2),
                                                                 (4, 'Operation: Mirror Web',    'Users are being redirected to fake websites and losing credentials. Map the full attack and shut it down.', 3)
    ON CONFLICT (id) DO NOTHING;


-- ─────────────────────────────────────────────
-- MISSION STEPS
-- Each mission step links to an existing question
-- ─────────────────────────────────────────────

-- Mission 1: Operation Inbox Zero (phishing chain)
INSERT INTO mission_step (id, step_order, mission_id, question_id) VALUES
                                                                       (1, 1, 1, 1),   -- Spot the PayPal phish
                                                                       (2, 2, 1, 7),   -- Identify the fake Google reset URL
                                                                       (3, 3, 1, 6),   -- CEO fraud spear phishing
                                                                       (4, 4, 1, 10)   -- IT asking for credentials
    ON CONFLICT (id) DO NOTHING;

-- Mission 2: Operation Vault Breaker (password chain)
INSERT INTO mission_step (id, step_order, mission_id, question_id) VALUES
                                                                       (5, 1, 2, 13),  -- Worst password practice
                                                                       (6, 2, 2, 15),  -- Brute force explanation
                                                                       (7, 3, 2, 19),  -- Rainbow table cracking
                                                                       (8, 4, 2, 18)   -- 2FA importance
    ON CONFLICT (id) DO NOTHING;

-- Mission 3: Operation Ghost Signal (malware chain)
INSERT INTO mission_step (id, step_order, mission_id, question_id) VALUES
                                                                       (9,  1, 3, 24),  -- .exe disguised as PDF
                                                                       (10, 2, 3, 29),  -- Enable macros trap
                                                                       (11, 3, 3, 27),  -- Webcam RAT indicator
                                                                       (12, 4, 3, 22),  -- Cryptominer high CPU
                                                                       (13, 5, 3, 30)   -- Ransomware best defense
    ON CONFLICT (id) DO NOTHING;

-- Mission 4: Operation Mirror Web (fake website chain)
INSERT INTO mission_step (id, step_order, mission_id, question_id) VALUES
                                                                       (14, 1, 4, 31),  -- Typosquatting PayPal
                                                                       (15, 2, 4, 32),  -- HTTPS misconception
                                                                       (16, 3, 4, 34),  -- Real domain parsing
                                                                       (17, 4, 4, 36),  -- Hover URL inspection
                                                                       (18, 5, 4, 40)   -- Fake webshop detection
    ON CONFLICT (id) DO NOTHING;