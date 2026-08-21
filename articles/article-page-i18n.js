(function(){
  const slug = (document.querySelector('link[rel="canonical"]')?.href || '').replace(/\/$/, '').replace(/\.html$/, '').split('/').pop();
  const contentEl = document.querySelector('.art-content');
  if (!contentEl) return;
  const originalHtml = contentEl.innerHTML;
  const originalDocTitle = document.title;
  const originalTitle = document.querySelector('.art-title')?.innerHTML || '';
  const originalCategory = document.querySelector('.art-category')?.textContent || '';
  const originalDate = document.querySelector('.art-date')?.textContent || '';
  const originalRead = document.querySelector('.art-readtime')?.textContent || '';
  const originalCurrent = document.querySelector('.arc-current')?.textContent || '';
  const originalArticlesLink = document.querySelector('[data-wk-articles-link]')?.textContent || '';
  const originalBottomTitle = document.querySelector('.art-bottom-cta h2')?.innerHTML || '';
  const originalBottomText = document.querySelector('.art-bottom-cta p')?.textContent || '';
  const originalBottomPrimaryBtn = document.querySelector('.art-bottom-cta-btns .btn.btn-red')?.textContent || '';
  const originalBottomSecondaryBtn = document.querySelector('.art-bottom-cta-btns .btn.btn-outline-white')?.textContent || '';
  const originalRelatedTitle = document.querySelector('.art-related h3')?.textContent || '';

  const translations = {
    'how-to-choose-the-right-colors-for-your-brand': {
      current: 'Brand & Trust',
      category: 'Brand & Trust',
      date: '5 August 2026',
      read: '7 min read',
      docTitle: 'How to Choose the Right Colors for Your Brand | WebKreatives',
      title: 'How to Choose the Right Colors<br><em>for Your Brand</em>',
      bottomTitle: 'Want a brand identity that works<br>as well online as it does offline?',
      bottomText: 'We design websites for local businesses: recognisable, readable on every screen and built to bring in enquiries.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>The same sentence comes up in almost every new project: "I'd like something with blue, I think it looks nice." Understandable, but it's the wrong question. Colour on a website is rarely about taste. It's about <strong>how quickly someone recognises your business, how easily they read your text, and whether they spot the button you want them to press</strong>.</p>
<p>For a hair salon, a dental practice or an installation company, this doesn't have to be a complicated exercise. You don't need a forty-page brand book. You need a handful of clear decisions that you then apply consistently, everywhere.</p>
<p>In practice, a working brand palette comes down to three roles. Not three nice colours side by side, but three jobs that need to be divided up.</p>
<div class="art-mini-grid">
  <div class="art-mini-card">
    <span class="eyebrow">Base</span>
    <h3>Your quiet colour</h3>
    <p>The background everything sits in: white, off-white, deep charcoal. This is 60 to 70 percent of your site and it's allowed to be boring.</p>
  </div>
  <div class="art-mini-card">
    <span class="eyebrow">Brand</span>
    <h3>Your main colour</h3>
    <p>The colour people associate with you. Found in your logo, headings and blocks. One colour, not three variations of it.</p>
  </div>
  <div class="art-mini-card">
    <span class="eyebrow">Action</span>
    <h3>Your accent colour</h3>
    <p>Reserved for buttons and links. Use it for decoration as well and it loses exactly the function you need it for.</p>
  </div>
</div>
<p>This split — often summarised as 60/30/10 — isn't a law of design, but it does prevent the problem we see most often: a site where everything shouts equally loudly, so the visitor sees nothing at all.</p>
<h2>Colour is recognition, not decoration</h2>
<p>Think of the businesses you can identify without seeing their logo. That's almost never down to an unusual colour, but to an ordinary colour used in exactly the same way for years. Repetition does the work, not originality.</p>
<p>For a local business that means something very practical. Your van, your shop sign, your Instagram posts, your quotes and your website should all carry the same colour. A customer who sees your van parked on their street and lands on your site a week later should make that connection without thinking about it.</p>
<div class="art-quote">
  <p>"A colour only becomes a brand colour at the point where you start finding it boring. That's usually the exact moment customers finally recognise it."</p>
</div>
<p>It's also why we're cautious about "refreshing" colours every year. Every change resets the recognition counter to zero.</p>
<h2>What colour psychology does and doesn't promise</h2>
<p>There are plenty of lists online where blue means trust, green means sustainability and red means urgency. There's a kernel of truth in that, but it's blunter than it looks. Context decides almost everything.</p>
<p>Red is intrusive in a yoga studio and perfectly logical for a pizzeria or a gym. Green feels obvious for a landscaper and vague for a law firm. So the question isn't what a colour "means", but whether it fits what you sell and who your customers are.</p>
<ul class="art-checklist">
  <li>Look at your five nearest local competitors — if they're all blue, that's an opportunity, not a rule</li>
  <li>Consider whether your customers choose on feeling (hospitality, wellness) or on reassurance (healthcare, finance, technical trades)</li>
  <li>Test your colour against a photo of your own work or your own premises, not against an empty white square</li>
  <li>Ask yourself whether the colour will still suit you in five years</li>
</ul>
<figure class="art-img">
  <img src="https://images.unsplash.com/photo-1605858299258-36375bd7132c?auto=format&fit=crop&w=1200&q=80" alt="Coloured paper swatches in red, yellow and green side by side" loading="lazy">
  <figcaption>You never judge a palette in isolation. Colours only take on meaning next to each other, in the context where they'll actually be used.</figcaption>
</figure>
<h2>Contrast matters more than the colour itself</h2>
<p>This is where most self-built websites come unstuck. The colour choice is fine, but the text sitting in it is barely legible. Light grey letters on white. Yellow on white. White text on a pale blue button.</p>
<p>The rule of thumb we work with comes from the accessibility guidelines: body text needs a contrast ratio of at least 4.5 to 1 against its background, large headings 3 to 1. You can check that in thirty seconds with a free contrast checker.</p>
<p>That isn't a theoretical detail. Some of your visitors read your site on a phone in bright sunlight, or are over fifty, or have some form of colour blindness — that last one applies to roughly one in twelve men. Poor contrast costs you those people without ever showing up in your analytics.</p>
<div class="art-cta-box">
  <div class="art-cta-box-text">
    <h3>Not sure how your colours hold up online?</h3>
    <p>We're happy to review your identity, contrast and readability — and translate it into a website that looks professional and actually works.</p>
  </div>
  <a href="/#contact" class="btn btn-red">Request a quote →</a>
</div>
<h2>One accent colour, strictly guarded</h2>
<p>If there's one piece of advice that makes an immediate difference, it's this: reserve your brightest colour exclusively for the action you want visitors to take. Calling, requesting a quote, booking an appointment.</p>
<p>The moment that same colour also appears in your icons, your pull quotes and your footer, it stops being a signal and becomes wallpaper. Visitors scan a page in a few seconds; they unconsciously look for the thing that stands out. Give them exactly one per screen.</p>
<p>A practical example: contact pages often have a green "Send" button next to an equally green WhatsApp button and a green phone icon. All three useful, but together they produce a page with no clear preference. Pick the most important action, give it the accent colour, and calm the rest down.</p>
<h2>Building a palette in an afternoon</h2>
<p>You don't need to hire a design studio to get started. This order works for most small businesses:</p>
<ol class="art-steps">
  <li><strong>Start with what you already have</strong> — your logo, your van, your shopfront or your packaging. The colour customers already know you by is usually your main colour.</li>
  <li><strong>Pick a neutral base</strong> — white or a very dark grey. Black on white is almost never a mistake.</li>
  <li><strong>Choose one accent colour</strong> — something that clearly contrasts with both your base and your main colour, for buttons only.</li>
  <li><strong>Add two greys</strong> — one for body text, one for captions and borders. This is what makes a palette feel calm.</li>
  <li><strong>Check the contrast</strong> — every text colour against every background it appears on.</li>
  <li><strong>Write it down</strong> — put the hex codes in one document and use them everywhere, offline included.</li>
</ol>
<p>Six colours in total, greys included. That sounds sparse, but almost every website that looks well put together uses fewer colours than you'd expect.</p>
<h2>Conclusion</h2>
<p>Choosing the right brand colours isn't a creative quest. It's a series of small, practical decisions: one colour to be recognised by, one to steer action with, and a quiet base that keeps your text readable.</p>
<p>What counts after that is discipline. An average palette used consistently for years builds more trust than a perfect palette that changes every season. Choose clearly, check your contrast, and then stick with it.</p>
`
    },

    'website-security-basics-for-small-businesses': {
      current: 'Performance',
      category: 'Performance',
      date: '27 July 2026',
      read: '8 min read',
      docTitle: 'Website Security Basics Every Small Business Needs | WebKreatives',
      title: 'Website Security Basics<br><em>Every Small Business Needs</em>',
      bottomTitle: 'Want a website that stays safe<br>without you thinking about it?',
      bottomText: 'We build and maintain websites for small businesses: fast, properly secured, with backups and updates simply taken care of.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>An installation company called us on a Tuesday morning last year. Their website had suddenly started showing an ad for a gambling site, somewhere at the bottom of the contact page. No movie-style hack, no ransom demand, no drama. Just a plugin that hadn't been updated in two years.</p>
<p>Stories like that are the rule rather than the exception. Small businesses are rarely targeted deliberately. They get found by automated scripts that comb the entire internet looking for outdated software. <strong>Your website usually isn't a target — it's an open door that something happened to walk past.</strong></p>
<p>The good news: you don't need an IT department for this. Website security for a hair salon, a dental practice or a restaurant comes down to five things you keep in order. Here they are, in the order they usually go wrong.</p>
<h2><span class="num">1</span> What security actually means for your site</h2>
<p>When business owners hear "security", they think of hackers and stolen data. For a local website the risk is far more practical. The damage almost always shows up in these four ways:</p>
<ul class="art-checklist">
  <li>Your site is down at the exact moment a customer looks for you</li>
  <li>Google flags your site as unsafe, so visitors see a warning first</li>
  <li>You lose copy, photos or form submissions with no recent copy to fall back on</li>
  <li>Your reputation takes a hit because there's junk sitting on your domain</li>
</ul>
<p>That's not an abstract cyber risk. That's a week without enquiries, plus an invoice from a developer who has to clean up the mess. Prevention here is literally ten times cheaper than repair.</p>
<h2><span class="num">2</span> SSL is the minimum, not an achievement</h2>
<p>The padlock in the address bar (the https certificate) is standard by now. Every serious host provides it for free. Without it, browsers show an explicit warning on a contact form — which is precisely the moment you lose an enquiry.</p>
<div class="art-mistake">
  <strong>Common mistake</strong>
  <p>Assuming you're done the moment the padlock appears. SSL only encrypts the traffic between visitor and server. It says nothing about outdated plugins, weak passwords or missing backups — the things that actually cause trouble.</p>
</div>
<p>Also check that your site genuinely <em>redirects</em> to https. We regularly see websites where both versions exist side by side. That confuses visitors and splits your SEO value across two addresses.</p>
<h2><span class="num">3</span> Overdue maintenance is the real hole</h2>
<p>Almost every hacked small-business website we come across was entered through outdated software. A theme, a plugin, a form module. Someone publishes a vulnerability, scripts scan for it worldwide, and a site that hasn't been updated in three months floats to the surface.</p>
<p>The fix isn't a big project — it's a rhythm. Here's what a realistic maintenance schedule looks like for a small business:</p>
<ol class="art-steps">
  <li><strong>Monthly:</strong> apply updates to your CMS, theme and plugins — back up first, then update.</li>
  <li><strong>After every update:</strong> check the homepage, the contact form and one service page on your phone.</li>
  <li><strong>Every quarter:</strong> delete plugins you don't use entirely, not just deactivate them.</li>
  <li><strong>Twice a year:</strong> check whether everything you rely on is still actively maintained by its maker.</li>
  <li><strong>Ongoing:</strong> send update notifications to an email address you actually read.</li>
</ol>
<p>Fifteen minutes a month covers this for most small sites. If you don't have the time or the appetite, make it part of a maintenance agreement with your agency. What you shouldn't do is skip it because the site "works fine".</p>
<figure class="art-img">
  <img src="https://images.unsplash.com/photo-1768839722988-91767bb82b10?auto=format&fit=crop&w=1200&q=80" alt="Padlock and keys on a keyboard, representing access and security" loading="lazy">
  <figcaption>Most incidents at small businesses don't start with an attack — they start with software left un-updated for too long.</figcaption>
</figure>
<h2><span class="num">4</span> Backups: your only real safety net</h2>
<p>Of everything on this list, this matters most. Every other measure reduces the chance that something happens. A backup decides how bad it is when something does: half a day of inconvenience, or weeks of work gone.</p>
<p>A usable backup meets four conditions:</p>
<ol class="art-steps">
  <li><strong>Automatic.</strong> Manual backups get forgotten precisely during your busiest weeks.</li>
  <li><strong>Stored off your own server.</strong> A copy on the same server disappears along with the problem.</li>
  <li><strong>Recent enough.</strong> Ask yourself how many days of work you could lose without real pain. That's your frequency.</li>
  <li><strong>Tested.</strong> Restore a backup once to a staging environment. A backup you've never restored is an assumption.</li>
</ol>
<p>Almost every business skips that last point. And that's exactly where it gets painful, because you normally discover a corrupted backup at the worst possible moment.</p>
<div class="art-cta-box">
  <div class="art-cta-box-text">
    <h3>Not sure whether your site is set up properly?</h3>
    <p>We check the SSL, updates, backups and hosting of your website and tell you in plain language what is and isn't in order.</p>
  </div>
  <a href="/#contact" class="btn btn-red">Request a check →</a>
</div>
<h2><span class="num">5</span> Your hosting decides more than you'd think</h2>
<p>Cheap hosting at two euros a month is rarely a bargain. You're sharing a server with hundreds of other sites, server software updates lag behind, and support consists of a form you wait days on.</p>
<p>What to look for in good hosting isn't complicated: recent PHP versions, automatic daily backups, free SSL, a firewall at server level and reachable support in your own language. For a small business site that usually costs between ten and thirty euros a month — the difference between "one phone call" and days offline.</p>
<h2><span class="num">6</span> The human side: access and passwords</h2>
<p>Technology is rarely the weakest point. People are. The intern who left three years ago and still has admin rights. The password <em>Salon2023!</em> that's also used on five other services. The login details sitting in a WhatsApp group.</p>
<ul class="art-checklist">
  <li>Give everyone only the rights their role needs — administrator is for administrators</li>
  <li>Remove accounts for people who no longer work with you, that same week</li>
  <li>Turn on two-factor authentication for your CMS, your hosting and your domain registrar</li>
  <li>Keep passwords in a password manager, not in your inbox</li>
  <li>Make sure you own your domain and hosting yourself, not your previous builder</li>
</ul>
<p>That last one isn't a security detail, it's a business risk. If you can't get into your own domain, you can't act when something goes wrong — no matter how well the rest is arranged.</p>
<h2>Conclusion</h2>
<p>Website security for a small business isn't a technical specialism. It's maintenance: a valid certificate, monthly updates, a tested backup stored off your server, hosting that does its job, and access that's kept tidy.</p>
<p>Block out half an hour once and you'll have covered most of it. Do nothing, and it isn't a question of whether but when you find out — usually at the moment a customer actually needs your website.</p>
`
    },

    'does-your-small-business-need-a-blog': {
      current: 'Local SEO',
      category: 'Local SEO',
      date: '20 July 2026',
      read: '7 min read',
      docTitle: 'Does Your Small Business Actually Need a Blog? | WebKreatives',
      title: 'Does Your Small Business<br><em>Actually Need a Blog?</em>',
      bottomTitle: 'Want to be found for the questions<br>your customers are already asking?',
      bottomText: 'We build websites for small businesses where local visibility, clear copy and obvious conversion steps work together.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<div class="art-quote">
  <p>"Do I really have to start blogging? I run a building firm, not a newspaper."</p>
</div>
<p>We hear that reaction regularly, and it's entirely fair. For a hairdresser, a dental practice or an installation company, blogging feels like something for marketing agencies: a lot of work, very little visible return. And often that's exactly what it turns into.</p>
<p>Still, "no, forget it" isn't the right answer either. A blog isn't an obligation, but it is one of the few ways to get found for the questions your customers ask <em>before</em> they pick a business. The difference isn't how often you publish — it's what you choose to answer.</p>
<h2>What a blog does that your service pages can't</h2>
<p>Your service pages cover the searches where the decision is nearly made: "hairdresser Amersfoort", "emergency plumber Utrecht", "dentist near me". That's valuable traffic, but it's also the traffic everyone is fighting over.</p>
<p>Sitting in front of that is a much broader layer of searches nobody in your region has published anything for: "what does a bathroom renovation cost", "how often should a crown be checked", "can I put solar panels on a listed building". Those aren't searches for your homepage. They need one page per question — and that's exactly what an article is.</p>
<p>There's a second reason, one that has less to do with Google. A good article is something you can <strong>send</strong>. A customer torn between two options, an enquiry over WhatsApp, an email asking a question you've answered nine times before: one link saves you ten minutes every time and makes you look like the expert you are.</p>
<h2>Why "posting something every week" almost never works</h2>
<p>Most business blogs die the same death. It starts with a plan to publish weekly, the first two articles come out fine, the third is a struggle, and then it goes quiet. What's left is worse than no blog at all: a page with three short pieces from two years ago.</p>
<div class="art-mistake">
  <strong>The classic mistake</strong>
  <p>Putting volume ahead of relevance. Twelve rushed 300-word articles about generic topics do nothing. Six good articles a year that fully answer a real customer question keep pulling in visitors for years.</p>
</div>
<p>A realistic rhythm for a small business is one article every six to eight weeks. That's manageable alongside the actual work, and it's enough. An article that answers a concrete question properly barely ages: it's still there next summer when you're flat out.</p>
<h2>Which topics actually pay off</h2>
<p>You don't need to invent topics. They come past every week in your phone calls and your inbox. The questions you can answer without thinking are precisely the questions people type into Google.</p>
<ul class="art-checklist">
  <li>The question you get weekly on the phone, written out the way you explain it</li>
  <li>What something costs, and why it's more expensive for one customer than another</li>
  <li>How customers choose between two options you offer</li>
  <li>Something specific to your town or region: rules, seasons, types of housing</li>
  <li>A project you genuinely delivered, with photos, decisions and the result</li>
</ul>
<p>That last one is often the strongest for local businesses. An article about a bathroom you renovated in a 1930s house in the neighbourhood does two things at once: it shows what you're capable of, and it naturally contains the words people nearby are searching for.</p>
<figure class="art-img">
  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80" alt="Business owners discussing content and planning together" loading="lazy">
  <figcaption>You don't have to dream up the best topics — they're the questions your customers are already asking you.</figcaption>
</figure>
<h2>How to write one article that keeps working</h2>
<p>Writing an article doesn't have to be a week-long project. Follow this route and you're usually done in two to three hours.</p>
<ol class="art-steps">
  <li><strong>Pick one question.</strong> Not "everything about bathrooms", but "what does renovating a small bathroom cost". One question, one article.</li>
  <li><strong>Write 600 to 900 words in plain language.</strong> The way you'd explain it at the kitchen table. No jargon, no three-paragraph run-up.</li>
  <li><strong>Be concrete about prices, timescales and examples.</strong> "Budget €6,000 to €9,000" is a hundred times more useful than "the price varies per situation".</li>
  <li><strong>Mention your town or region where it fits naturally.</strong> Once or twice in the text is plenty; forcing it works against you.</li>
  <li><strong>Link to the matching service page.</strong> The article informs, the service page sells. Without that link the visit hits a dead end.</li>
  <li><strong>Close with one clear next step.</strong> Call, request a quote or book an appointment. Pick one.</li>
</ol>
<p>Finally, add a date and your name. An article with a face and a date reads as more credible than an anonymous text, and it helps visitors see that your business is active.</p>
<div class="art-cta-box">
  <div class="art-cta-box-text">
    <h3>Want a website where content actually does something?</h3>
    <p>We build sites for small businesses where articles, service pages and enquiry forms connect properly, so visits don't hit a dead end.</p>
  </div>
  <a href="/#contact" class="btn btn-red">Request a quote →</a>
</div>
<h2>When a blog isn't the priority yet</h2>
<p>Sometimes the honest advice is: not yet. Content only works once the basics are in place. If a visitor lands on your article and then meets a confusing homepage, a slow load or a phone number they can't find, all you've done is buy traffic that leaves again.</p>
<p>The order we almost always recommend: a clear homepage and service pages first, then a complete Google Business Profile, then speed and mobile, then reviews. A blog after that. Flip the order and you rarely see results — and then wrongly conclude that blogging doesn't work.</p>
<h2>How to tell whether it's working</h2>
<p>Don't expect results after three weeks. An article usually needs three to six months before it pulls serious traffic, and that traffic keeps growing slowly afterwards.</p>
<p>Check Google Search Console for which searches your articles are bringing in, not just how many visitors you have. When you suddenly see impressions for questions you'd never have thought of, you know the mechanism is working. And simply ask new customers how they found you: "I read that piece about your bathrooms" is a clearer signal than any dashboard.</p>
<h2>Conclusion</h2>
<p>Does your small business need a blog? Not in the sense of a mandatory content calendar. But yes, in the sense of a handful of good articles that answer the questions customers ask before they call.</p>
<p>Start small: take the question you get most often and write it out properly, once. If that single article turns out to bring in visitors and enquiries six months later, you'll know exactly whether it's worth adding five more.</p>
`
    },

    'why-your-website-needs-clear-calls-to-action': {
      current: 'Conversion',
      category: 'Conversion',
      date: '13 July 2026',
      read: '7 min read',
      docTitle: 'Why Clear Calls-to-Action Make All the Difference | WebKreatives',
      title: 'Why Clear Calls-to-Action<br><em>Make All the Difference</em>',
      bottomTitle: 'Want a website that actually<br>guides visitors to get in touch?',
      bottomText: 'We build websites for small businesses with clear calls-to-action and conversion flows that look professional and generate more real enquiries.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>Picture this: someone finds your website, reads your copy, looks at your work and thinks "this looks good". And then? If it isn't crystal clear at that moment what the next step is, usually nothing happens. The visitor clicks away and you never even know you almost had a customer.</p>
<p>That's exactly what a <strong>call-to-action</strong> prevents. It's the button or line that tells the visitor what they can do right now: call, request a quote, book an appointment. It sounds simple, but this is precisely where many small businesses quietly lose customers. A strong call-to-action isn't a detail. It's the bridge between "interested" and "in touch".</p>
<div class="art-mini-grid">
  <div class="art-mini-card">
    <span class="eyebrow">Clear</span>
    <h3>One obvious action</h3>
    <p>The visitor doesn't have to think about what to do. The next step is written out, in plain language.</p>
  </div>
  <div class="art-mini-card">
    <span class="eyebrow">Visible</span>
    <h3>In view straight away</h3>
    <p>A good button stands out through colour and position, without the visitor having to hunt for it.</p>
  </div>
  <div class="art-mini-card">
    <span class="eyebrow">Concrete</span>
    <h3>A real promise</h3>
    <p>Not a vague "submit", but text that says what happens: "Book a free intro call".</p>
  </div>
</div>
<p>In this article we look at why clear calls-to-action make such a difference, where it often goes wrong and how to make yours stronger — whether you're a hairdresser, a handyman or a coach.</p>
<h2><span class="num">1</span> What a call-to-action actually does</h2>
<p>A call-to-action, often shortened to CTA, is any spot where you ask the visitor to do something. It can be a button, a link or a short line that leads to an action. Think "Request a quote", "Call us today" or "See our prices".</p>
<p>The thing is, people on your website don't take the right step on their own. They're busy, they scan quickly and they wait for a clear signal. Without that signal they stay passive. A good CTA removes that hesitation by spelling out exactly what the logical next step is.</p>
<h2><span class="num">2</span> Why vague buttons make visitors leave</h2>
<p>Plenty of websites have a button, but no real call-to-action. The difference is clarity. A button that says "More information" or just "Submit" tells the visitor nothing about what will happen or why they should click.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Assuming visitors will just work out what to do. They often do understand — but they hesitate. And when in doubt, most people simply click away instead of taking action.</p></div>
<p>Doubt is the biggest enemy of conversion. Every second someone has to spend thinking "where do I click?" is a second in which they might drop off. A clear CTA removes that barrier by making the choice easy and obvious.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80" alt="Person tapping a button on a smartphone" loading="lazy"><figcaption>On mobile, clarity counts double: a visible, well-placed button often decides whether someone gets in touch or keeps scrolling.</figcaption></figure>
<h2><span class="num">3</span> The rule of one main action per page</h2>
<p>One of the most powerful principles is also the simplest: give every page one clear main action. If your visitor is asked to call, sign up for the newsletter, follow you on social media and request a quote all at once, you create decision paralysis. And too much choice often leads to no choice at all.</p>
<p>Decide per page what you really want someone to do. On your homepage that might be "Request a quote". On a service page, "Book an appointment". Make that one action the most visible and let the rest stay secondary. One clear direction works better than five half-hearted ones.</p>
<h2><span class="num">4</span> Where to place your calls-to-action</h2>
<p>A strong CTA in the wrong place is a missed opportunity. Visitors make their decision at different moments, so your button can appear in more than one spot. Not pushy, but logical.</p>
<ul class="art-checklist">
  <li>Right in view on arrival, so the quick decider can act straight away</li>
  <li>After a block of proof or explanation, once the doubt has just been removed</li>
  <li>At the bottom of the page, for those who want to read everything first</li>
  <li>Fixed in the menu or as a standout button, so contact is always within reach</li>
</ul>
<p>The idea isn't to scatter buttons everywhere, but to give the visitor a clear route to contact at every natural decision point.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Are your visitors actually taking the step to get in touch?</h3><p>We build websites for small businesses with clear calls-to-action and conversion flows that generate enquiries, instead of visitors who disappear again.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2><span class="num">5</span> The words on your button matter a lot</h2>
<p>The text on a button looks like a small detail, but it does a lot of work. A good CTA line is concrete, active and tells the visitor what they get. Compare these two:</p>
<ul class="art-checklist">
  <li><strong>Weak:</strong> "Submit" — cold and meaningless</li>
  <li><strong>Strong:</strong> "Book a free intro call" — concrete and inviting</li>
</ul>
<p>Where you can, start with a verb and make clear what happens after the click. Words like "free", "no obligation" or "today" lower the barrier, because they make the risk feel smaller for the visitor.</p>
<h2><span class="num">6</span> Small details that make your CTA stronger</h2>
<p>Once the basics are in place, a few details make the difference between a button that gets ignored and one that gets clicked. You don't need to be an expert for this, just aware of a handful of things.</p>
<ol class="art-checklist">
  <li>Use contrast: the button should visually separate from the rest</li>
  <li>Make it large enough to tap easily on mobile</li>
  <li>Give it space, so it doesn't get lost among other elements</li>
  <li>Add a small reassuring line, like "reply within 24 hours"</li>
</ol>
<p>These details take little effort, but they lower the barrier at exactly the moment the visitor is about to decide. And that moment is where conversion really happens.</p>
<h2>Conclusion</h2>
<p>A nice-looking website is only valuable when visitors actually take action. Clear calls-to-action are the bridge between interest and contact: they tell the visitor what they can do, remove doubt and make the next step obvious.</p>
<p>Take a critical look at your own website. Is it immediately clear on every page what the visitor should do? If not, you're probably leaving enquiries on the table that could have been there with little effort. Often a clearer button, in the right place, with the right words, is all it takes to make the difference.</p>`
    },

    'how-to-write-website-copy-that-sells': {
      current: 'Conversion',
      category: 'Conversion',
      date: '6 July 2026',
      read: '7 min read',
      docTitle: 'How to Write Website Copy That Sells | WebKreatives',
      title: 'How to Write Website Copy<br><em>That Actually Sells</em>',
      bottomTitle: 'Want copy that actually<br>moves customers to act?',
      bottomText: 'We build websites with copy that communicates clearly, earns trust and creates more real enquiries — without sounding slick or salesy.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>You've got a good-looking website. Clean photos, fresh colours, everything in its place. And still, hardly any enquiries come in. Often the problem isn't the design — it's the words. <strong>Copy sells, not just visuals.</strong></p>
<p>Great website copy doesn't have to sound slick or overly salesy. Mostly it just needs to make clear what you do, who it's for, and why someone should choose you. That sounds simple, but it's exactly where most small businesses go wrong. And the good news: you don't need to be a copywriter to do it better.</p>
<h2>Write for the customer, not about yourself</h2>
<p>The most common mistake on small-business websites: everything is about the business itself. "Founded in 2012", "We deliver quality", "Our team is here for you." All true, but the visitor is really thinking one thing: what's in it for me?</p>
<p>People don't read your website to get to know you. They read to work out whether you solve their problem. So flip your copy around. Start with what the customer wants to achieve, and only then show how you fit in.</p>
<div class="art-quote"><p>"Customers don't buy a service. They buy the result your service gives them."</p></div>
<p>A hairdresser doesn't sell a haircut, but the feeling of looking well cared for again. A handyman doesn't sell hours, but a home where everything works again. Write about that result and you hit the right note straight away.</p>
<h2>Start with a headline that promises something</h2>
<p>The first line decides whether someone keeps reading. Yet many homepages open with something vague like "Welcome to our website" or just the company name. That's wasted space, right where you have the most attention.</p>
<p>A strong headline makes clear in one line what you do and what it delivers. Not clever or funny, just clear. Compare these two:</p>
<ul class="art-checklist"><li><strong>Weak:</strong> "Welcome to Anna's Hair Salon"</li><li><strong>Strong:</strong> "A fresh cut without the long wait, in the heart of Utrecht"</li></ul>
<p>The second version tells you straight away what you get, where it is, and which benefit stands out. That's the job your headline should do: make a visitor think "this is for me" within two seconds.</p>
<h2>Turn features into benefits</h2>
<p>Features describe what something is. Benefits describe what the customer gets out of it. You almost always persuade visitors with the second one, not with a list of specifications.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80" alt="Someone writing and rewriting copy at a desk with a laptop and notebook" loading="lazy"><figcaption>Strong copy rarely happens in one go. You write down what you do, then translate it into what the customer gains.</figcaption></figure>
<p>A simple exercise: put the words "so that" after every feature and write down what it gives the customer.</p>
<ul class="art-checklist"><li>"Book online 24/7" <em>so that</em> you never have to wait in a queue</li><li>"Fixed price up front" <em>so that</em> you're never hit with surprises</li><li>"Reply within 24 hours" <em>so that</em> you're not waiting days for an answer</li></ul>
<p>The feature can stay, but it's the part after "so that" that convinces the visitor. That's the line that sticks.</p>
<h2>A framework that makes your copy persuasive</h2>
<p>You don't need to be a professional copywriter to write strong pages. Follow these four steps and your copy gets more convincing almost by itself.</p>
<ol class="art-steps"><li><strong>Start with the problem</strong>Briefly name the situation your customer is in. That makes them feel understood straight away and keeps them reading instead of clicking away.</li><li><strong>Show the solution</strong>Explain clearly what you offer and how it removes their problem. No jargon, just plain language anyone understands.</li><li><strong>Give a reason to trust you</strong>Add proof: a review, a concrete result, years of experience or a real-world example.</li><li><strong>End with one clear action</strong>Tell the visitor exactly what to do now: call, book an appointment, or request a quote.</li></ol>
<p>This order works on almost any page, from your homepage to a single service page. Problem, solution, proof, action. Remember those four words and you already have a structure most websites go without.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Is your copy falling flat?</h3><p>We help small businesses with websites and copy that genuinely persuade customers to get in touch — clear, human and focused on results.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>Give every page one clear choice</h2>
<p>A common mistake is trying to do too much. A page that asks you to call, sign up for the newsletter, follow on social media and request a quote all at once paralyses the visitor. Too much choice often leads to no choice at all.</p>
<p>Decide per page what the most important action is and make that one the most visible. The rest can exist, but should never compete with that single main goal. One clear direction works better than five half-hearted ones.</p>
<h2>Write the way you talk, and keep it short</h2>
<p>Professional doesn't mean stiff. The copy that works best reads as if you were telling a customer at the counter. Short sentences. Everyday words. No "hereby", "notwithstanding" or "we continuously strive to".</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Stuffing your copy with jargon to sound expert. The effect is usually the opposite: the visitor drops off because it takes too much effort to work out what you actually offer.</p></div>
<p>A simple test: read your copy out loud. If you stumble over a sentence, so will your visitor. Cut it, simplify it, and say it the way you really would to someone in front of you.</p>
<h2>Conclusion</h2>
<p>Good website copy isn't about pretty words, but about clarity. Write for your customer, open with a clear promise, turn features into benefits, and end every page with one clear action.</p>
<p>You don't need to be a professional copywriter to get this right. With a little attention and the simple framework from this article, you turn vague text into pages that genuinely move visitors to get in touch. And that, in the end, is what your website is for.</p>`
    },

    'the-real-cost-of-a-diy-website': {
      current: 'Small Business',
      category: 'Small Business',
      date: '29 June 2026',
      read: '8 min read',
      docTitle: 'The Hidden Cost of a DIY Website | WebKreatives',
      title: 'The Hidden Cost<br><em>of a DIY Website</em>',
      bottomTitle: 'Want a website that never<br>leaves local customers behind?',
      bottomText: 'We build professional websites for small businesses: clear, fast and made to bring in real enquiries — without costing you your evenings.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>"I'll just build the website myself, it'll save money." It sounds reasonable, especially when you're starting out. Plenty of builders promise you'll be online within an afternoon, for free or a few euros a month. On paper, that looks like the cheapest route.</p>
<p>But a website has two kinds of cost. One shows up on the invoice. The other shows up nowhere — and with a do-it-yourself site, that second one is usually the most expensive. <strong>A DIY website is rarely truly free. You just pay for it in a different way.</strong></p>
<div class="art-mistake"><strong>The false assumption</strong><p>Many owners only compare the monthly price of a website builder with a quote from an agency. What that comparison leaves out: the hours of your own time, and the customers who walk away from a site that felt "good enough" but wasn't.</p></div>
<p>This isn't an argument against doing it yourself. For some businesses, a simple DIY page is perfectly fine. The point is to know the real cost before you choose, so you don't discover months later that "free" turned out to be expensive.</p>
<h2><span class="num">1</span> Your time is the biggest invisible bill</h2>
<p>The most underestimated cost of a self-built website is time. Not the afternoon the builder promises, but the evenings that follow. Writing copy, hunting for photos, working out why the menu behaves strangely on mobile, tweaking colours, starting over because it still doesn't feel right.</p>
<p>For a hairdresser, a handyman or a coach, that's time not spent on customers. Do the maths: if you put twenty to forty hours into a site, what is that worth in billable hours, or in the rest you could have taken instead? That figure quietly overtakes a professional quote more often than you'd think.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">20–40 hrs</span><span class="art-stat-label">is what a first self-built site easily costs an owner, spread across evenings and weekends</span></div><div class="art-stat"><span class="art-stat-num">Every month</span><span class="art-stat-label">a DIY site keeps asking for maintenance: updates, copy, small fixes you handle yourself</span></div><div class="art-stat"><span class="art-stat-num">€0?</span><span class="art-stat-label">doesn't exist — "free" builders earn from ads, upgrades and your time</span></div></div>
<h2><span class="num">2</span> Missed enquiries cost more than you think</h2>
<p>This is the most painful cost, because you never see it. A visitor who leaves a slow or confusing site doesn't come back to tell you why. They're simply gone — usually to the competitor who looked a little more professional.</p>
<div class="art-quote"><p>"A website that looks amateurish doesn't cost you a euro at the till. It costs you the customer who never got in touch."</p></div>
<p>Say an average missed customer is worth 150 euros to you. One lost enquiry a month is 1,800 euros a year. A website that holds back two or three extra enquiries a month isn't a saving anymore — it's the most expensive decision of your year.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Business owner discussing a website with a professional" loading="lazy"><figcaption>The gap between "good enough" and "trustworthy" is often exactly the gap between a visitor who clicks away and a customer who calls.</figcaption></figure>
<h2><span class="num">3</span> Where the hidden costs hide</h2>
<p>The real price of a DIY site rarely sits in one place. It's spread across small things that look harmless on their own but add up together.</p>
<div class="art-mini-grid"><div class="art-mini-card"><span class="eyebrow">Technical</span><h3>Slowness and errors</h3><p>Heavy templates, unused code and wrong-sized photos make your site slow. Every second of delay costs you visitors.</p></div><div class="art-mini-card"><span class="eyebrow">Trust</span><h3>An amateur look</h3><p>Stock templates everyone recognises, mismatched fonts and soulless stock photos make you less credible.</p></div><div class="art-mini-card"><span class="eyebrow">Visibility</span><h3>Invisible in Google</h3><p>Without solid structure, speed and copy, Google barely finds you. A pretty site nobody sees earns nothing.</p></div></div>
<p>Each of these is fixable on its own. But doing it yourself means "fixing" is something you work out — and that's more time again. This is how the bill that appears nowhere keeps growing.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Torn between doing it yourself and outsourcing?</h3><p>We'll think it through with you, no strings attached — sometimes that means a few smart tweaks, sometimes a full site that actually brings in enquiries.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2><span class="num">4</span> When doing it yourself does make sense</h2>
<p>Staying honest works better than scaremongering. There are situations where a DIY solution is perfectly fine, and it would be a waste to overspend then.</p>
<ul class="art-checklist"><li>You're testing an idea and want to see if there's demand first</li><li>You need one simple page with just contact details and opening hours</li><li>You genuinely enjoy building and have the time for it</li><li>You don't (yet) expect meaningful revenue through the website</li></ul>
<p>The moment your website becomes — or needs to become — a serious source of customers, the balance shifts. Then every missed enquiry weighs more heavily than the saving on the build.</p>
<h2><span class="num">5</span> The real comparison you should make</h2>
<p>The question isn't "free versus expensive". The honest comparison is: what does doing it myself really cost me, all in, against what a professional site earns me?</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Struggling for months with a site that never quite works, only to hire an agency in the end anyway. You then pay twice: first with your time, then with the quote you could have taken from the start.</p></div>
<p>Line them up: the hours you pour in, the enquiries you may lose, and the maintenance that keeps coming back. Against: a site that's right, loads faster, earns trust and is maintained for you. That sum often lands differently than the monthly price suggests.</p>
<h2>Conclusion</h2>
<p>A self-built website is almost never truly free. The price just isn't on the invoice — it's in your calendar and in the customers you narrowly missed. For a small test project or a simple page, that's fine. For a business that seriously wants to win customers, "cheap" is often the most expensive choice.</p>
<p>So don't only count in euros, but also in hours and missed chances. Once you include those honestly, the choice between doing it yourself and outsourcing suddenly gets a lot clearer — and usually a lot more logical.</p>`
    },

    'why-mobile-first-design-is-non-negotiable-in-2026': {
      current: 'Performance',
      category: 'Performance',
      date: '22 June 2026',
      read: '7 min read',
      docTitle: 'Why Mobile-First Design Is Non-Negotiable in 2026 | WebKreatives',
      title: 'Why Mobile-First Design<br><em>Is Non-Negotiable in 2026</em>',
      bottomTitle: 'Want a website that wins trust<br>and customers on every screen?',
      bottomText: 'We build mobile-first websites for small businesses: fast, clear and designed for how your customers actually visit you.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>Think back to the last time you looked up an address, an opening time or a price. Chances are you did it on your phone: standing in a shop, on the move, or quickly from the couch. That is how most people search today. And yet many websites are still designed as if the visitor is sitting calmly behind a large screen.</p>
<p>For local businesses, that is an expensive assumption. <strong>Mobile isn't one of the ways people view your site. For many businesses, it's the main one.</strong> That is why in 2026 mobile-first design is no longer an extra, but the starting point.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">60%+</span><span class="art-stat-label">of web traffic worldwide now comes from mobile devices</span></div><div class="art-stat"><span class="art-stat-num">Mobile-first</span><span class="art-stat-label">Google evaluates and indexes your site through the mobile version by default</span></div><div class="art-stat"><span class="art-stat-num">Seconds</span><span class="art-stat-label">that's how long it takes a visitor on a phone to decide whether to stay or leave</span></div></div>
<p>"Mobile-first" doesn't mean shrinking the desktop version until it fits on a phone. It means starting from the smallest screen, with the most critical choices first, and building out from there.</p>
<h2>Mobile isn't "also important" — it's the default</h2>
<p>For years, mobile was an add-on. You built the website for desktop and then made sure it "also worked on the phone". In 2026 that order no longer holds. For most local businesses — from hairdressers to handymen and hospitality — the majority of visitors arrive on a phone.</p>
<p>That changes what "good enough" means. A menu that looks elegant on desktop can be awkward on mobile. A form that's tidy on a large screen can feel frustrating on a small one. If the mobile experience is an afterthought, then the experience of your most important visitors is an afterthought.</p>
<h2>Google looks at your mobile site first</h2>
<p>There's also a technical reason you can't ignore. Google has used mobile-first indexing for some time now. Put simply: the mobile version of your website is the version Google evaluates to determine your rankings — not the desktop version.</p>
<p>If your mobile site is slower, hides elements, or shows different content than the desktop version, that can directly affect your local visibility. So you're not just competing on how your site looks on a phone, but also on how well Google understands that mobile version.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80" alt="Person viewing a website on a smartphone" loading="lazy"><figcaption>For most visitors and for Google, the mobile version of your website is the real version. That's where the design starts — not where it ends.</figcaption></figure>
<h2>Designing for thumbs, not for mice</h2>
<p>A phone is operated with your thumb, often one-handed, sometimes on the move. That calls for different choices than a mouse and a large screen. Buttons need to be big enough, important actions within reach, and text readable without zooming.</p>
<ul class="art-checklist"><li>Buttons and links large enough to tap without mis-hits</li><li>The main action — call or contact — visible right at the top</li><li>Text that's readable without pinching or zooming</li><li>Enough space between clickable elements so nothing gets tapped by accident</li></ul>
<p>These details seem small, but they decide whether someone reaches your contact details smoothly or drops off halfway. On a small screen there's little margin for confusion.</p>
<h2>On mobile, speed matters even more</h2>
<p>Mobile visitors are more often on a variable connection and have less patience. A site that loads fine on fibre can feel slow on 4G in the checkout queue. And every extra second of load time costs you visitors before they've seen anything about your business at all.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Loading heavy desktop images unchanged on mobile. The visitor then downloads a huge file on a slow connection, when a smaller size would look exactly the same on their screen.</p></div>
<p>That's why mobile-first thinking and speed go together. Lighter images, fewer unnecessary elements and a clear structure make your site not only faster, but also calmer to use.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Does your website really work well on a phone?</h3><p>We build websites designed mobile-first: fast, clear and made for how your customers actually view you.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>What mobile-first means in practice</h2>
<p>You don't need to be a technical expert for this. It's mostly about a different order and a few deliberate choices. Take a look at your own site on your phone and watch for these points:</p>
<ol class="art-checklist"><li>Can you see at a glance what your business does and where you are?</li><li>Is the main action — call or contact — immediately reachable?</li><li>Does the page load quickly, even without wifi?</li><li>Can you read and tap everything without zooming?</li><li>Does scrolling feel logical, or do you have to hunt for what you need?</li></ol>
<p>If you get stuck on any of these points, your visitors probably do too. And on mobile, the route to the back button is short.</p>
<h2>Conclusion</h2>
<p>Mobile-first design isn't a trend or a luxury in 2026. It's simply designing for the way most people actually find and view your business. For local businesses, the phone has become the first point of contact.</p>
<p>A site that's clear, fast and easy to use on that small screen wins trust and customers every day. A site that isn't loses them just as quietly. So the question isn't whether you should work mobile-first, but how quickly you take that step.</p>`
    },

    'how-often-should-you-update-your-website': {
      current: 'Web Design Tips',
      category: 'Web Design Tips',
      date: '11 June 2026',
      read: '6 min read',
      docTitle: 'How Often Should You Refresh Your Website? | WebKreatives',
      title: 'How Often Should You<br><em>Refresh Your Website?</em>',
      bottomTitle: 'Want a website that stays<br>current without the hassle?',
      bottomText: 'We build and maintain websites for small businesses that stay tidy, up to date and ready to win over new customers.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<div class="art-quote"><p>"A website isn't a flyer you print once. It's more like a shop window: if you never change anything, people assume no one's working there anymore."</p></div>
<p>It's a question almost every business owner asks sooner or later: <strong>how often should you actually refresh your website?</strong> One person says every year, another has had the same site for seven years and thinks it's fine. The honest answer sits somewhere in between, and it mostly depends on what you mean by "refresh".</p>
<p>Because that's where the confusion starts. Keeping a website up to date is a very different thing from having it rebuilt. Mix the two up and you either spend too much on the wrong thing, or you quietly let your site grow old. In this article we'll split it apart for small businesses like hairdressers, tradespeople, dentists and hospitality.</p>
<h2>Maintenance and a redesign are two different things</h2>
<p>When people ask how often they should refresh their website, they're usually asking about two things at once. It helps to pull them apart.</p>
<p><strong>Maintenance</strong> is the small, regular upkeep: copy is correct, prices are current, photos are recent, links work, and the technology behind the scenes stays secure and fast. This should happen continuously, not once a year in one big sprint.</p>
<p><strong>A redesign</strong> is something else: the structure, the design and sometimes the whole setup get reworked. You don't do that every year. For most small businesses a thorough overhaul every three to four years is plenty, as long as the maintenance in between has been kept up.</p>
<div class="art-mini-grid"><div class="art-mini-card"><h3>Ongoing</h3><p>Small updates: copy, prices, opening hours, new photos and reviews. This keeps your site alive without a big investment.</p></div><div class="art-mini-card"><h3>Each quarter</h3><p>A quick check: does everything still work, are your services shown well, and does your offer still match what you actually do now?</p></div><div class="art-mini-card"><h3>Every 3–4 years</h3><p>A real refresh of design and structure, when the site starts to fall behind technically or visually.</p></div></div>
<h2>Signs your website is aging</h2>
<p>You don't have to wait for the calendar. Your site tells you itself when it's time for some attention. Watch for these signs:</p>
<ul class="art-checklist"><li>The site clearly looks different from modern sites in your industry</li><li>On a phone you have to zoom or scroll sideways to read anything</li><li>Pages load slowly or photos are blurry and too heavy</li><li>The information is out of date: old prices, dropped services or a wrong phone number</li><li>You'd honestly hesitate to send the link to a new customer</li></ul>
<p>That last point is perhaps the most honest test of all. If you yourself hesitate to share your own website, visitors know exactly why too.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80" alt="Business owner working on their own website content on a laptop" loading="lazy"><figcaption>A website doesn't need constant major surgery, but it does need regular small attention to stay fresh and trustworthy.</figcaption></figure>
<h2>What to update first</h2>
<p>When you notice your site is due for a refresh, don't jump straight to "rebuild it all". Often a targeted update solves the biggest part of the problem. A handy order:</p>
<ol class="art-steps"><li>Check your facts: opening hours, prices, services, contact details</li><li>Replace dated or stock-like photos with real, recent images</li><li>Update your most important copy so it matches what you offer now</li><li>Test everything on your phone and fix whatever looks messy there</li><li>Add recent reviews or new projects as proof that you're active</li></ol>
<p>In the vast majority of cases this gives your site a tidy, current feel again, without any need for a full redesign.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Not sure whether your site needs an update or a redesign?</h3><p>We're happy to take a quick look. Often a targeted refresh is enough, and sometimes a new foundation is the smarter choice. We'll tell you honestly what fits.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>The two extremes you want to avoid</h2>
<p>Around refreshing a website you often see two kinds of mistakes, and they sit at opposite ends.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Leaving the site completely untouched for years, until everything is outdated and a redesign becomes unavoidable and expensive. Or the opposite: throwing everything out every year out of restlessness, when the old version worked fine and customers had just got used to it.</p></div>
<p>The healthy middle ground is almost always best: keep your site topped up in small ways continuously, and only plan a real overhaul when there's a clear reason for it. That way your website stays current without becoming a recurring expense.</p>
<h2>A simple rhythm that works for small businesses</h2>
<p>You don't have to turn this into a complicated schedule. For most owners this rhythm works fine:</p>
<ul class="art-checklist"><li>Change small things the moment they change, don't put it off</li><li>Run through your most important pages briefly each quarter</li><li>Refresh your photos and copy whenever your business visibly changes</li><li>Consider a redesign after three to four years, or sooner on clear signals</li><li>When in doubt, choose targeted updates over throwing it all out</li></ul>
<h2>Conclusion</h2>
<p>How often you should refresh your website depends on what you mean. Maintenance is ongoing and small, a redesign is occasional and bigger. Take the small upkeep seriously and you'll need an expensive overhaul far less often.</p>
<p>Take a critical look at your own site. Do you still share it with pride, or do you secretly hesitate? That answer usually tells you exactly whether it's time for a refresh, or simply for some regular attention.</p>`
    },

    'stock-photos-vs-real-photos-on-your-website': {
      current: 'Brand & Trust',
      category: 'Brand & Trust',
      date: '5 June 2026',
      read: '6 min read',
      docTitle: 'Stock Photos vs Real Photos: What Builds More Trust | WebKreatives',
      title: 'Stock Photos vs Real Photos:<br><em>What Builds More Trust</em>',
      bottomTitle: 'Want a website that feels<br>real and trustworthy?',
      bottomText: 'We build websites for small businesses with imagery and branding that earn trust, look professional and bring in more genuine enquiries.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>Picture two hairdressers on the same street. Both have a tidy website, similar prices and roughly the same services. On one site, flawless models smile at you with a haircut clearly shot in a studio on the other side of the world. On the other, you see the actual salon: the chairs, the team and a few customers who are visibly happy with the result. Which one feels more trustworthy?</p>
<p>For most visitors the answer is immediate. Yet many small businesses reach for stock photos by default, because it's fast, cheap and easy. Sometimes that's perfectly fine. But in the wrong place, stock photos can undermine the very trust your website is supposed to build.</p>
<h2>Why photos do more than fill space</h2>
<p>Visitors rarely read a website word for word. They scan. And images are the first thing they process, often before they've read a single sentence. In a fraction of a second, a photo tells them whether a business feels real, professional and human.</p>
<p>That makes photos one of your strongest trust signals. They help decide whether someone thinks "this looks serious" or "this feels like a template". And especially for local businesses, where people want to know who they'll be dealing with, that weighs heavily.</p>
<div class="art-mini-grid"><div class="art-mini-card"><h3>What stock does well</h3><p>Fast, tidy and cheap. Ideal for illustrating abstract topics or giving a page atmosphere when you don't have your own material yet.</p></div><div class="art-mini-card"><h3>Where stock trips you up</h3><p>The moment it's meant to represent your business, team or work. Visitors sense the difference and start doubting the rest of the site.</p></div><div class="art-mini-card"><h3>What real photos add</h3><p>Recognition and trust. A face, your premises and real work show there are actual people of flesh and blood behind the business.</p></div></div>
<h2>When stock photos work just fine</h2>
<p>Stock photos aren't the problem. It's about where and how you use them. There are plenty of situations where a good stock photo is genuinely handy:</p>
<ul class="art-checklist"><li>As a mood image or background for an abstract topic</li><li>For icons, patterns or neutral textures</li><li>When you're just starting out and have no imagery of your own yet</li><li>On blog articles about general, non-business-specific themes</li></ul>
<p>The key is that the photo stays supporting. It must not pretend to show your business, your team or your work when it doesn't. As long as that line stays clear, there's nothing wrong with a clean stock image.</p>
<h2>When stock undermines your credibility</h2>
<div class="art-mistake"><strong>Common mistake</strong><p>A smiling "team" on the about page that obviously came from a stock library. Visitors spot this more often than you'd think, and at that moment they start doubting everything else on the site.</p></div>
<p>The damage is worst in the places where people expect authenticity: your team, your premises, your products, your finished work and real customer situations. There, a generic model doesn't feel like a detail — it feels like a small lie. And one visibly fake image can make the rest of your hard work look suspect.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80" alt="Business owner taking their own photos of the work with a phone" loading="lazy"><figcaption>You don't need an expensive studio. One good session with natural light often gives you more than dozens of polished stock images.</figcaption></figure>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Not sure which photos make your website stronger?</h3><p>We help small businesses with websites that come across as real and trustworthy, with an image choice that fits who you are and what you do.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>Real photos don't have to be expensive</h2>
<p>Many owners assume authentic imagery requires an expensive photographer and a full production. That certainly helps, but it isn't required. With a modern phone and a bit of attention, you'll get surprisingly far:</p>
<ul class="art-checklist"><li>Shoot in daylight, ideally close to a window</li><li>Keep the background calm and tidy</li><li>Take lots of photos and pick the best ones afterwards</li><li>Show real people and real work, not stiff poses</li><li>Keep one style in colour and mood for consistency</li></ul>
<p>One quiet hour of shooting usually gives you enough for your homepage, your about page and a few services. And the best part: it's yours. Recognisable, honest and impossible for the competitor down the street to copy.</p>
<h2>The practical middle ground</h2>
<p>You don't have to choose between shooting everything yourself or pulling everything from a stock library. The strongest websites combine both in a smart way:</p>
<ol class="art-checklist"><li>Use real photos in the places that determine trust: team, work and premises</li><li>Top up with clean stock for atmosphere and abstract topics</li><li>Make sure the styles match, so it stays one coherent whole</li><li>Replace generic images as soon as your own material becomes available</li></ol>
<p>That way you keep the ease and speed of stock without giving up the authenticity that ultimately gets customers over the line.</p>
<h2>Conclusion</h2>
<p>Stock photos are a handy tool, not a sin. But they're an addition, not a replacement for who you really are. In the places where visitors expect authenticity, an honest photo of your own almost always beats the prettiest model.</p>
<p>Take a critical look at your own website. Are you showing who you are, or hiding behind images that could belong to anyone? Often, adding a handful of real photos is one of the fastest ways to win more trust online.</p>`
    },

    'what-makes-a-contact-page-actually-work': {
      current: 'Conversion',
      category: 'Conversion',
      date: '29 May 2026',
      read: '6 min read',
      docTitle: 'What Makes a Contact Page Actually Work | WebKreatives',
      title: 'What Makes a Contact Page<br><em>Actually Work</em>',
      bottomTitle: 'Want a website where customers<br>reach out on their own?',
      bottomText: 'We build clear, fast websites for local businesses with contact pages that remove friction and turn visitors into real enquiries.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>Someone has looked around your website, seen your work and thinks: this feels right. They click through to your contact page. That is exactly the moment where interest turns into a real enquiry — or quietly evaporates. And yet, for many small businesses, the contact page is the most neglected part of the whole site.</p>
<p>Often it's nothing more than a bare form with ten fields, a generic email address and little else. While this is precisely the place where most doubt is either removed or unintentionally fed. A contact page that works makes it irresistibly easy to take that final step.</p>
<h2>The contact page isn't a closing detail, it's a decision moment</h2>
<p>We often treat the contact page as an obligatory box to tick, the last thing before the site goes live. For the visitor it's the opposite: it's the most nerve-racking moment. They're about to expose themselves, leave their details behind, and hope there's a decent person on the other side.</p>
<div class="art-quote"><p>"The contact page isn't the end of your website. For the customer, it's the start of working together."</p></div>
<p>Every second of doubt counts double here. Vagueness, an overly long form or the feeling of shouting into a void — these are small things that make someone drop off at the very last moment. That's exactly why this page deserves more attention than it usually gets.</p>
<h2>Start with fewer fields, not more</h2>
<p>The biggest brake on contact pages is friction: everything that costs the visitor extra effort or thought. And the biggest source of friction is the form. Every field you add is a reason to give up. Ask only for what you truly need to start a first conversation.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>A form with fields for company name, job title, budget, preferred start date and "how did you find us?" — when really all you need is a name, a way to call back and a short question. The rest comes up naturally in the conversation.</p></div>
<p>For most small businesses, three or four fields are more than enough: name, email or phone, and a message field. The shorter the form looks, the lower the threshold to fill it in. Not sure whether a field belongs? Then it probably doesn't.</p>
<h2>Give people a choice in how they get in touch</h2>
<p>Not everyone wants to fill in a form. One person would rather make a quick call, another prefers to send a message, and someone else likes to email at their leisure in the evening. By visibly offering several channels, you let the customer choose what feels most natural to them.</p>
<div class="art-mini-grid"><div class="art-mini-card"><h3>Phone</h3><p>For those who want clarity fast. Make the number clickable so it starts a call straight away on mobile. Mention when you're reachable.</p></div><div class="art-mini-card"><h3>WhatsApp</h3><p>Low-threshold and familiar. Many people prefer messaging to calling. One tap and they can ask a quick question without any hassle.</p></div><div class="art-mini-card"><h3>Form or email</h3><p>For those who prefer to type a longer message at their own pace. Ideal outside office hours, when calling isn't an option.</p></div></div>
<p>You don't have to offer every channel — pick what suits you and what you actually keep up with. A WhatsApp button nobody reads is worse than no button at all. But one extra low-threshold option alongside the form often noticeably lowers the barrier.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Want your contact page to bring in more enquiries?</h3><p>We build websites for small businesses where getting in touch feels effortless — with clear forms, clickable channels and flows that actually get customers moving.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>Be honest about what happens next</h2>
<p>One of the biggest invisible barriers is uncertainty. When will I get a reply? From whom? Will I be called or emailed? If you don't answer those questions, the visitor fills them in themselves — usually more negatively than reality. A few reassuring lines take that doubt away.</p>
<ul class="art-checklist"><li>State how quickly you respond, for example "usually within one working day"</li><li>Say who will get in touch, ideally with a name and a face</li><li>Make clear whether the conversation is free and without obligation</li><li>Show a short confirmation after the form is sent, not an empty page</li></ul>
<p>These small additions cost nothing, but they completely change the feeling. Instead of sending an enquiry off into the void, the customer knows exactly what to expect. That trust is often the final nudge that's needed.</p>
<h2>How to build a contact page that works</h2>
<p>You don't have to make a science of it. Work through these steps and you'll already have a page that outperforms most of your competitors':</p>
<ol class="art-steps"><li><strong>Trim your form</strong> — cut every field that isn't strictly needed for a first contact. Name, a way to reach them and a question usually suffice.</li><li><strong>Offer a second channel</strong> — place a clickable phone number or WhatsApp button next to the form, so people can choose.</li><li><strong>Set expectations</strong> — mention your response time and that a first conversation is without obligation.</li><li><strong>Add a trust signal</strong> — a photo, a review or your location makes the page human and real.</li><li><strong>Confirm the submission</strong> — show a clear thank-you message and, if possible, an automatic confirmation email.</li></ol>
<p>Then test your own page the way a customer would: on your phone, reading from the top. Does the call button work? Does the form send smoothly? Do you get a decent confirmation? What's obvious to you isn't always obvious to a new visitor.</p>
<h2>Small trust signals make a big difference</h2>
<p>A contact page quickly feels clinical: a form and nothing more. This is exactly where a little humanity helps. A photo of yourself or the team, a short review, your logo, your location or a business registration — these are small signals that say: there's a real business with real people behind this.</p>
<p>For a local business, that works especially well. Someone looking for a hairdresser, contractor or dentist nearby wants to feel they're talking to someone from their own area. Those little confirmations make the difference between "I'll think about it" and "I'll just send a message now".</p>
<h2>Conclusion</h2>
<p>The contact page isn't a side issue, but the place where all your earlier work is rewarded or lost. Someone who has made it this far is warm — all you have to do now is make that last step as easy and reassuring as possible.</p>
<p>Fewer fields, more choice of channels, honest expectations and a few human details: that's all a contact page needs to work. For most small businesses, this is one of the fastest ways to get more out of the same visitors.</p>
`
    },

    'how-website-speed-costs-you-customers': {
      current: 'Performance',
      category: 'Performance',
      date: '21 May 2026',
      read: '6 min read',
      docTitle: 'How Your Website Speed Quietly Costs You Customers | WebKreatives',
      title: 'How Your Website Speed<br><em>Quietly Costs You Customers</em>',
      bottomTitle: 'Want a website that loads fast<br>and actually brings in customers?',
      bottomText: 'We build light, fast websites for local businesses and speed up existing sites that have grown sluggish. Professional, clear, and focused on real enquiries.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>Your website looks good, your offer is solid and your work is genuinely fine. And yet you lose customers you never saw arrive. The reason is often invisible: <strong>your site loads too slowly</strong>. Not dramatically slow, but just slow enough that some of your visitors have already left before your page is fully on screen.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">3 sec</span><span class="art-stat-label">is the limit for many visitors; load slower than that and a good share drop off</span></div><div class="art-stat"><span class="art-stat-num">+1 sec</span><span class="art-stat-label">of extra load time can measurably lower your conversion, especially on mobile</span></div><div class="art-stat"><span class="art-stat-num">0 signal</span><span class="art-stat-label">is what you get from visitors who click away; they leave without a trace</span></div></div>
<p>Speed feels like a technical detail that "the developer will handle". In practice it is one of the most direct levers on your revenue that you have. In this article we explain in plain language what speed really means, where the delay comes from, and which wins you can make fairly quickly.</p>
<h2><span class="num">1</span> Why speed hits your revenue directly</h2>
<p>A visitor who lands on your website usually has an intention: to request a price, book an appointment, check your opening hours. Every second of waiting is a second in which doubt grows. And unlike in a shop, you never see that hesitant visitor. They click back to Google and pick the next one in the list.</p>
<div class="art-quote"><p>"A slow website doesn't lose customers with a bang, but with silence. Nobody emails you to say they clicked away."</p></div>
<p>That is what makes speed so treacherous. You don't notice anything going wrong, because you only see the people who do stay. The missed enquiries vanish quietly. For a hairdresser, contractor or dental practice, that can easily add up to dozens of lost appointments over a year.</p>
<h2><span class="num">2</span> What "fast" really means: Core Web Vitals in plain language</h2>
<p>Google measures the experienced speed of your site with three values, the so-called Core Web Vitals. They sound technical, but you can understand them in plain language.</p>
<div class="art-mini-grid"><div class="art-mini-card"><h3>LCP — how quickly the main thing appears</h3><p>The time until your largest block of content, usually your hero image or title, is on screen. This decides whether a visitor thinks: "the page is here".</p></div><div class="art-mini-card"><h3>INP — how quickly the site responds</h3><p>Does a button or menu react instantly when someone taps, or does it hang for a moment? Slowness here feels like a site that is "sticky".</p></div><div class="art-mini-card"><h3>CLS — how stable the page stays</h3><p>Does the layout still jump around while you read, so you accidentally hit the wrong button? That is exactly what CLS measures.</p></div></div>
<p>You don't need to memorise these abbreviations. The point is: speed is not just about a number, but about how smooth the page feels from the first second. On top of that, Google uses those same values in how it ranks your site.</p>
<h2><span class="num">3</span> Where the delay usually comes from</h2>
<p>Most slow websites for small businesses share the same handful of causes. Rarely is it one big problem; more often it is a pile-up of small things.</p>
<ul class="art-checklist"><li>Heavy, unoptimised photos uploaded straight from the camera</li><li>An overloaded theme or page builder with dozens of features you never use</li><li>Too many separate plugins and external scripts, each adding its own load time</li><li>Cheap, overcrowded hosting where your site shares a server with hundreds of others</li></ul>
<div class="art-mistake"><strong>Common mistake</strong><p>Putting a beautiful 6 MB photo as a background on the homepage. On your fast wifi you don't notice it, but a customer on mobile data in the waiting room waits seconds for an image that could just as easily have been 300 KB.</p></div>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80" alt="Customer viewing a website on a smartphone" loading="lazy"><figcaption>Most visitors come via their phone and a mobile network. There, every saved kilobyte counts double.</figcaption></figure>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Curious where your site loses time?</h3><p>We build fast, light websites for local businesses and clean up existing sites that have become slow. No unnecessary ballast, just a sharp result.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2><span class="num">4</span> Quick wins you can often make today</h2>
<p>You don't need to be a developer to spot the biggest accelerators. Often eighty percent of the win sits in a few changes.</p>
<ol class="art-steps"><li><strong>Compress your images</strong> — resize and optimise photos before you upload them. This usually delivers the biggest jump.</li><li><strong>Clean up plugins and scripts</strong> — remove everything you don't actively use. Every tool fewer is load time gained.</li><li><strong>Choose decent hosting</strong> — a slightly more expensive hosting package that isn't overcrowded often pays for itself in speed.</li><li><strong>Load heavy elements later</strong> — videos, maps and widgets don't need to load before the page is visible.</li></ol>
<p>Want to know what's worth it? Start with the pages that get visited most. A faster homepage and contact page weigh more than a page almost nobody opens.</p>
<h2><span class="num">5</span> Mobile is where most speed is lost</h2>
<p>The vast majority of your visitors come via their phone, often on a less stable network than your office wifi. A site that feels smooth on your laptop can be noticeably slower on an average smartphone.</p>
<p>So always test your site the way your customers actually use it: on a phone, away from your own wifi. What looks fast on a big screen is only truly tested when you're standing outside waiting for your contact page to load.</p>
<h2><span class="num">6</span> How to know if your site is too slow</h2>
<p>You don't have to guess. There are free tools like Google PageSpeed Insights where you enter your address and within seconds see how you score, including those Core Web Vitals. More important than the exact score is the pattern: if you see red or orange values on mobile, you are almost certainly leaving customers behind.</p>
<p>Use a test like that as a starting point, not a final verdict. One slow page is not a disaster, but consistently slow load times on your most important pages are a signal to take action.</p>
<h2>Conclusion</h2>
<p>Speed is not a technical detail separate from your results. It is one of the quietest, but most direct factors that decide whether a visitor becomes a customer or clicks through to the competitor.</p>
<p>If your business does good work but your website loads slowly, you are unintentionally giving some of your visitors a reason to leave. The good news: speed is one of the most solvable problems on a website. A few targeted changes often deliver surprisingly much, every single day.</p>
`
    },

    'why-your-business-needs-a-domain-email': {
      current: 'Brand & Trust',
      category: 'Brand & Trust',
      date: '15 May 2026',
      read: '7 min read',
      docTitle: 'Why a Domain Email Makes Your Business Look More Serious | WebKreatives',
      title: 'Why a Domain Email Makes<br><em>Your Business Look More Serious</em>',
      bottomTitle: 'Want to look more professional<br>with every customer you email?',
      bottomText: 'We build websites for local businesses and set up an email address on your own domain that fits your brand and reliably lands in the inbox.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>You have a solid quote ready, a tidy website and an honest story. And still, you send all of it from <strong>yourbusiness2019@gmail.com</strong>. It looks like a detail, but it is one of the first things a new customer sees. Before they have judged your work at all, they already have a feeling about how serious you are.</p>
<p>An email address on your own domain, like <strong>info@yourbusiness.nl</strong>, is one of the cheapest ways to look more professional. Yet many hairdressers, contractors, coaches and hospitality businesses stick with a free address for years. In this article we explain why that quietly costs you money, and how easy it is to switch.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Thinking a free Gmail or Hotmail address is "fine for now". For you, it does work fine. For the customer choosing between you and a competitor, it is exactly the nudge toward the other one.</p></div>
<h2>Your email address is a business card you leave everywhere</h2>
<p>You hand out your email address more often than you think. In your quotes, on your invoice, in your signature, on Google, on flyers and in every message you send. Each time, that address says something about your business, whether you want it to or not.</p>
<p>An address on your own domain says: here is a real business, with its own website and a fixed place online. A free address with numbers or a nickname in it says something else unintentionally: hobby, temporary, or just starting out. Even if you have been doing quality work for ten years.</p>
<h2>What a free address quietly signals</h2>
<p>People judge in a few seconds. They do not read your address literally as "untrustworthy", but a feeling forms all the same. And that feeling works against you with exactly the kind of customer you want: someone willing to pay for quality.</p>
<ul class="art-checklist"><li>A domain of your own shows you have invested in your business</li><li>It links your email directly to your website and brand name</li><li>It looks consistent on your quote, invoice and business card</li><li>It is easier to remember than a string of numbers</li></ul>
<p>It is not about looking fancy. It is about removing doubt at the moment a customer decides whether to trust you with their money or their home.</p>
<h2>Trust: why people drop off faster with @gmail.com</h2>
<p>Imagine you receive two quotes for a renovation. Both are roughly equal. One comes from <strong>info@vandenbergbouw.nl</strong>, the other from <strong>vandenberg.klus.85@gmail.com</strong>. Which feels more reliable? Most people pick the first without even thinking about it.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1200&q=80" alt="Business correspondence and an invoice on a desk" loading="lazy"><figcaption>Your address sits on every quote and invoice that goes out. A domain of your own makes that contact moment instantly more professional.</figcaption></figure>
<p>This matters even more for businesses where trust is everything: someone coming to work in your home, dealing with your health, or asking for a sizeable sum up front. There, every signal that says "this is an established, serious business" counts.</p>
<h2>Deliverability: why your emails actually arrive more often</h2>
<p>There is also a practical side that has nothing to do with image. Sending from your own domain, set up correctly, lowers the chance your messages land in the spam folder. Especially when you send quotes or invoices, you do not want them to disappear unnoticed.</p>
<p>With your own domain you can arrange the right settings that prove to mail servers you really are the sender. That makes your messages more trustworthy in the eyes of Gmail, Outlook and other providers, and therefore filtered out less often.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Want an email address that matches your brand?</h3><p>For local businesses we arrange both a website and a professional email address on your own domain, set up so your messages arrive properly.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>Consistency with your brand and your website</h2>
<p>A domain of your own makes everything line up. Your website is yourbusiness.nl, your email is info@yourbusiness.nl, and your invoice points to the same address. That unity makes you recognisable and trustworthy. Customers do not have to puzzle over whether they are dealing with the right business.</p>
<p>On top of that, you can create several addresses at no extra cost: info@, quote@, or yourname@yourbusiness.nl. Handy when you hire someone later or want to separate different kinds of messages.</p>
<h2>"But it works fine, doesn't it?" — the hidden cost</h2>
<p>The biggest objection we hear is that the current address "just works". Technically, that is true. But working and convincing are two different things.</p>
<div class="art-mistake"><strong>What you do not see</strong><p>The customer who saw your free address, hesitated for a moment and then called the competitor never tells you. You do not notice the missed enquiry. That is why it feels like nothing is going wrong, while revenue quietly leaks away.</p></div>
<p>For a few euros a month you remove that doubt. Few investments in how you come across pay for themselves as easily as this one.</p>
<h2>How to switch without the hassle</h2>
<p>Switching sounds more technical than it is. In practice it comes down to a few steps:</p>
<ol class="art-steps"><li><strong>Choose your domain</strong> — usually just the name of your business, the same as your website.</li><li><strong>Set up a mailbox</strong> — via your hosting package or a service like Google Workspace or Microsoft 365.</li><li><strong>Configure it properly</strong> — the right records so your mail arrives reliably.</li><li><strong>Update your address everywhere</strong> — website, quotes, invoices, Google profile and signature.</li></ol>
<p>You can arrange this yourself, or have it done so you know for sure the settings are correct and your old messages come along.</p>
<h2>Conclusion</h2>
<p>An email address on your own domain is not a luxury and not a technical hobby. It is one of the cheapest ways to look more serious, more consistent and more trustworthy, while your messages also arrive better.</p>
<p>If you do good work but send it from a free address, you are unintentionally giving off the wrong signal. A small address with your own name in it can add exactly the bit of trust that tips a hesitating customer over the line.</p>
`
    },

    'anatomy-of-a-homepage-that-converts': {
      current: 'Conversion',
      category: 'Conversion',
      date: '7 May 2026',
      read: '7 min read',
      docTitle: 'The Anatomy of a Homepage That Converts | WebKreatives',
      title: 'The Anatomy of a Homepage<br><em>That Converts</em>',
      bottomTitle: 'Want a homepage that is not just<br>good-looking, but brings in customers?',
      bottomText: 'We build websites for local businesses that communicate clearly, load fast, and guide visitors toward real enquiries.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>Most small-business homepages look fine. Tidy colours, a logo, some text about the services. And still, very little happens. Visitors arrive, glance around for a few seconds, and leave again. No enquiry, no phone call, no contact.</p>
<p>That is rarely caused by one big problem. It happens because the <strong>parts of the homepage do not work together</strong>. A homepage that converts is not a pretty picture, but a series of deliberate choices that lead the visitor, step by step, toward a single action. In this article we take that homepage apart and look at what each part is actually for.</p>
<div class="art-quote"><p>"A good homepage does not ask 'what do you think of us?' — it asks 'what is your next step?'"</p></div>
<h2><span class="num">1</span> The hero: one promise within five seconds</h2>
<p>The top section of your homepage, the hero, decides almost everything. Within seconds a visitor decides whether they are in the right place. If it is unclear there what you do and who it is for, the rest of the page barely matters anymore.</p>
<p>A strong hero answers three questions almost immediately: what do you offer, who is it for, and what should the visitor do? Not a vague slogan, but a concrete promise.</p>
<div class="art-mini-grid"><div class="art-mini-card"><span class="eyebrow">What</span><h3>A clear promise</h3><p>One line that says what you do and what result the customer gets — not just your company name.</p></div><div class="art-mini-card"><span class="eyebrow">Who for</span><h3>Recognition</h3><p>The visitor should see themselves: "this is for a business like mine".</p></div><div class="art-mini-card"><span class="eyebrow">Now</span><h3>One button</h3><p>A visible, concrete call-to-action right in view, without having to scroll first.</p></div></div>
<h2><span class="num">2</span> Proof: why should anyone believe you?</h2>
<p>The moment you make a promise, a quiet question forms in the visitor's mind: is this true? That is what proof is for. Without it, your homepage stays a brochure talking about itself.</p>
<p>Proof does not have to be grand. For most local businesses, a few credible signals already work strongly:</p>
<ul class="art-checklist"><li>Real reviews or an average rating, ideally recent</li><li>Logos, cases, or photos of completed work</li><li>A short, human story about who is behind the business</li><li>Concrete numbers: years of experience, projects done, response time</li></ul>
<p>The point is not to show as much as possible, but to show exactly the things that remove doubt at the moment that doubt appears.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80" alt="Team reviewing a website design on a screen" loading="lazy"><figcaption>Proof works best when it sits right where the visitor has just read a promise.</figcaption></figure>
<h2><span class="num">3</span> Structure: the visitor should never have to think</h2>
<p>A homepage that converts has a logical order. Each section answers the question that is live in the visitor's mind at that moment. Open with prices while people still do not know whether you understand their problem, and you lose them.</p>
<ol class="art-steps"><li><strong>Recognition</strong> — show that you understand the visitor's problem before you present yourself.</li><li><strong>Solution</strong> — explain clearly what you offer and why it works.</li><li><strong>Proof</strong> — back it up with reviews, cases, or results.</li><li><strong>Action</strong> — make the next step impossible to miss.</li></ol>
<p>This order feels obvious, and that is exactly why it works. The visitor is not pushed, but carried along.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Trying to put everything on the homepage. Every service, every detail, every page in the menu. The result is a page with no focus, where the most important message drowns.</p></div>
<h2><span class="num">4</span> The call-to-action: one clear next step</h2>
<p>Many homepages end in nothing. The visitor is convinced, but does not know what to do next. No button, no form, no visible phone number. That is exactly the moment a potential customer drops off.</p>
<p>A good call-to-action is visible, concrete, and repeated at logical points on the page. Not five different options, but one primary action you carry through consistently.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Not sure your homepage brings in enough?</h3><p>We are happy to look at it and show you exactly which parts could be stronger.</p></div><a href="/#contact" class="btn btn-primary">Request a free check →</a></div>
<h2><span class="num">5</span> Speed and mobile: the invisible foundation</h2>
<p>You can have the perfect structure and copy, but if your homepage loads slowly or does not work well on a phone, none of the rest counts. Most visitors to a local business arrive on a smartphone.</p>
<p>Speed and mobile display are not extras, but the foundation everything else rests on. A homepage that stumbles on mobile loses customers before they have read a single word.</p>
<h2>Conclusion</h2>
<p>A homepage that convinces customers is not a matter of prettier pictures. It is a matter of parts working together: a clear promise, credible proof, a logical structure, and one clear next step, carried by a fast and mobile foundation.</p>
<p>If your homepage looks good but brings in little, the answer is almost always in one of these parts. The good news: you rarely have to tear it all down to feel the difference.</p>`
    },

    '5-reasons-customers-leave-your-website': {
      current: 'Website Mistakes',
      category: 'Web Design Tips',
      date: '19 April 2026',
      read: '7 min read',
      docTitle: '5 Reasons Customers Leave Your Website | WebKreatives',
      title: '5 Reasons Customers Leave<br><em>Your Website</em>',
      bottomTitle: 'We can fix it.',
      bottomText: 'A website that actually works for your business: fast, mobile-friendly, and built to bring in customers. From €199, live within 5 days.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>You already have a website. Maybe it was built for you, maybe you put it together yourself. It is online. And still, customers are not really coming in through it. No form submissions, no phone calls starting with “I saw your website”, no steady flow of new leads from Google.</p>
<p>The problem usually is not that you <em>do not have</em> a website. It is that the website is doing things that actively push visitors away. Small mistakes with big consequences. In this article, we break down five of the most common ones and what to do about them.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">53%</span><span class="art-stat-label">of mobile visitors leave if a site takes longer than 3 seconds to load</span></div><div class="art-stat"><span class="art-stat-num">75%</span><span class="art-stat-label">of people judge credibility based on website design</span></div><div class="art-stat"><span class="art-stat-num">70%</span><span class="art-stat-label">of small business websites miss a clear call-to-action</span></div></div>
<p>These are not small numbers. This is daily revenue quietly leaking away while your digital front door is wide open in the wrong direction.</p>
<h2><span class="num">1</span> Your website loads too slowly</h2>
<p>This is one of the biggest silent conversion killers. Visitors do not wait. They go back to Google and click on your competitor instead. More than half of mobile users leave when a site takes over 3 seconds to load.</p>
<p>The worst part? You often do not notice it yourself. Your own browser has cached the site. It feels fine to you. But for a new visitor on a normal mobile connection, it is a different story.</p>
<div class="art-quote"><p>"A site that takes three seconds to load loses more than half its visitors before they even read a sentence."</p></div>
<p><strong>The most common causes:</strong></p>
<ul><li>Images that are far too large</li><li>Cheap or slow hosting</li><li>Too many plugins and scripts loading at once</li><li>No CDN or proper caching setup</li></ul>
<p>Run your site through Google PageSpeed Insights. If your mobile score is weak, you are likely losing customers every day.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80" alt="Person browsing on smartphone" loading="lazy"><figcaption>Today, most visits for small businesses start on a phone.</figcaption></figure>
<h2><span class="num">2</span> Your site does not work well on mobile</h2>
<p>A huge share of web traffic in the Netherlands comes from smartphones. Yet many small-business sites are still built like desktop pages squeezed onto a phone. Tiny buttons, broken spacing, text that gets cut off, menus that are frustrating to use.</p>
<p>Google sees that too. Mobile usability affects rankings, so a poor mobile experience hurts both your visibility and your conversions.</p>
<div class="art-mistake"><strong>Recognise this?</strong><p>If you need to zoom in on your own site to read it on your phone, or you keep tapping the wrong button, then your visitors are struggling too.</p></div>
<p>A good mobile site is not just a smaller desktop site. It is a version designed around how people actually browse on a phone: fast, thumb-friendly, and focused on one clear next step.</p>
<h2><span class="num">3</span> There is no clear next step</h2>
<p>A visitor reads your services, likes what they see, and then... nothing. No obvious button. No form that invites action. No visible number to call. So they leave.</p>
<p>Many small-business websites still do not have a strong call-to-action on the homepage. That means visitors are left guessing what to do next.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" alt="Clean website interface on laptop" loading="lazy"><figcaption>A clean design with one obvious next action converts far better than a page full of competing choices.</figcaption></figure>
<p>A good CTA is not vague. It is visible, concrete, and easy to act on:</p>
<ul><li><strong>Book a free intro call →</strong></li><li><strong>Call us now</strong></li><li><strong>Request a quote</strong> with a short, simple form</li></ul>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Not sure if your website converts well?</h3><p>We can review it and show you exactly what to improve.</p></div><a href="/#contact" class="btn btn-primary">Get free advice →</a></div>
<h2><span class="num">4</span> The design looks outdated</h2>
<p>People trust what they see. Website design shapes how professional and credible your business feels within seconds. If the site looks old, cluttered, or unfinished, visitors assume the business behind it may be the same.</p>
<div class="art-quote"><p>"You only get one first impression online, and people make it fast."</p></div>
<h2><span class="num">5</span> Your site talks too much about you, not the customer</h2>
<p>Visitors are not there to admire your company history first. They want to know one thing quickly: can you help them? If your homepage is all about you and not about the visitor’s problem, they disconnect.</p>
<p>The best small-business websites make the value obvious right away. What do you do? Who is it for? What should the visitor do next?</p>
<h2>Conclusion</h2>
<p>You do not need a more complicated website. You need a clearer, faster, more focused one. Fixing a handful of weak points can dramatically improve how many visitors turn into actual customers.</p>
<p>If your website is online but not performing, that is fixable. And it usually does not take a full rebuild to start seeing better results.</p>`
    },
    'why-your-hair-salon-needs-a-website': {
      current: 'Salon Website',
      category: 'Small Business',
      date: '19 April 2026',
      read: '6 min read',
      docTitle: 'Why Your Hair Salon Needs a Website | WebKreatives',
      title: 'Why Your Hair Salon<br><em>Needs a Website</em>',
      bottomTitle: 'Your salon deserves<br>a professional website',
      bottomText: 'Starter package from €199, mobile-friendly, quick to launch, and tailored to your salon.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>You have built a good reputation locally. Customers come back. Word of mouth works. But when someone searches for your salon online, do they find you — or a competitor with a better online presence?</p>
<p>For many salon businesses, a proper website is still missing. That means missed visibility, missed trust, and missed bookings. Social media alone is not enough.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">81%</span><span class="art-stat-label">of customers search online before choosing a salon</span></div><div class="art-stat"><span class="art-stat-num">60%</span><span class="art-stat-label">of small salons still do not have their own website</span></div><div class="art-stat"><span class="art-stat-num">3×</span><span class="art-stat-label">more trust with a professional website</span></div></div>
<h2>1. Google finds websites, not just social profiles</h2>
<p>When people search for a salon in their city, Google rewards businesses with real websites. Instagram and directory listings can help, but your own domain is where real authority and visibility are built.</p>
<div class="art-quote"><p>"You can be the best salon in town. If you are not visible online, new customers will not know you exist."</p></div>
<h2>2. Online bookings reduce friction</h2>
<p>A website makes it easier for clients to book, check your opening hours, and contact you without calling during working hours. Fewer missed opportunities, less back-and-forth, and a smoother customer experience.</p>
<h2>3. Your work deserves a proper portfolio</h2>
<p>Photos are one of the strongest trust signals for a salon. A clean gallery on your own site feels more professional and helps new visitors quickly understand your style and quality.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Ready for your own salon website?</h3><p>Starter package: professional, quick to launch, €199 one-time.</p></div><a href="https://webkreatives.com/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>4. Trust starts online</h2>
<p>When someone hears about your salon, their first instinct is usually to Google it. If they find no website, no clear info, and no polished presentation, many simply move on.</p>
<p>A professional website with photos, reviews, services, prices, and location details gives them confidence before they ever walk in.</p>
<h2>5. Your website works while you are with clients</h2>
<p>While you are busy cutting, colouring, and styling, your website can still answer questions, show pricing, explain services, and collect new enquiries.</p>
<h2>What should a salon website include?</h2>
<ul class="art-checklist"><li>A strong first impression</li><li>Your services and pricing</li><li>Photos of your work and salon</li><li>A booking button or contact form</li><li>Address, opening hours, and phone number</li><li>Google Maps integration</li><li>Client reviews</li></ul>
<h2>What does a salon website cost?</h2>
<p>Many salon owners assume a website must be expensive and complicated. It does not have to be. At WebKreatives, a professional salon website starts at €199 and can be live quickly.</p>
<div class="art-quote"><p>"A website that brings in even one extra client can pay for itself surprisingly fast."</p></div>
<h2>Conclusion</h2>
<p>Every day without a website is another day potential clients choose someone else. A professional online presence is no longer optional if you want to grow.</p>
<p>You take care of your clients in the salon. We can take care of how your salon shows up online.</p>`
    },
    'local-seo-how-google-finds-you-in-your-city': {
      current: 'Local SEO',
      category: 'Local SEO',
      date: '20 April 2026',
      read: '7 min read',
      docTitle: 'Local SEO: How Google Finds You in Your City | WebKreatives',
      title: 'Local SEO: How Google<br><em>Finds You in Your City</em>',
      bottomTitle: 'Want better local visibility<br>without a messy website?',
      bottomText: 'We build websites that communicate clearly, support local rankings, and make your business look professional in Google.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>Many small businesses assume SEO is something only large companies need. But for a local salon, accountant, plumber, restaurant, or studio, <strong>local SEO</strong> is often what decides whether you get found at all.</p>
<p>When someone searches for terms like <em>dentist Haarlem</em>, <em>plumber Deventer</em>, or <em>web design agency near me</em>, Google does not show random results. It tries to surface the most relevant nearby businesses. And there are clear signals that influence that.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">46%</span><span class="art-stat-label">of Google searches have local intent</span></div><div class="art-stat"><span class="art-stat-num">76%</span><span class="art-stat-label">of people who search for something local visit a business within a day</span></div><div class="art-stat"><span class="art-stat-num">3</span><span class="art-stat-label">top local map results get most of the trust and clicks</span></div></div>
<p>So local SEO is not just about rankings. It is about showing up when someone in your area is already close to making a decision.</p>
<div class="art-quote"><p>"Local SEO is not about more traffic in general. It is about being found by the right people, in the right city, at the right moment."</p></div>
<h2><span class="num">1</span> Your Google Business Profile is the foundation</h2>
<p>If you want better local visibility, do not start with ten complicated SEO tools. Start with your <strong>Google Business Profile</strong>. That is the listing that appears in Maps and the local results with your reviews, opening hours, photos, website, and directions.</p>
<p>A half-complete profile works against you. A complete profile gives Google more confidence that your business is real, active, and relevant in your area.</p>
<h2><span class="num">2</span> Reviews help visibility as well as trust</h2>
<p>Most business owners think about reviews only as social proof. But reviews also matter for local visibility. A steady flow of detailed, recent, believable reviews helps your profile look stronger.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80" alt="Business owner reviewing analytics and customer feedback" loading="lazy"><figcaption>Recent reviews influence both trust and click-through behaviour.</figcaption></figure>
<p>It is not just about the star rating. Google also pays attention to freshness and relevance. A review that mentions your service and location can be more useful than a generic one-liner.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Many businesses ask for reviews once and then stop. Local SEO works better when you have a simple ongoing process for collecting them.</p></div>
<h2><span class="num">3</span> Your website should reinforce your location</h2>
<p>Your Google profile alone is not enough. Google also looks at your website. Does it clearly explain what you do, who you help, and where you work? If yes, you make it easier for Google to connect the dots.</p>
<ul class="art-checklist"><li>Your city or service area on the homepage and contact page</li><li>A clear page title and heading that match your service</li><li>Contact details and opening hours where relevant</li><li>A location reference or map embed when useful</li><li>Local case studies, reviews, or examples that support trust</li></ul>
<h2><span class="num">4</span> Consistent business details matter more than people expect</h2>
<p>Google compares information across multiple places. If your business name, address, or phone number is written differently on your website, Google profile, and social accounts, that creates uncertainty.</p>
<p>That is why consistency matters. Use one clear version of your business details everywhere and clean up old or outdated mentions when needed.</p>
<h2><span class="num">5</span> Local content gives Google useful context</h2>
<p>Not every small business needs to publish articles every week. But a few strong pages or articles tied to your service area can help Google understand where you are relevant.</p>
<p>Examples include local case studies, city-specific service pages, or practical articles connected to the kinds of questions people in your area actually search for.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Want to be found more easily in your area?</h3><p>We can help structure your website and local visibility in a way that is clear, simple, and built to convert.</p></div><a href="/#contact" class="btn btn-primary">Request a quote →</a></div>
<h2>A simple local SEO plan</h2>
<ul class="art-checklist"><li>Complete your Google Business Profile</li><li>Add new photos and keep details current</li><li>Ask for reviews consistently</li><li>Make your city and services obvious on your website</li><li>Keep your business details identical everywhere</li><li>Add one or two useful local articles or case pages</li></ul>
<h2>Conclusion</h2>
<p>Local SEO is not a secret trick. It is mostly clarity, trust, and consistency. Google wants to understand who you are, where you are, and why you are relevant to someone searching nearby.</p>
<p>If your business depends on local customers, local SEO is not optional. It is one of the most practical ways to become visible to people already looking for what you offer.</p>`
    },
    'what-does-a-small-business-website-cost-in-2026': {
      current: 'Web Design Tips',
      category: 'Web Design Tips',
      date: '22 April 2026',
      read: '8 min read',
      docTitle: 'What Does a Small Business Website Cost in 2026? | WebKreatives',
      title: 'What Does a Small Business Website<br><em>Cost in 2026?</em>',
      bottomTitle: 'Want a website that fits your budget<br>and sells better?',
      bottomText: 'We build compact websites for small businesses that look professional, communicate clearly, and are ready to capture leads.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>One of the most common questions business owners ask is simple: <strong>how much does it cost to have a website made?</strong> And honestly, that makes sense. If you run a small business, you do not want to overpay, but you also do not want to end up with a website that looks fine and produces nothing.</p>
<p>Website pricing in 2026 still varies a lot. You will see offers for a few hundred euros, while other projects cost several thousand. That difference is not only about design. It usually comes down to strategy, structure, copy, speed, SEO, and whether the website is built to actually help turn visitors into enquiries.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">€500</span><span class="art-stat-label">can be enough for a very simple online business card</span></div><div class="art-stat"><span class="art-stat-num">€1,500–€3,500</span><span class="art-stat-label">is often more realistic for a strong small business website</span></div><div class="art-stat"><span class="art-stat-num">1 weak step</span><span class="art-stat-label">in messaging or structure can cost more than the entire price difference</span></div></div>
<p>In this article, we break down where those price differences usually come from, what a small business website should normally include, and how to judge whether a quote is actually smart rather than just cheap.</p>
<h2><span class="num">1</span> The real question is not just: what does it cost?</h2>
<p>Many businesses compare websites as if they were all the same product. They are not. A €500 website and a €2,500 website are often solving different problems. One may simply put you online. The other may be designed to build trust, support search visibility, and guide visitors toward making contact.</p>
<div class="art-quote"><p>"The cheapest website is not automatically the most affordable one. If it does not bring in customers, cheap can still be expensive."</p></div>
<p>That is why it is smarter to think in terms of <strong>business value per euro</strong>, not just the lowest total number.</p>
<h2><span class="num">2</span> Three pricing ranges you will usually see</h2>
<p>Prices vary by freelancer, agency, platform, and scope, but most small business websites fit into three broad categories.</p>
<div class="art-price-grid"><div class="art-price-card"><span class="eyebrow">Basic</span><span class="art-price">€300–€900</span><h3>Simple starter site</h3><p>Usually a template-led setup with limited strategy and limited room for custom positioning. Fine if you mainly want a basic online presence.</p></div><div class="art-price-card"><span class="eyebrow">Smart middle ground</span><span class="art-price">€1,500–€3,500</span><h3>Professional small business website</h3><p>Often the strongest balance for local companies: better design, clearer structure, mobile optimisation, solid SEO basics, and a better contact flow.</p></div><div class="art-price-card"><span class="eyebrow">Expanded</span><span class="art-price">€4,000+</span><h3>Custom site with extra functionality</h3><p>More suitable when you need bookings, integrations, deeper content structure, multiple funnels, or more tailored features.</p></div></div>
<div class="art-table"><div class="art-table-row head"><div>Website type</div><div>Typical price</div><div>Usually fits</div></div><div class="art-table-row"><div>One-page or mini-site</div><div>€300–€900</div><div>Newer solo businesses that mainly want to be visible online quickly</div></div><div class="art-table-row"><div>Website with 4–8 pages</div><div>€1,500–€3,500</div><div>Local businesses that want to look professional and generate enquiries</div></div><div class="art-table-row"><div>Larger site with extra features</div><div>€4,000–€8,000+</div><div>Businesses that want automation, deeper service explanation, or more advanced structure</div></div></div>
<h2><span class="num">3</span> What are you actually paying for?</h2>
<p>If a quote is higher than expected, that does not automatically mean it is overpriced. Often, the price reflects work that is not immediately visible but has a major impact on whether the site performs well.</p>
<ul class="art-checklist"><li>Structure and page flow that make your offer easy to understand</li><li>Copy or messaging support that builds trust</li><li>Mobile optimisation so the site works properly on phones</li><li>Speed and technical quality</li><li>SEO basics such as headings, metadata, and crawlable content</li><li>Conversion elements like CTAs, forms, and clearer navigation</li><li>Possibly photography, branding, or extra functionality</li></ul>
<p>That combination is often what separates a site that merely looks decent from one that actually helps the business.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" alt="Business owners discussing website budget and online growth" loading="lazy"><figcaption>A website budget is usually spent more intelligently when messaging, structure, and visibility are considered from the start.</figcaption></figure>
<h2><span class="num">4</span> Cheap gets expensive when the foundation is weak</h2>
<p>The biggest mistake is not always paying too much. Often it is buying a site that has to be redone once you realise it brings in no enquiries, performs badly on mobile, or does not help you show up well in search.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Focusing only on visual mockups or page count without asking how the message, speed, SEO, and contact flow will actually work.</p></div>
<p>If you have to rebuild after a few months, you often end up spending more than if you had built a stronger foundation from the beginning.</p>
<h2><span class="num">5</span> What should a good small business website include?</h2>
<p>Most local businesses do not need an enormous website. They do need one that is clear, complete, and practical. A strong baseline usually includes:</p>
<ul class="art-checklist"><li>A homepage with a clear message and a visible call to action</li><li>Service pages or sections that explain what you actually offer</li><li>Social proof such as reviews, examples, or case snippets</li><li>A contact page or contact section that removes friction</li><li>Mobile friendliness and good loading speed</li><li>SEO basics for relevant service or local search terms</li></ul>
<h2><span class="num">6</span> How do you judge a quote more intelligently?</h2>
<p>Do not just ask what is included. Ask why it is structured that way. A good quote should make it clear how the project helps you look more professional, become easier to trust, and generate more enquiries.</p>
<ol class="art-checklist"><li>Check whether structure, messaging, and calls to action are included</li><li>Ask how mobile experience, speed, and SEO will be handled</li><li>See whether the website can grow with your business later</li><li>Look at whether support, revisions, or handover help are included</li><li>Compare business impact, not only headline price</li></ol>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Curious what a smart website would cost for your business?</h3><p>We help small businesses get websites that do not just look clean, but also build trust and support enquiries.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>Conclusion</h2>
<p>The cost of a website for a small business depends on what the website is supposed to do. If you only need a basic online presence, the price can stay low. If you want to look professional, support SEO, and convert more visitors, a somewhat higher investment usually makes more sense.</p>
<p>For many small businesses, the best balance is a compact but strategically strong site: not oversized, not overcomplicated, but clearly built to help the business grow.</p>`
    },
    'why-your-google-business-profile-is-your-new-homepage': {
      current: 'Local SEO',
      category: 'Local SEO',
      date: '24 April 2026',
      read: '7 min read',
      docTitle: 'Why Your Google Business Profile Is Your New Homepage in 2026 | WebKreatives',
      title: 'Why Your Google Business Profile<br><em>Is Your New Homepage in 2026</em>',
      bottomTitle: 'Want to look stronger locally<br>from the very first Google click?',
      bottomText: 'We build websites and local visibility systems that work together so your business feels more professional and more convincing from the start.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>Many business owners still assume their website is always the main first impression online. But for local searches, that is becoming less true. In 2026, the first impression often starts in <strong>Google Maps</strong>, in the local pack, or in AI-style summaries above the traditional results.</p>
<p>In other words, for many small businesses, the <strong>Google Business Profile</strong> now behaves like a second homepage. Sometimes even the first one.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">Local first</span><span class="art-stat-label">for many service-based searches, customers see Maps, reviews, and profile details before they ever see a homepage</span></div><div class="art-stat"><span class="art-stat-num">AI signals</span><span class="art-stat-label">local search surfaces increasingly use profile data, reviews, and Q&amp;A as context</span></div><div class="art-stat"><span class="art-stat-num">Direct action</span><span class="art-stat-label">calls, directions, website visits, and messages often begin directly from the profile</span></div></div>
<p>That does not make your website less important. It means your website and your profile need to work together much more closely.</p>
<div class="art-quote"><p>"For local businesses, your Google Business Profile is no longer just a listing. It is often where someone decides whether you look professional, active, and trustworthy enough to click."</p></div>
<h2><span class="num">1</span> Customers often see your profile before your website</h2>
<p>Someone searches for <em>hair salon near me</em>, <em>electrician Zwolle</em>, or <em>web design agency Amsterdam</em>. What do they see first? Often not a homepage. They see a map, business names, reviews, opening hours, photos, and a short description.</p>
<p>If your profile looks messy, half-filled, or outdated there, you lose trust before someone even opens your site.</p>
<h2><span class="num">2</span> Google is using profile signals more intelligently</h2>
<p>Recent SEO publishing and 2026 local-search updates point in the same direction: Google is blending local signals more intelligently. Not just your name and address, but also your category, services, reviews, photos, Q&amp;A, and recent updates help shape how visible and persuasive your profile is.</p>
<p>That is why a profile you set up once and then forget is no longer a smart strategy. It needs to stay active and current.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80" alt="Team discussing local online visibility and customer contact" loading="lazy"><figcaption>Local visibility increasingly depends on trust, freshness, and clear signals across both your profile and your website.</figcaption></figure>
<h2><span class="num">3</span> Your profile should feel like a mini-homepage</h2>
<p>If you treat your Google Business Profile like a mini-homepage, you start making better decisions. You stop asking only whether it exists and start asking whether it actually persuades.</p>
<ul class="art-checklist"><li>Is your business description clear and human?</li><li>Is your main service named properly right away?</li><li>Are your category and service choices accurate?</li><li>Are your opening hours, contact details, and website link current?</li><li>Do you have recent photos that show something real?</li><li>Do you reply to reviews and questions?</li></ul>
<div class="art-mistake"><strong>Common mistake</strong><p>Businesses spend a lot of attention on their homepage while letting their Google Business Profile sit unchanged for months. For local visibility, that often works against them.</p></div>
<h2><span class="num">4</span> Your website is still where you do the real convincing</h2>
<p>Your profile is not there to replace your website. It attracts attention, creates first trust, and sends people onward. Your website should finish the story.</p>
<p>That means both need to align. If someone clicks through from Google, the message should match. The service, the tone, the city or region, and the call to action should all feel like part of the same experience.</p>
<ol class="art-checklist"><li>Your Google Business Profile earns the click with reviews, category, photos, and relevance</li><li>Your website deepens trust with clearer explanation, proof, pricing, or contact options</li><li>The visitor takes action because the overall experience feels consistent and professional</li></ol>
<h2><span class="num">5</span> What small businesses should do right now</h2>
<p>You do not need to turn this into a huge project. A few focused improvements can already make a meaningful difference.</p>
<ul class="art-checklist"><li>Check whether your primary category is truly specific</li><li>Update your description so it clearly explains what you do</li><li>Add fresh photos regularly</li><li>Ask for reviews consistently after real jobs or appointments</li><li>Reply actively to reviews and questions</li><li>Make sure your website and your profile show identical business details</li><li>Link your website to pages that support your core service or local area</li></ul>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Want better visibility in Google Maps and local search?</h3><p>We help small businesses with a stronger combination of website structure, profile clarity, and local SEO foundations.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>Conclusion</h2>
<p>In 2026, a Google Business Profile is no longer a side detail for most local businesses. It is often the first place where a potential customer evaluates you.</p>
<p>If you want to grow locally, you should not choose between website or profile. You need both. But you also need to understand that your profile is often the first screen where the sale begins.</p>`
    },
    'why-online-reviews-bring-you-more-local-customers': {
      current: 'Local SEO',
      category: 'Local SEO',
      date: '29 April 2026',
      read: '7 min read',
      docTitle: 'Why Online Reviews Bring You More Local Customers | WebKreatives',
      title: 'Why Online Reviews<br><em>Bring You More Local Customers</em>',
      bottomTitle: 'Want to win trust faster<br>with local customers?',
      bottomText: 'We build websites and local visibility systems that work together with reviews, Google profiles, and clear conversion paths.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>Many small businesses still treat reviews as a nice extra. Something good to have on Google, but not a real growth lever. In 2026, that is the wrong way to think about them. <strong>Online reviews are one of the clearest signals of trust</strong>, and they also help shape how visible your business becomes locally.</p>
<p>When someone searches for a hair salon, electrician, coach, restaurant, or web agency, they often compare several options within seconds. Reviews are not decoration in that moment. They strongly influence who gets clicked and who gets ignored.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">46%</span><span class="art-stat-label">of Google searches have local intent according to recent local-SEO reporting</span></div><div class="art-stat"><span class="art-stat-num">97%</span><span class="art-stat-label">of consumers look online when evaluating a local business</span></div><div class="art-stat"><span class="art-stat-num">1 click</span><span class="art-stat-label">more or less trust can be the difference between you and a competitor</span></div></div>
<p>That does not mean only stars matter. The real picture includes how many reviews you have, how recent they are, what people actually say, and whether your business responds like an active professional business.</p>
<h2><span class="num">1</span> Reviews are often your first layer of persuasion</h2>
<p>Before someone visits your website, they often already see your Google profile, your rating, short snippets, and maybe a few highlighted comments. By then, the first judgement has already started.</p>
<div class="art-quote"><p>"For many local businesses, the sale does not begin on the homepage. It begins in the review layer of Google."</p></div>
<p>A company with a 4.8 rating and recent, believable feedback immediately feels more active and more trustworthy than a profile with no movement, even if the websites are otherwise similar.</p>
<h2><span class="num">2</span> Reviews support visibility as well as trust</h2>
<p>Local SEO is not just about keywords and pages. Google also looks for signals that suggest a business is real, relevant, and active. Reviews contribute to that picture.</p>
<ul class="art-checklist"><li>They show that customers have interacted with your business recently</li><li>They add natural language around services, locations, and outcomes</li><li>They strengthen the credibility of your Google Business Profile</li><li>They increase the chance that someone clicks through to your profile or website</li></ul>
<p>In other words, reviews can help persuade both the algorithm and the human.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80" alt="Business owner reviewing client feedback and online reputation" loading="lazy"><figcaption>Recent reviews send a clearer signal to both search engines and potential customers that your business is active and trustworthy.</figcaption></figure>
<h2><span class="num">3</span> Recent reviews matter more than old stillness</h2>
<p>Twenty perfect reviews from two years ago are less convincing than a steady flow of new ones. Freshness matters. Not only for how Google reads your profile, but also for how real people interpret it.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Asking for reviews a few times and then stopping for months. That makes a business look inactive online, even if it is busy offline.</p></div>
<p>A simple system usually works better than occasional bursts: ask after delivery, after an appointment, or after a successful purchase at a consistent moment.</p>
<h2><span class="num">4</span> Detailed reviews are stronger than vague ones</h2>
<p>Not every review carries the same weight. A short “Great service” helps, but a review that says what you did, for whom, in which city, or with what result is much more powerful.</p>
<ol class="art-checklist"><li>They feel more credible to new customers</li><li>They add context around your service or specialty</li><li>They often contain language that aligns with local search terms</li><li>They help visitors understand faster whether you fit their situation</li></ol>
<p>You do not need unnatural scripts, but you can make better reviews more likely by giving customers one or two simple prompts.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Want to be easier to trust and easier to find?</h3><p>We help small businesses with websites and local visibility systems that work logically with reviews, Google profiles, and clearer conversion flows.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2><span class="num">5</span> Replying to reviews is part of your reputation</h2>
<p>Many businesses collect reviews and then leave them unanswered. That is a missed opportunity. A response shows there is a real business behind the profile, one that pays attention to customers and stays involved.</p>
<p>That matters for negative reviews as well. A calm, professional reply often builds more trust than a perfect-looking profile with zero interaction.</p>
<h2><span class="num">6</span> A simple review strategy for small businesses</h2>
<p>You do not need a huge reputation-management system. For many local businesses, this is already enough:</p>
<ul class="art-checklist"><li>Choose one main place for reviews, usually Google</li><li>Ask consistently after strong customer moments</li><li>Make it easy with a direct review link</li><li>Reply briefly and humanly to new reviews</li><li>Reuse strong review themes on your website as social proof</li></ul>
<h2>Conclusion</h2>
<p>In 2026, online reviews are no longer just a bonus. For local businesses, they are a practical growth asset that affects visibility, trust, and click behaviour at the same time.</p>
<p>If your business does strong work but barely shows that online, you are probably losing opportunities unnecessarily. A simple, consistent review process can change more than most owners expect.</p>`
    },
    'why-a-one-page-website-is-not-enough-in-2026': {
      current: 'Web Design Tips',
      category: 'Web Design Tips',
      date: '1 May 2026',
      read: '7 min read',
      docTitle: 'Why a One-Page Website Is Not Enough in 2026 | WebKreatives',
      title: 'Why a One-Page Website<br><em>Is Not Enough in 2026</em>',
      bottomTitle: 'Want a website that explains<br>why customers should choose you?',
      bottomText: 'We build compact websites with enough structure to look professional, build trust, and give your business a better chance of real enquiries.',
      bottomPrimaryBtn: 'Start your project →',
      bottomSecondaryBtn: 'Read more articles',
      relatedTitle: 'Read more',
      articlesLink: 'Articles',
      content: `
<p>A one-page website sounds attractive. Fast, clean, not much hassle. And for some situations, that can work perfectly well. But for many local businesses, <strong>one page in 2026 is simply not enough</strong> to explain what you do clearly, build trust, and support search visibility.</p>
<p>Especially when you offer multiple services, want stronger local visibility, or need the site to move visitors toward contacting you, a one-page setup reaches its limits faster than many business owners expect.</p>
<div class="art-stats"><div class="art-stat"><span class="art-stat-num">1 page</span><span class="art-stat-label">can feel simple, but often forces too many goals into one scrolling flow</span></div><div class="art-stat"><span class="art-stat-num">Local SEO</span><span class="art-stat-label">usually works better when services, locations, and proof are separated more clearly</span></div><div class="art-stat"><span class="art-stat-num">More context</span><span class="art-stat-label">often means more trust for visitors who are still deciding whether you are right for them</span></div></div>
<p>That does not mean a one-page site is always wrong. It mostly means you need to understand <em>when it becomes too limited</em>.</p>
<h2><span class="num">1</span> You end up trying to say too much at once</h2>
<p>Many small businesses want one page to explain the offer, show reviews, include SEO signals, answer objections, and generate a contact request at the same time. The result is often a long page that still feels unclear.</p>
<div class="art-quote"><p>"Simple is good. Compressed is something else."</p></div>
<p>If someone has to keep scrolling just to understand which service fits their situation, clarity starts to break down. That is especially costly when you serve multiple customer types or offer several services.</p>
<h2><span class="num">2</span> SEO becomes flatter much faster</h2>
<p>Local SEO in 2026 is not just about having one homepage with some keywords. Search engines are better at evaluating context, service-specific relevance, location signals, and trust. A dedicated page for a core service or audience often makes that relevance easier to communicate.</p>
<ul class="art-checklist"><li>A homepage can tell the main story</li><li>A service page can explain a specific offer more clearly</li><li>A contact or location page can add local clarity</li><li>Articles or case studies can strengthen both trust and visibility</li></ul>
<p>When everything lives on one page, those distinctions usually become weaker.</p>
<figure class="art-img"><img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80" alt="Team discussing website structure and content strategy" loading="lazy"><figcaption>A clearer website structure helps both visitors and search engines understand what your business actually offers.</figcaption></figure>
<h2><span class="num">3</span> Trust often needs more room</h2>
<p>If someone does not know your business yet, they usually need more than a polished first impression. They want to understand what you do, who it is for, how it works, and why they should trust you.</p>
<div class="art-mistake"><strong>Common mistake</strong><p>Reducing everything to tiny blocks and quick claims, which makes the site look clean but leaves it too weak to persuade.</p></div>
<p>For a simple online business card, that may be enough. For a business that actually wants enquiries, a little more structure is often smarter than less.</p>
<h2><span class="num">4</span> Conversion gets messier</h2>
<p>When one page has to carry multiple goals at once, the visitor gets pulled in too many directions. Should they call? Fill in a form? Read reviews first? Compare services? Look for more detail?</p>
<p>With a compact multi-page structure, those steps can be distributed more logically. That usually feels calmer and performs better for real enquiries.</p>
<h2><span class="num">5</span> When is a one-page site enough?</h2>
<p>There are situations where one page is genuinely enough:</p>
<ol class="art-checklist"><li>You have one very clear offer</li><li>You mainly want to get online quickly</li><li>You are using the site as a simple landing page</li><li>You still have very little content or proof to build out</li></ol>
<p>But once the business needs to answer more questions, rank better locally, or create stronger confidence, that one page often becomes tight.</p>
<div class="art-cta-box"><div class="art-cta-box-text"><h3>Not sure whether your website is thinking too small?</h3><p>We help small businesses choose between a smart compact site and a structure that gives more room for trust, SEO, and conversion.</p></div><a href="/#contact" class="btn btn-red">Request a quote →</a></div>
<h2>Conclusion</h2>
<p>A one-page website is not automatically wrong. But in 2026, for many local businesses, it is more often a stepping stone than a strong final solution.</p>
<p>If your website needs to genuinely support trust, visibility, and enquiries, a slightly richer structure is often not overkill at all. It is simply a stronger foundation.</p>`
    }
  };

  function applyArticleLanguage(lang){
    const key = (lang === 'en') ? 'en' : 'nl';
    const page = translations[slug];
    if (!page) return;
    document.documentElement.lang = key;
    const titleEl = document.querySelector('.art-title');
    const categoryEl = document.querySelector('.art-category');
    const dateEl = document.querySelector('.art-date');
    const readEl = document.querySelector('.art-readtime');
    const currentEl = document.querySelector('.arc-current');
    const articlesLinkEl = document.querySelector('[data-wk-articles-link]');
    const bottomTitleEl = document.querySelector('.art-bottom-cta h2');
    const bottomTextEl = document.querySelector('.art-bottom-cta p');
    const bottomPrimaryBtnEl = document.querySelector('.art-bottom-cta-btns .btn.btn-red');
    const bottomSecondaryBtnEl = document.querySelector('.art-bottom-cta-btns .btn.btn-outline-white');
    const relatedTitleEl = document.querySelector('.art-related h3');
    if (key === 'en') {
      document.title = page.docTitle || originalDocTitle;
      if (titleEl) titleEl.innerHTML = page.title;
      if (categoryEl) categoryEl.textContent = page.category;
      if (dateEl) dateEl.textContent = page.date;
      if (readEl) readEl.textContent = page.read;
      if (currentEl) currentEl.textContent = page.current;
      if (articlesLinkEl) articlesLinkEl.textContent = page.articlesLink || 'Articles';
      if (bottomTitleEl) bottomTitleEl.innerHTML = page.bottomTitle;
      if (bottomTextEl) bottomTextEl.textContent = page.bottomText;
      if (bottomPrimaryBtnEl) bottomPrimaryBtnEl.textContent = page.bottomPrimaryBtn || 'Start your project →';
      if (bottomSecondaryBtnEl) bottomSecondaryBtnEl.textContent = page.bottomSecondaryBtn || 'Read more articles';
      if (relatedTitleEl) relatedTitleEl.textContent = page.relatedTitle || 'Read more';
      contentEl.innerHTML = page.content;
    } else {
      document.title = originalDocTitle;
      if (titleEl) titleEl.innerHTML = originalTitle;
      if (categoryEl) categoryEl.textContent = originalCategory;
      if (dateEl) dateEl.textContent = originalDate;
      if (readEl) readEl.textContent = originalRead;
      if (currentEl) currentEl.textContent = originalCurrent;
      if (articlesLinkEl) articlesLinkEl.textContent = originalArticlesLink;
      if (bottomTitleEl) bottomTitleEl.innerHTML = originalBottomTitle;
      if (bottomTextEl) bottomTextEl.textContent = originalBottomText;
      if (bottomPrimaryBtnEl) bottomPrimaryBtnEl.textContent = originalBottomPrimaryBtn;
      if (bottomSecondaryBtnEl) bottomSecondaryBtnEl.textContent = originalBottomSecondaryBtn;
      if (relatedTitleEl) relatedTitleEl.textContent = originalRelatedTitle;
      contentEl.innerHTML = originalHtml;
    }
  }

  document.addEventListener('wk:languagechange', (event) => applyArticleLanguage(event?.detail?.lang || localStorage.getItem('wk-lang') || 'nl'));
  applyArticleLanguage(localStorage.getItem('wk-lang') || 'nl');
})();

