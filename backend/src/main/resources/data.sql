-- ─────────────────────────────────────────────
-- GAME CATEGORIES
-- ─────────────────────────────────────────────
INSERT INTO game_category (id, name, description) VALUES
                                                      (1, 'Spot the Phishing',      'Analyze emails and decide if they are safe, spam, or phishing attempts.'),
                                                      (2, 'Build a Strong Password','Choose or construct strong passwords and learn best practices.'),
                                                      (3, 'Detect Malware',         'Decide whether files, downloads, or actions are safe or harmful.'),
                                                      (4, 'Fake Website Checker',   'Inspect URLs and website details to identify fake or dangerous sites.')
ON CONFLICT (id) DO NOTHING;


-- ─────────────────────────────────────────────
-- CATEGORY 1 — Spot the Phishing (IDs 1–15)
-- ─────────────────────────────────────────────
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (1, 'You receive an email from "support@paypa1.com" saying your account is suspended. It asks you to click a link to verify your identity. What is this?',
                                                                                               'Phishing',
                                                                                               'The domain "paypa1.com" uses the number 1 instead of the letter l — a classic typosquatting trick. Legitimate PayPal emails always come from paypal.com. Never click links in unsolicited emails asking you to verify your account.',
                                                                                               'BEGINNER', 1),

                                                                                              (2, 'An email from "hr@yourcompany.com" says: "Hi team, please find the meeting notes attached." The attachment is called "meeting_notes.exe". What should you do?',
                                                                                               'Delete it — the .exe attachment is dangerous',
                                                                                               'Legitimate meeting notes are never .exe files. An executable file disguised as a document is a major malware red flag. Even if the sender address looks real, the email could be spoofed. Never open unexpected .exe attachments.',
                                                                                               'BEGINNER', 1),

                                                                                              (3, 'You get an email from "noreply@amazon-security-alert.net" saying unusual activity was detected on your account. It urges you to log in immediately via the link provided. What is this?',
                                                                                               'Phishing',
                                                                                               'Amazon sends emails from amazon.com domains only — never from "amazon-security-alert.net". Attackers register lookalike domains to fool users. Always check the full domain, not just the brand name in the email.',
                                                                                               'BEGINNER', 1),

                                                                                              (4, 'Your bank emails you a monthly statement PDF. The sender is "statements@yourbank.com", there is no urgency, no links — just a PDF attachment. What is this?',
                                                                                               'Legitimate email',
                                                                                               'This has all the hallmarks of a safe email: known sender domain, no urgency, no suspicious links, and a relevant PDF attachment. Always look for urgency, spoofed domains, and unexpected links as the real red flags.',
                                                                                               'BEGINNER', 1),

                                                                                              (5, 'An email says: "You have won a $500 Amazon gift card! Click here to claim in the next 10 minutes or lose your prize." The sender is "prizes@amaz0n-gifts.co". What is this?',
                                                                                               'Phishing / Scam',
                                                                                               'Fake urgency and a prize you never entered are classic social engineering tactics. The domain "amaz0n-gifts.co" is not Amazon. Legitimate companies do not pressure you with countdown timers to claim prizes via email.',
                                                                                               'BEGINNER', 1),

                                                                                              (6, 'A colleague forwards you an email from "ceo@yourcompany-corp.net" urgently asking you to buy $500 in gift cards and send the codes. The real CEO domain is "yourcompany.com". What is this?',
                                                                                               'CEO Fraud / Spear Phishing',
                                                                                               'This is a Business Email Compromise (BEC) attack. Attackers register a similar domain and impersonate executives to trick employees into sending money or gift cards. Always verify unusual financial requests through a separate channel like a phone call.',
                                                                                               'INTERMEDIATE', 1),

                                                                                              (7, 'You receive a password reset email you did not request from "security@google.com". It contains a link to "accounts.google.com.reset-password.xyz/verify". Where does the link actually go?',
                                                                                               'To a fake phishing site — not Google',
                                                                                               'The real domain is everything after the last dot before the path. Here that is "reset-password.xyz", not google.com. Attackers put "accounts.google.com" as a subdomain to fool you. Always read the full URL carefully.',
                                                                                               'INTERMEDIATE', 1),

                                                                                              (8, 'An email arrives with no greeting, poor grammar, and says: "Dear Customer your account will close unless you update your informations at the link below." What red flags are present?',
                                                                                               'Urgency, poor grammar, and a vague greeting',
                                                                                               'Three classic phishing signals: impersonal greeting, grammatical errors, and manufactured urgency. Legitimate companies personalize emails, use correct grammar, and never threaten immediate account closure to force quick action.',
                                                                                               'BEGINNER', 1),

                                                                                              (9, 'You get a LinkedIn connection request email from "notifications@linkedln.com" (note the extra n). What is this?',
                                                                                               'Phishing — typosquatted LinkedIn domain',
                                                                                               'The domain "linkedln.com" has an extra "n". This is a typosquatting attack that mimics LinkedIn notifications. Always hover over links and inspect the exact domain spelling before clicking.',
                                                                                               'INTERMEDIATE', 1),

                                                                                              (10, 'An email from your IT department says: "We are upgrading our systems. Please reply with your username and password so we can migrate your account." What should you do?',
                                                                                               'Refuse — IT departments never ask for passwords',
                                                                                               'No legitimate IT department, bank, or service will ever ask for your password via email. This is a credential harvesting attack. Report it to your real IT department immediately.',
                                                                                               'BEGINNER', 1),

                                                                                              (11, 'A friend sends you a message saying "Click this link to see a funny photo of you!". The link looks strange. What do you do?',
                                                                                               'Ignore it — your friend''s account may be hacked',
                                                                                               'Hackers often take over accounts and send messages to all contacts. Even if it looks like it is from someone you trust, a strange link is always suspicious. Contact your friend another way to check if they really sent it.',
                                                                                               'BEGINNER', 1),

                                                                                              (12, 'An email says your Netflix subscription has expired and you must update your payment details immediately or lose access. What is the first thing you check?',
                                                                                               'Check the sender''s email address carefully',
                                                                                               'Always verify the sender before doing anything. Netflix emails come from netflix.com only. An email from netflix-billing.com or any variation is a phishing attempt. Log in to Netflix directly through your browser to check your account status.',
                                                                                               'BEGINNER', 1),

                                                                                              (13, 'You receive a text message from your bank saying your card has been blocked. It asks you to call a number to unblock it. What do you do?',
                                                                                               'Call the number on the back of your actual bank card',
                                                                                               'This is called smishing — phishing via SMS. Banks never ask you to call numbers sent in text messages. Always use the official number printed on your card or the bank''s official website.',
                                                                                               'BEGINNER', 1),

                                                                                              (14, 'Which part of the email address "security@google.com.phish.net" is the real domain?',
                                                                                               'phish.net',
                                                                                               'The real domain is always the part immediately before the first forward slash — or before the top-level domain at the very end. Here that is phish.net. Everything before it including google.com is just a subdomain used to deceive you.',
                                                                                               'INTERMEDIATE', 1),

                                                                                              (15, 'An email from IT Support asks you to install a remote access tool so they can fix your computer. You were not expecting any IT visit. What should you do?',
                                                                                               'Refuse and call IT directly using the official number to verify',
                                                                                               'Fake IT support calls and emails are a very common attack. Real IT departments schedule visits in advance and never ask you to install software you were not expecting. Always verify by calling the official IT number before doing anything.',
                                                                                               'INTERMEDIATE', 1)

ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, options) VALUES
                                                        (1,  'Legitimate email'),    (1,  'Spam'),    (1,  'Phishing'),    (1,  'Newsletter'),
                                                        (2,  'Open it to check the content'),    (2,  'Delete it — the .exe attachment is dangerous'),    (2,  'Forward it to colleagues'),    (2,  'Reply asking for a PDF version'),
                                                        (3,  'Legitimate Amazon security alert'),    (3,  'Spam newsletter'),    (3,  'Phishing'),    (3,  'Automated system email'),
                                                        (4,  'Phishing attempt'),    (4,  'Legitimate email'),    (4,  'Spam'),    (4,  'Malware delivery'),
                                                        (5,  'Legitimate prize notification'),    (5,  'Spam'),    (5,  'Phishing / Scam'),    (5,  'Marketing email'),
                                                        (6,  'Legitimate request from CEO'),    (6,  'Spam'),    (6,  'CEO Fraud / Spear Phishing'),    (6,  'Internal IT request'),
                                                        (7,  'To Google account recovery'),    (7,  'To a fake phishing site — not Google'),    (7,  'To your email provider'),    (7,  'To a Google partner site'),
                                                        (8,  'Urgency only'),    (8,  'Poor grammar only'),    (8,  'Urgency, poor grammar, and a vague greeting'),    (8,  'Nothing — it looks legitimate'),
                                                        (9,  'Legitimate LinkedIn notification'),    (9,  'Spam'),    (9,  'Phishing — typosquatted LinkedIn domain'),    (9,  'Automated recruiter message'),
                                                        (10, 'Comply and reply with credentials'),    (10, 'Refuse — IT departments never ask for passwords'),    (10, 'Reply asking for more details'),    (10, 'Forward to a colleague'),
                                                        (11, 'Click it — it is from a friend'),    (11, 'Ignore it — your friend''s account may be hacked'),    (11, 'Share it with others first'),    (11, 'Click it only on your phone'),
                                                        (12, 'Click the link and update payment'),    (12, 'Check the sender''s email address carefully'),    (12, 'Cancel your Netflix immediately'),    (12, 'Forward it to Netflix customer service'),
                                                        (13, 'Call the number in the text immediately'),    (13, 'Ignore it completely'),    (13, 'Call the number on the back of your actual bank card'),    (13, 'Reply to the text asking for more information'),
                                                        (14, 'google.com'),    (14, 'security'),    (14, 'phish.net'),    (14, 'google.com.phish.net'),
                                                        (15, 'Install it — IT knows best'),    (15, 'Refuse and call IT directly using the official number to verify'),    (15, 'Install it but watch what they do'),    (15, 'Email IT back asking for their name')
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────
-- CATEGORY 2 — Build a Strong Password (IDs 16–30)
-- ─────────────────────────────────────────────
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (16, 'Which of these passwords is the strongest?',
                                                                                               'Tr0ub4dor&3#Sky!',
                                                                                               '"Tr0ub4dor&3#Sky!" combines uppercase, lowercase, numbers, and symbols across 16 characters, making it extremely hard to crack. "password123" and "qwerty" are among the most common passwords in the world and are cracked instantly.',
                                                                                               'BEGINNER', 2),

                                                                                              (17, 'You need to create a memorable but strong password. Which method is most secure?',
                                                                                               'A passphrase: "Coffee!Rocket$Mountain7Tree"',
                                                                                               'Passphrases combine multiple random words with symbols and numbers. They are long (which is the most important factor in password strength) yet memorable. Length beats complexity — a 25-character passphrase is stronger than an 8-character complex password.',
                                                                                               'BEGINNER', 2),

                                                                                              (18, 'Which of the following is the WORST password practice?',
                                                                                               'Using the same password on every website',
                                                                                               'Password reuse is the most dangerous habit. If one site is breached, attackers use credential stuffing to try your password on every other site. Always use unique passwords for every account.',
                                                                                               'BEGINNER', 2),

                                                                                              (19, 'A website forces you to use exactly 8 characters, one uppercase, one number. What does this tell you about the site?',
                                                                                               'The site likely stores passwords poorly such as plain text or weak hashing',
                                                                                               'Maximum length limits and overly specific rules suggest the site may store passwords in plain text or use a weak hashing algorithm with fixed-length fields. Good sites let you use long passphrases freely.',
                                                                                               'INTERMEDIATE', 2),

                                                                                              (20, 'What is a brute force attack on a password?',
                                                                                               'Trying every possible combination of characters until the right one is found',
                                                                                               'Brute force attacks systematically try every combination. This is why length matters so much — adding just one character multiplies the combinations exponentially. A 12-character password takes billions of times longer to brute force than an 8-character one.',
                                                                                               'BEGINNER', 2),

                                                                                              (21, 'You use the password P@ssw0rd! on your work account. How secure is it?',
                                                                                               'Very weak — it is on every attacker dictionary list',
                                                                                               'Despite looking complex, "P@ssw0rd!" is one of the most common complex-looking passwords and appears in every password cracking dictionary. Attackers try these first before brute forcing.',
                                                                                               'BEGINNER', 2),

                                                                                              (22, 'What is the safest way to store your many unique passwords?',
                                                                                               'Use a reputable password manager',
                                                                                               'Password managers generate, store, and autofill strong unique passwords for every site. They encrypt your vault with one master password. This is the industry-recommended approach — security experts all use them.',
                                                                                               'BEGINNER', 2),

                                                                                              (23, 'Which adds the most security to a password-protected account?',
                                                                                               'Enabling two-factor authentication (2FA)',
                                                                                               '2FA means even if your password is stolen, the attacker cannot access your account without the second factor (your phone, an authenticator app, etc.). It is the single most effective account security improvement you can make.',
                                                                                               'BEGINNER', 2),

                                                                                              (24, 'A hacker obtains a database of hashed passwords. Your password hash is cracked in 0.002 seconds. What was likely wrong with your password?',
                                                                                               'It was too short or too common — found in a rainbow table',
                                                                                               'Rainbow tables are precomputed lists of password hashes. Short or common passwords are cracked instantly. Long, unique passwords combined with proper salting by the website make rainbow table attacks infeasible.',
                                                                                               'INTERMEDIATE', 2),

                                                                                              (25, 'How often should you change your passwords?',
                                                                                               'Only when you suspect a breach or when a service you use is compromised',
                                                                                               'NIST updated its guidelines: forced regular password changes actually reduce security because users choose weaker predictable passwords. Change passwords when there is a real reason — a breach, a shared device, or suspected compromise.',
                                                                                               'ADVANCED', 2),

                                                                                              (26, 'Which of these is the best example of a passphrase?',
                                                                                               'BlueSky!Jumping42Cats',
                                                                                               'A passphrase combines multiple random words with numbers and symbols. It is long enough to be very secure but memorable enough to recall. BlueSky!Jumping42Cats has 22 characters and is far stronger than any short complex password.',
                                                                                               'BEGINNER', 2),

                                                                                              (27, 'Your school asks you to create a password. Which should you avoid?',
                                                                                               'Your student ID number',
                                                                                               'Student ID numbers are often easy for others to find or guess. Anything that identifies you — your name, ID, birthday, or school — should never be used as a password. Use something completely random instead.',
                                                                                               'BEGINNER', 2),

                                                                                              (28, 'A website says your password is Strong but it is only 8 characters. Should you trust this rating?',
                                                                                               'No — 8 characters is still too short regardless of the rating',
                                                                                               'Password strength meters on websites are often misleading. Modern computers can crack 8-character passwords in minutes even with symbols. Always aim for at least 12 to 16 characters. Length is the most important factor in password strength.',
                                                                                               'INTERMEDIATE', 2),

                                                                                              (29, 'What is credential stuffing?',
                                                                                               'Using leaked username and password pairs to attack other websites',
                                                                                               'When a website is breached, attackers sell the stolen usernames and passwords. They then automatically try these same combinations on hundreds of other websites like banks and email providers. This is why using the same password everywhere is so dangerous.',
                                                                                               'ADVANCED', 2),

                                                                                              (30, 'Your friend says they use their birthday as their password. Is this a good idea?',
                                                                                               'No — people who know you could guess it',
                                                                                               'Using personal information like birthdays, pet names, or your school name as passwords is risky. People who know you — or can find you on social media — could easily guess them. Use random words and symbols instead.',
                                                                                               'BEGINNER', 2)

ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, options) VALUES
                                                        (16, 'password123'),    (16, 'Tr0ub4dor&3#Sky!'),    (16, 'qwerty12345'),    (16, 'MyName1990'),
                                                        (17, 'Your pet name + birth year'),    (17, 'A passphrase: "Coffee!Rocket$Mountain7Tree"'),    (17, 'A keyboard pattern like qwerty!@#'),    (17, 'Your company name + 123'),
                                                        (18, 'Using a password manager'),    (18, 'Enabling 2FA'),    (18, 'Using the same password on every website'),    (18, 'Using a passphrase'),
                                                        (19, 'The site has excellent security'),    (19, 'The site likely stores passwords poorly such as plain text or weak hashing'),    (19, 'The site is GDPR compliant'),    (19, 'Nothing — all sites do this'),
                                                        (20, 'Guessing based on personal info'),    (20, 'Trying every possible combination of characters until the right one is found'),    (20, 'Using stolen password lists'),    (20, 'Intercepting network traffic'),
                                                        (21, 'Very strong — it uses symbols and numbers'),    (21, 'Moderate — acceptable for low-risk accounts'),    (21, 'Very weak — it is on every attacker dictionary list'),    (21, 'Strong enough if changed monthly'),
                                                        (22, 'Write them in a notebook'),    (22, 'Use a reputable password manager'),    (22, 'Save them in your browser only'),    (22, 'Use the same base password with variations'),
                                                        (23, 'Making the password longer'),    (23, 'Changing it every 30 days'),    (23, 'Enabling two-factor authentication (2FA)'),    (23, 'Using a different browser'),
                                                        (24, 'The hashing algorithm was too new'),    (24, 'The website stored it incorrectly'),    (24, 'It was too short or too common — found in a rainbow table'),    (24, 'The attacker got lucky'),
                                                        (25, 'Every 30 days'),    (25, 'Every 90 days as IT policy requires'),    (25, 'Never change it once set'),    (25, 'Only when you suspect a breach or when a service you use is compromised'),
                                                        (26, 'P@ssw0rd!'),    (26, 'iloveyou123'),    (26, 'BlueSky!Jumping42Cats'),    (26, 'qwerty'),
                                                        (27, 'A random mix of words and numbers'),    (27, 'Your student ID number'),    (27, 'A phrase only you would know'),    (27, 'A generated password from a password manager'),
                                                        (28, 'Yes — the website knows best'),    (28, 'No — 8 characters is still too short regardless of the rating'),    (28, 'Yes — if it has symbols it is fine'),    (28, 'No — only passwords with numbers are strong'),
                                                        (29, 'Memorising many passwords at once'),    (29, 'Using leaked username and password pairs to attack other websites'),    (29, 'Creating passwords using personal information'),    (29, 'Stuffing too many characters into one password'),
                                                        (30, 'Yes — it is easy to remember'),    (30, 'No — people who know you could guess it'),    (30, 'Yes — birthdays are secret'),    (30, 'Only if it includes the year')
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────
-- CATEGORY 3 — Detect Malware (IDs 31–45)
-- ─────────────────────────────────────────────
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (31, 'You download a free video converter from a site. The installer asks permission to install a search toolbar and change your homepage. What should you do?',
                                                                                               'Decline and uncheck all optional software',
                                                                                               'Bundled software installers are one of the most common adware and PUP delivery methods. Always choose Custom Install, read every screen, and uncheck anything you did not ask for.',
                                                                                               'BEGINNER', 3),

                                                                                              (32, 'Your computer suddenly becomes very slow, the fan runs constantly, and you notice unknown processes using 90% CPU. What could this indicate?',
                                                                                               'Cryptomining malware (cryptojacker)',
                                                                                               'These are classic signs of a cryptojacker — malware that hijacks your CPU to mine cryptocurrency for attackers. Check Task Manager for unknown high-CPU processes and run a malware scan immediately.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (33, 'A popup appears saying YOUR COMPUTER HAS 47 VIRUSES! Call Microsoft Support immediately! What is this?',
                                                                                               'A scareware / tech support scam',
                                                                                               'Microsoft never displays phone numbers in browser popups. This is scareware — fake alerts designed to frighten you into calling a premium-rate scam number or installing fake antivirus software that is itself malware.',
                                                                                               'BEGINNER', 3),

                                                                                              (34, 'You open an email attachment called Invoice_2024.pdf.exe. What is this file most likely?',
                                                                                               'Malware disguised as a PDF',
                                                                                               'The real extension is .exe — the .pdf in the name is meant to fool you. Windows hides file extensions by default, making this trick highly effective. Legitimate invoices are never executable files.',
                                                                                               'BEGINNER', 3),

                                                                                              (35, 'All your files suddenly have a .locked extension and a README appears demanding Bitcoin to restore them. What happened?',
                                                                                               'You have been infected with ransomware',
                                                                                               'Ransomware encrypts your files and demands payment for the decryption key. Disconnect from the network immediately to stop spread. Never pay — it encourages attackers and payment does not guarantee file recovery. Restore from backups.',
                                                                                               'BEGINNER', 3),

                                                                                              (36, 'A free game you pirated is flagged by Windows Defender as a Trojan. Your friend says it is a false positive. What should you do?',
                                                                                               'Delete the file and trust the antivirus warning',
                                                                                               'Pirated software is one of the top malware delivery methods. Trojans disguise themselves as legitimate programs. False positive is the most common excuse used to bypass security warnings. Trust your antivirus over strangers online.',
                                                                                               'BEGINNER', 3),

                                                                                              (37, 'You notice your webcam light turns on randomly when you are not using it. What could this mean?',
                                                                                               'A Remote Access Trojan (RAT) may have compromised your system',
                                                                                               'Unexpected webcam activation is a major red flag for a RAT — malware that gives attackers remote control of your computer including camera and microphone. Run a full malware scan and cover your webcam as a temporary precaution.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (38, 'Which behavior is a strong indicator that a file is malware?',
                                                                                               'It requests admin privileges, disables antivirus, and contacts an external server',
                                                                                               'This combination of behaviors is the classic malware signature: privilege escalation to gain control, disabling defenses to persist, and command-and-control communication to receive instructions. Any one of these alone is suspicious; all three together is definitive.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (39, 'You receive a Word document that asks you to Enable Macros to view the content. What should you do?',
                                                                                               'Do not enable macros — this is a common malware delivery technique',
                                                                                               'Macro-based malware was responsible for some of the largest corporate breaches in history. Legitimate documents rarely need macros enabled. If a document aggressively asks you to enable macros, treat it as malware.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (40, 'What is the best defense against ransomware?',
                                                                                               'Regular offline backups of your important files',
                                                                                               'Backups are the only guaranteed recovery from ransomware. Offline or cloud backups that are not connected to your main system cannot be encrypted by ransomware. Regular backups make ransomware attacks largely ineffective.',
                                                                                               'BEGINNER', 3),

                                                                                              (41, 'You visit a website and a popup says you have won a prize. It asks you to download a file to claim it. What should you do?',
                                                                                               'Close the tab immediately without clicking anything',
                                                                                               'This is a drive-by download attempt. The popup is fake and the file contains malware. You should close the tab and never interact with unexpected popups offering prizes.',
                                                                                               'BEGINNER', 3),

                                                                                              (42, 'Your antivirus has been disabled and you did not do it. What is the most likely cause?',
                                                                                               'Malware has disabled it to avoid detection',
                                                                                               'One of the first things many types of malware do after infecting a system is disable antivirus software. This is a major warning sign. If your security software turns off by itself, treat this as a potential infection and seek help immediately.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (43, 'What does ransomware typically do after encrypting your files?',
                                                                                               'Display a ransom demand asking for payment to restore files',
                                                                                               'Ransomware encrypts your files and then displays a message demanding payment — usually in cryptocurrency — in exchange for the decryption key. You should never pay because it encourages more attacks and does not guarantee recovery.',
                                                                                               'BEGINNER', 3),

                                                                                              (44, 'A USB drive is left on a desk at school with a label saying Student Grades 2024. What should you do?',
                                                                                               'Hand it to a teacher without plugging it in',
                                                                                               'Leaving USB drives in public places is a classic social engineering attack called USB baiting. The label is designed to make you curious enough to plug it in. The drive may contain malware that installs automatically when connected.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (45, 'Which type of malware secretly uses your computer to mine cryptocurrency for an attacker?',
                                                                                               'A cryptojacker',
                                                                                               'A cryptojacker runs silently in the background using your CPU and electricity to generate cryptocurrency for the attacker. Signs include a very slow computer, overheating, and high CPU usage by unknown processes.',
                                                                                               'BEGINNER', 3)

ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, options) VALUES
                                                        (31, 'Accept everything — it is part of the software'),    (31, 'Decline and uncheck all optional software'),    (31, 'Cancel the installation entirely'),    (31, 'Only accept the toolbar'),
                                                        (32, 'Normal Windows update activity'),    (32, 'Cryptomining malware (cryptojacker)'),    (32, 'The computer needs a RAM upgrade'),    (32, 'A background antivirus scan'),
                                                        (33, 'A real Microsoft security warning'),    (33, 'A scareware / tech support scam'),    (33, 'A legitimate antivirus alert'),    (33, 'A Windows system notification'),
                                                        (34, 'A normal PDF invoice'),    (34, 'A corrupted file'),    (34, 'Malware disguised as a PDF'),    (34, 'A compressed archive'),
                                                        (35, 'A Windows update went wrong'),    (35, 'Your hard drive is failing'),    (35, 'You have been infected with ransomware'),    (35, 'A file system error occurred'),
                                                        (36, 'Disable Windows Defender and run the game'),    (36, 'Add an exception in antivirus and run it'),    (36, 'Delete the file and trust the antivirus warning'),    (36, 'Ask your friend to send their copy'),
                                                        (37, 'The camera has a hardware glitch'),    (37, 'A Remote Access Trojan (RAT) may have compromised your system'),    (37, 'A video conferencing app is updating'),    (37, 'Windows is running a camera diagnostic'),
                                                        (38, 'It has a large file size'),    (38, 'It requests admin privileges, disables antivirus, and contacts an external server'),    (38, 'It runs slowly on older hardware'),    (38, 'It creates temporary files during installation'),
                                                        (39, 'Enable macros — the document requires it'),    (39, 'Do not enable macros — this is a common malware delivery technique'),    (39, 'Enable macros only if you know the sender'),    (39, 'Forward the document to IT to enable macros'),
                                                        (40, 'A good antivirus subscription'),    (40, 'Never opening emails'),    (40, 'Regular offline backups of your important files'),    (40, 'Using a VPN at all times'),
                                                        (41, 'Download the file — it is a prize!'),    (41, 'Close the tab immediately without clicking anything'),    (41, 'Click the popup to see what the prize is'),    (41, 'Share the website with friends first'),
                                                        (42, 'A Windows update turned it off'),    (42, 'Malware has disabled it to avoid detection'),    (42, 'The antivirus license expired'),    (42, 'Another program is conflicting with it'),
                                                        (43, 'Delete all your files permanently'),    (43, 'Display a ransom demand asking for payment to restore files'),    (43, 'Send your files to the attacker''s website'),    (43, 'Format your hard drive'),
                                                        (44, 'Plug it in to see whose it is'),    (44, 'Hand it to a teacher without plugging it in'),    (44, 'Plug it into a school computer to check'),    (44, 'Keep it in case it has useful files'),
                                                        (45, 'A virus'),    (45, 'A cryptojacker'),    (45, 'Ransomware'),    (45, 'A trojan horse')
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────
-- CATEGORY 4 — Fake Website Checker (IDs 46–60)
-- ─────────────────────────────────────────────
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (46, 'You want to visit PayPal. You type it into Google and click the first result, which goes to "www.paypa1.com/login". Is this safe?',
                                                                                               'No — the domain uses 1 instead of l which is typosquatting',
                                                                                               'Typosquatting replaces letters with numbers or similar-looking characters. "paypa1.com" with the number 1 is not PayPal. Always type important URLs directly into the address bar rather than searching, and bookmark sites you visit frequently.',
                                                                                               'BEGINNER', 4),

                                                                                              (47, 'A website shows a padlock icon (HTTPS) in the address bar. Does this mean the site is safe and legitimate?',
                                                                                               'No — HTTPS only means the connection is encrypted not that the site is trustworthy',
                                                                                               'HTTPS means data between you and the site is encrypted — but the site itself could still be a phishing page. Attackers routinely use free SSL certificates on fake sites. A padlock is necessary but not sufficient proof of legitimacy.',
                                                                                               'INTERMEDIATE', 4),

                                                                                              (48, 'You land on "http://192.168.1.104/banking/login". What is suspicious about this URL?',
                                                                                               'Legitimate banks use domain names not raw IP addresses',
                                                                                               'Real banking sites never use raw IP addresses in their URLs. An IP-based URL for a login page is a strong indicator of a phishing site or a local network attack like a router compromise.',
                                                                                               'INTERMEDIATE', 4),

                                                                                              (49, 'A site URL is "https://secure-login.netflix-accounts.verify-now.com". What is the real domain?',
                                                                                               'verify-now.com — the rest are subdomains',
                                                                                               'The real domain is always the last part before the first single slash: "verify-now.com". Everything to the left is a subdomain. Attackers use "secure-login.netflix-accounts" as subdomains to make the URL look legitimate at a glance.',
                                                                                               'ADVANCED', 4),

                                                                                              (50, 'A website asks for your credit card to verify your age for free content. The site has no privacy policy, no company address, and the copyright says 2019. What should you do?',
                                                                                               'Leave immediately — these are red flags of a scam site',
                                                                                               'Multiple red flags: no privacy policy which is illegal in most countries, no contact information, and outdated copyright suggest a scam or abandoned site. Never enter payment info on sites missing basic legitimacy signals.',
                                                                                               'BEGINNER', 4),

                                                                                              (51, 'You hover over a link in an email that says "Click here to track your package". The status bar shows "http://track-parcel.ru/fedex". What should you do?',
                                                                                               'Do not click — the domain is suspicious and does not belong to FedEx',
                                                                                               'The actual destination URL is shown in the status bar when you hover. "track-parcel.ru" has nothing to do with FedEx. Attackers use display text like Click here to hide the real destination.',
                                                                                               'BEGINNER', 4),

                                                                                              (52, 'How can you check if a website domain was registered recently?',
                                                                                               'Use a WHOIS lookup tool to check the domain registration date',
                                                                                               'WHOIS services show when a domain was registered. Phishing sites are often registered days or hours before an attack. A legitimate business domain is usually years old.',
                                                                                               'ADVANCED', 4),

                                                                                              (53, 'A popup on a website says "Your browser is out of date! Download the update now to continue." The button downloads ChromeUpdate.exe. What is this?',
                                                                                               'Malware — browsers update through official channels never website popups',
                                                                                               'Chrome, Firefox, and all legitimate browsers update automatically through their own systems — never via a download from a random website. This is a drive-by download attack delivering malware.',
                                                                                               'BEGINNER', 4),

                                                                                              (54, 'What does it mean if a website has an EV (Extended Validation) SSL certificate?',
                                                                                               'The organization has been verified by a certificate authority — it adds trust but is not a guarantee',
                                                                                               'EV certificates require the organization to prove legal identity to a Certificate Authority. They add a meaningful layer of trust but sophisticated attackers have sometimes obtained them. They are a positive signal, not absolute proof.',
                                                                                               'ADVANCED', 4),

                                                                                              (55, 'You visit an online shop with great prices. It has no HTTPS, asks for payment via bank transfer only, has stock photos, and no return policy. What is this?',
                                                                                               'A scam / fake webshop',
                                                                                               'Every element is a scam indicator: no HTTPS, bank transfer only which is untraceable, stock photos instead of real product photos, and no consumer protections. Legitimate shops offer card payments and clear return policies.',
                                                                                               'BEGINNER', 4),

                                                                                              (56, 'A shopping website offers a brand new gaming console for 90% off. The website was created two days ago. What does this tell you?',
                                                                                               'It is almost certainly a scam website',
                                                                                               'Newly registered domains combined with prices that are impossibly low are two of the strongest indicators of a scam website. Real retailers cannot afford to sell products at 90% off. If a deal seems too good to be true it always is.',
                                                                                               'BEGINNER', 4),

                                                                                              (57, 'You want to buy something online. Which payment method is safest?',
                                                                                               'Credit card or PayPal',
                                                                                               'Credit cards and PayPal offer buyer protection — if you do not receive your item you can dispute the charge and get your money back. Bank transfers and cryptocurrency payments are irreversible and offer no protection if the seller is fraudulent.',
                                                                                               'BEGINNER', 4),

                                                                                              (58, 'A website SSL certificate is issued to Paypa1-Security-LLC instead of PayPal Inc. What does this mean?',
                                                                                               'The certificate is for a different company — this is a fake site',
                                                                                               'The SSL certificate organisation name must match the legitimate company. Attackers can buy SSL certificates for their fake company names to display the padlock icon while still operating a fraudulent site.',
                                                                                               'ADVANCED', 4),

                                                                                              (59, 'What should you do before entering your login details on any website?',
                                                                                               'Verify the full URL in the address bar matches the official website exactly',
                                                                                               'The URL is the single most reliable indicator of whether you are on a real website. Check every character carefully — one different letter means you are on a fake site.',
                                                                                               'BEGINNER', 4),

                                                                                              (60, 'Which of these URLs is definitely fake if you are trying to reach "barclays.com"?',
                                                                                               'secure.barclays.com.login-verify.net',
                                                                                               'The real domain here is login-verify.net — not barclays.com. The barclays.com part is just a subdomain. This is a classic subdomain spoofing attack designed to make the URL look legitimate at a glance.',
                                                                                               'INTERMEDIATE', 4)

ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, options) VALUES
                                                        (46, 'Yes — it looks like PayPal'),    (46, 'No — the domain uses 1 instead of l which is typosquatting'),    (46, 'Yes — Google only shows legitimate results'),    (46, 'It depends on whether you have antivirus installed'),
                                                        (47, 'Yes — HTTPS guarantees the site is safe'),    (47, 'No — HTTPS only means the connection is encrypted not that the site is trustworthy'),    (47, 'Yes — only verified companies can get HTTPS'),    (47, 'No — HTTPS means the site is government regulated'),
                                                        (48, 'Nothing — IP addresses are normal for banking sites'),    (48, 'The site is using an older URL format'),    (48, 'Legitimate banks use domain names not raw IP addresses'),    (48, 'The bank is using a private network'),
                                                        (49, 'netflix-accounts.verify-now.com'),    (49, 'netflix.com'),    (49, 'verify-now.com — the rest are subdomains'),    (49, 'secure-login.com'),
                                                        (50, 'Enter a virtual card number for safety'),    (50, 'Leave immediately — these are red flags of a scam site'),    (50, 'Proceed — HTTPS means it is safe'),    (50, 'Contact their support first'),
                                                        (51, 'Click it — the link text says FedEx so it is safe'),    (51, 'Do not click — the domain is suspicious and does not belong to FedEx'),    (51, 'Click it only if you are expecting a package'),    (51, 'Forward the email to FedEx to verify'),
                                                        (52, 'Check how fast the site loads'),    (52, 'Look at the site design quality'),    (52, 'Use a WHOIS lookup tool to check the domain registration date'),    (52, 'Check if the site has a Facebook page'),
                                                        (53, 'A legitimate browser update prompt'),    (53, 'Malware — browsers update through official channels never website popups'),    (53, 'A security patch from your ISP'),    (53, 'A plugin that needs updating'),
                                                        (54, 'The site is completely safe and verified by government'),    (54, 'The organization has been verified by a certificate authority — it adds trust but is not a guarantee'),    (54, 'The site is encrypted end-to-end'),    (54, 'Nothing — all sites have EV certificates'),
                                                        (55, 'A legitimate discount retailer'),    (55, 'A grey-market goods seller'),    (55, 'A scam / fake webshop'),    (55, 'A wholesale supplier'),
                                                        (56, 'It is a great deal — buy it quickly'),    (56, 'It is almost certainly a scam website'),    (56, 'New websites always have better prices'),    (56, 'The discount is because they have too much stock'),
                                                        (57, 'Bank transfer directly to the seller'),    (57, 'Cryptocurrency payment'),    (57, 'Credit card or PayPal'),    (57, 'Cash on delivery via untraceable courier'),
                                                        (58, 'The site is definitely PayPal'),    (58, 'The certificate is for a different company — this is a fake site'),    (58, 'The certificate does not matter'),    (58, 'PayPal changed their company name'),
                                                        (59, 'Check the page looks nice and professional'),    (59, 'Verify the full URL in the address bar matches the official website exactly'),    (59, 'Make sure the page loads quickly'),    (59, 'Check if the website has social media links'),
                                                        (60, 'www.barclays.co.uk'),    (60, 'secure.barclays.com.login-verify.net'),    (60, 'barclays.com/personal/login'),    (60, 'online.barclays.com')
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────
-- MISSION-SPECIFIC QUESTIONS (IDs 61–78)
-- These are tied directly to each mission story
-- ─────────────────────────────────────────────

-- Mission 1 — Operation: Inbox Zero (Sarah / CyberCorp phishing attack)
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (61, 'Sarah from Finance received an email appearing to be from CEO Michael Torres asking her to urgently verify login credentials before the board meeting. The email came from michael.torres@cybercorp-secure.net. The real company domain is cybercorp.com. What type of attack is this?',
                                                                                               'Spear phishing using a lookalike domain',
                                                                                               'The attacker registered cybercorp-secure.net — a domain designed to look official. Combined with the CEO real name and a believable excuse this is textbook spear phishing. Always verify the exact domain not just the name shown in the email.',
                                                                                               'BEGINNER', 1),

                                                                                              (62, 'The phishing email sent to Sarah contained a link showing "https://cybercorp.com/verify" but when Sarah hovered over it the actual URL was "https://cybercorp-secure.net/steal-creds". Why did the link text look different from the real destination?',
                                                                                               'HTML allows link text to say anything regardless of where the link actually goes',
                                                                                               'In HTML emails the visible text of a link can say anything — it has no connection to the actual URL destination. Attackers use this to show a trusted address while linking to a malicious site. Always hover over links to see the real URL before clicking.',
                                                                                               'BEGINNER', 1),

                                                                                              (63, 'After Sarah entered her credentials on the fake CyberCorp login page the page redirected her to the real CyberCorp website as if nothing happened. Why did the attacker do this?',
                                                                                               'To avoid suspicion — Sarah thinks she just had a brief login glitch',
                                                                                               'This is called a pass-through attack. After stealing credentials the fake site silently redirects the victim to the real website. The victim thinks they just had a minor login issue and never realises their credentials were stolen. It can be days before the breach is discovered.',
                                                                                               'INTERMEDIATE', 1),

                                                                                              (64, 'The attacker used Sarah stolen credentials to authorise three bank transfers at 2 AM when no one was in the office. What security measure would have stopped this attack even with the stolen password?',
                                                                                               'Two-factor authentication requiring approval from Sarah phone',
                                                                                               'Even with the correct username and password two-factor authentication would have required the attacker to also have access to Sarah phone to approve the login. Without 2FA a stolen password alone is enough to take full control of an account.',
                                                                                               'BEGINNER', 1)

ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, options) VALUES
                                                        (61, 'A legitimate CEO request'),    (61, 'Spear phishing using a lookalike domain'),    (61, 'A standard IT security check'),    (61, 'An automated system notification'),
                                                        (62, 'The website automatically redirected her'),    (62, 'HTML allows link text to say anything regardless of where the link actually goes'),    (62, 'Her browser changed the link'),    (62, 'The email was corrupted in transit'),
                                                        (63, 'The attacker made a mistake'),    (63, 'To avoid suspicion — Sarah thinks she just had a brief login glitch'),    (63, 'The fake site ran out of storage'),    (63, 'Sarah browser blocked the attack'),
                                                        (64, 'A stronger password'),    (64, 'Two-factor authentication requiring approval from Sarah phone'),    (64, 'A better antivirus program'),    (64, 'Logging out of computers at night')
ON CONFLICT DO NOTHING;


-- Mission 2 — Operation: Vault Breaker (Dave / DataVault password breach)
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (65, 'The DataVault investigation revealed the compromised account belonged to IT Administrator Dave. His password was DataVault2019 — the company name plus the year it was founded. How long did it take the attacker tool to crack this password?',
                                                                                               'Under 3 seconds',
                                                                                               'Passwords based on company names years or any predictable pattern are cracked almost instantly by modern tools. Attackers use dictionary attacks that try millions of common patterns including company names and years. DataVault2019 would appear in any targeted wordlist.',
                                                                                               'BEGINNER', 2),

                                                                                              (66, 'Forensic logs show the attacker tried 2.3 million password combinations in 40 minutes using an automated tool. Dave password was the 847293rd combination tried. What type of attack is this?',
                                                                                               'Brute force / dictionary attack',
                                                                                               'A brute force or dictionary attack uses automated software to try thousands of passwords per second. Against weak passwords this is extremely effective. Modern tools can try billions of combinations per hour when targeting offline password hashes.',
                                                                                               'BEGINNER', 2),

                                                                                              (67, 'The security team discovered Dave had been using the same password for DataVault admin access his personal Gmail and three other services. After DataVault was breached the attacker immediately tried Dave stolen password on his email. What is this technique called?',
                                                                                               'Credential stuffing',
                                                                                               'Credential stuffing uses stolen username and password pairs from one breach to attack other services. Because Dave reused his password one breach gave the attacker access to multiple accounts. This is why every account must have a unique password.',
                                                                                               'INTERMEDIATE', 2),

                                                                                              (68, 'The DataVault breach exposed 200000 patient records. A security review found passwords were stored as unsalted MD5 hashes — a method considered broken since 2004. What should DataVault have used instead?',
                                                                                               'bcrypt or Argon2 with unique salts per password',
                                                                                               'MD5 is completely unsuitable for password storage. Modern secure hashing uses algorithms like bcrypt or Argon2 which are deliberately slow and add unique random salts to each password. This makes rainbow table attacks and bulk cracking practically impossible.',
                                                                                               'ADVANCED', 2)

ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, options) VALUES
                                                        (65, 'Several years'),    (65, 'About 6 months'),    (65, 'Under 3 seconds'),    (65, 'It could not be cracked'),
                                                        (66, 'Social engineering'),    (66, 'Phishing'),    (66, 'Brute force / dictionary attack'),    (66, 'Man in the middle attack'),
                                                        (67, 'Password spraying'),    (67, 'Credential stuffing'),    (67, 'Keylogging'),    (67, 'Session hijacking'),
                                                        (68, 'Plain text storage — easier to check'),    (68, 'MD5 with longer passwords'),    (68, 'bcrypt or Argon2 with unique salts per password'),    (68, 'SHA-1 which is newer than MD5')
ON CONFLICT DO NOTHING;


-- Mission 3 — Operation: Ghost Signal (Luca / NovaTech malware chain)
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (69, 'The NovaTech investigation traced the infection back to employee Luca who downloaded NovaTech_Tools_Pro_CRACKED.exe from a forum two weeks ago. His antivirus flagged it but he disabled the protection to install it. What type of malware delivery is this?',
                                                                                               'Trojan horse hidden inside pirated software',
                                                                                               'Pirated software is one of the most common malware delivery methods. Attackers hide malicious code inside cracked programs. When users disable antivirus warnings to install pirated software they are effectively inviting malware in themselves. Luca decision to ignore the antivirus warning caused a company-wide breach.',
                                                                                               'BEGINNER', 3),

                                                                                              (70, 'After Luca computer was infected the malware emailed every contact in his address book a Word document called Q3_Financial_Report.docx. When colleagues opened it they saw "This document requires macros to display correctly — Enable Content". Three colleagues enabled macros. What happened next?',
                                                                                               'The macro ran malicious code that infected their computers too',
                                                                                               'This is macro-based malware propagation. The infected computer used Luca trusted email account to spread the malware to colleagues. Because the email came from a known contact people trusted it. The macro executed the malware payload the moment Enable Content was clicked.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (71, 'For two weeks the malware operated silently on NovaTech network. Network logs showed large encrypted data transfers to an unknown IP address at 3 AM each night. What was happening?',
                                                                                               'A Remote Access Trojan sending stolen data to the attackers',
                                                                                               'A Remote Access Trojan establishes a covert communication channel with the attacker servers called command and control. The nightly transfers were the RAT sending stolen company data. The 3 AM timing was chosen deliberately to avoid detection during business hours.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (72, 'On Friday at 3 AM the malware activated its final payload. Every file on the NovaTech network was encrypted and renamed with a .ghost extension. A message appeared on every screen. What should the IT team do FIRST?',
                                                                                               'Disconnect all systems from the network immediately to stop the spread',
                                                                                               'The absolute first response to a ransomware attack is network isolation — physically disconnecting affected systems from the network to prevent further spread. Paying ransoms is not recommended as it funds criminal activity and does not guarantee file recovery.',
                                                                                               'INTERMEDIATE', 3),

                                                                                              (73, 'The NovaTech investigation found that an offline backup system had been running every Sunday night. The ransomware had only been active for 5 days when discovered. What does this mean for NovaTech recovery?',
                                                                                               'They can restore from last Sunday backup losing only 5 days of data',
                                                                                               'Offline backups — ones not connected to the main network — cannot be encrypted by ransomware. NovaTech regular Sunday backups meant they could restore their systems without paying. This is exactly why regular offline backups are the most important ransomware defence.',
                                                                                               'BEGINNER', 3)

ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, options) VALUES
                                                        (69, 'A drive-by download from a legitimate website'),    (69, 'Trojan horse hidden inside pirated software'),    (69, 'An email attachment'),    (69, 'A USB drive infection'),
                                                        (70, 'The document displayed correctly with no issues'),    (70, 'The macro ran malicious code that infected their computers too'),    (70, 'The document was empty'),    (70, 'Their computers automatically blocked the macro'),
                                                        (71, 'Scheduled backup operations'),    (71, 'A Remote Access Trojan sending stolen data to the attackers'),    (71, 'A software update downloading overnight'),    (71, 'Normal network maintenance'),
                                                        (72, 'Pay the ransom immediately to stop further damage'),    (72, 'Disconnect all systems from the network immediately to stop the spread'),    (72, 'Try to decrypt the files using free online tools'),    (72, 'Restart all computers to clear the malware'),
                                                        (73, 'They have lost everything — backups cannot help with ransomware'),    (73, 'They can restore from last Sunday backup losing only 5 days of data'),    (73, 'They must still pay the ransom to get the decryption key'),    (73, 'The backups are also encrypted')
ON CONFLICT DO NOTHING;


-- Mission 4 — Operation: Mirror Web (global fake website ring)
INSERT INTO question (id, question, correct_answer, explanation, difficulty, category_id) VALUES

                                                                                              (74, 'Investigators identified 47 fake domains used in the Mirror Web operation. One was "www.amaz0n-checkout.com" targeting Amazon shoppers. A victim said it looked exactly like Amazon. What was the first clue the site was fake?',
                                                                                               'The domain used a zero instead of the letter o in amazon',
                                                                                               'Typosquatting replaces letters with visually similar characters. The zero in amaz0n is easy to miss at a glance especially in browser address bars where fonts can make 0 and o look similar. Attackers count on users not reading URLs character by character.',
                                                                                               'BEGINNER', 4),

                                                                                              (75, 'All 47 fake sites in the Mirror Web operation displayed a padlock icon (HTTPS). One victim said I knew it was safe because it had the green padlock. Why was this reasoning wrong?',
                                                                                               'HTTPS only encrypts the connection — it does not verify the site is legitimate',
                                                                                               'This is one of the most dangerous cybersecurity misconceptions. HTTPS means the connection between your browser and the server is encrypted — nothing more. Free SSL certificates are available to anyone including criminals. A fake site can have HTTPS. Always verify the URL as well as the padlock.',
                                                                                               'INTERMEDIATE', 4),

                                                                                              (76, 'The Mirror Web criminals used the domain "secure.banking.lloydsbank.com.account-verify.net" to target Lloyds Bank customers. Most victims thought they were on lloydsbank.com. What is the actual domain of this URL?',
                                                                                               'account-verify.net',
                                                                                               'The real domain is always the segment immediately before the first single slash reading from the right. Everything to the left including secure.banking.lloydsbank.com is just a subdomain that the attacker created to deceive victims.',
                                                                                               'ADVANCED', 4),

                                                                                              (77, 'Investigators found the Mirror Web criminals drove traffic to fake sites through sponsored social media adverts showing "Official Amazon Prime Sale — 70% off today only — Limited time". Why was urgency used in the advert?',
                                                                                               'To bypass rational thinking and make victims click without scrutinising the URL',
                                                                                               'Manufactured urgency is a core social engineering technique. When people feel they might miss out on something they act quickly without thinking carefully. The criminals deliberately created time pressure so victims would click and enter their payment details before stopping to check if the website was legitimate.',
                                                                                               'INTERMEDIATE', 4),

                                                                                              (78, 'The Mirror Web operation collected payment details from victims. Which single habit would have prevented every victim from being defrauded?',
                                                                                               'Manually typing the official website URL into the browser instead of clicking links',
                                                                                               'Every Mirror Web victim arrived at the fake site by clicking a link — from an email social media advert or search result. If victims had typed amazon.com or lloydsbank.com directly into their browser address bar they would have reached the real site every time. This single habit defeats almost every fake website attack.',
                                                                                               'BEGINNER', 4)

ON CONFLICT (id) DO NOTHING;

INSERT INTO question_options (question_id, options) VALUES
                                                        (74, 'The website loaded too slowly'),    (74, 'The domain used a zero instead of the letter o in amazon'),    (74, 'The prices were different from real Amazon'),    (74, 'The website did not have a logo'),
                                                        (75, 'HTTPS padlocks are only on government websites'),    (75, 'HTTPS only encrypts the connection — it does not verify the site is legitimate'),    (75, 'The padlock should have been gold not green'),    (75, 'HTTPS is only reliable on shopping websites'),
                                                        (76, 'lloydsbank.com'),    (76, 'secure.banking.lloydsbank.com'),    (76, 'banking.lloydsbank.com.account-verify.net'),    (76, 'account-verify.net'),
                                                        (77, 'To help customers find good deals faster'),    (77, 'To bypass rational thinking and make victims click without scrutinising the URL'),    (77, 'Social media requires urgent language in adverts'),    (77, 'Urgency makes adverts cheaper to run'),
                                                        (78, 'Using a faster internet connection'),    (78, 'Manually typing the official website URL into the browser instead of clicking links'),    (78, 'Only shopping during business hours'),    (78, 'Using a different browser')
ON CONFLICT DO NOTHING;


-- ─────────────────────────────────────────────
-- MISSIONS
-- ─────────────────────────────────────────────
INSERT INTO mission (id, title, description, level_required) VALUES
                                                                 (1, 'Operation: Inbox Zero',   'A company employee clicked a suspicious email. Trace the attack step by step and contain the breach.', 0),
                                                                 (2, 'Operation: Vault Breaker','An attacker gained access to a corporate account. Investigate how the weak password chain was exploited.', 1),
                                                                 (3, 'Operation: Ghost Signal', 'An unknown process is consuming network bandwidth. Identify and neutralize the malware infection chain.', 2),
                                                                 (4, 'Operation: Mirror Web',   'Users are being redirected to fake websites and losing credentials. Map the full attack and shut it down.', 3)
ON CONFLICT (id) DO NOTHING;


-- ─────────────────────────────────────────────
-- MISSION STEPS — story-connected questions
-- ─────────────────────────────────────────────

-- Mission 1: Operation Inbox Zero — Sarah phishing attack
INSERT INTO mission_step (id, step_order, mission_id, question_id) VALUES
                                                                       (1, 1, 1, 61),
                                                                       (2, 2, 1, 62),
                                                                       (3, 3, 1, 63),
                                                                       (4, 4, 1, 64)
ON CONFLICT (id) DO NOTHING;

-- Mission 2: Operation Vault Breaker — Dave password breach
INSERT INTO mission_step (id, step_order, mission_id, question_id) VALUES
                                                                       (5, 1, 2, 65),
                                                                       (6, 2, 2, 66),
                                                                       (7, 3, 2, 67),
                                                                       (8, 4, 2, 68)
ON CONFLICT (id) DO NOTHING;

-- Mission 3: Operation Ghost Signal — Luca malware chain
INSERT INTO mission_step (id, step_order, mission_id, question_id) VALUES
                                                                       (9,  1, 3, 69),
                                                                       (10, 2, 3, 70),
                                                                       (11, 3, 3, 71),
                                                                       (12, 4, 3, 72),
                                                                       (13, 5, 3, 73)
ON CONFLICT (id) DO NOTHING;

-- Mission 4: Operation Mirror Web — global fake website ring
INSERT INTO mission_step (id, step_order, mission_id, question_id) VALUES
                                                                       (14, 1, 4, 74),
                                                                       (15, 2, 4, 75),
                                                                       (16, 3, 4, 76),
                                                                       (17, 4, 4, 77),
                                                                       (18, 5, 4, 78)
ON CONFLICT (id) DO NOTHING;