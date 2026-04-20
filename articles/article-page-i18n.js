(function(){
  const slug = (document.querySelector('link[rel="canonical"]')?.href || '').replace(/\/$/, '').replace(/\.html$/, '').split('/').pop();
  const contentEl = document.querySelector('.art-content');
  if (!contentEl) return;
  const originalHtml = contentEl.innerHTML;
  const originalTitle = document.querySelector('.art-title')?.innerHTML || '';
  const originalCategory = document.querySelector('.art-category')?.textContent || '';
  const originalDate = document.querySelector('.art-date')?.textContent || '';
  const originalRead = document.querySelector('.art-readtime')?.textContent || '';
  const originalCurrent = document.querySelector('.arc-current')?.textContent || '';
  const originalBottomTitle = document.querySelector('.art-bottom-cta h2')?.innerHTML || '';
  const originalBottomText = document.querySelector('.art-bottom-cta p')?.textContent || '';

  const translations = {
    '5-reasons-customers-leave-your-website': {
      current: 'Website Mistakes',
      category: 'Web Design Tips',
      date: '19 April 2026',
      read: '7 min read',
      title: '5 Reasons Customers Leave<br><em>Your Website</em>',
      bottomTitle: 'We can fix it.',
      bottomText: 'A website that actually works for your business: fast, mobile-friendly, and built to bring in customers. From €199, live within 5 days.',
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
      category: 'Salon & Beauty',
      date: '19 April 2026',
      read: '6 min read',
      title: 'Why Your Hair Salon<br><em>Needs a Website</em>',
      bottomTitle: 'Your salon deserves<br>a professional website',
      bottomText: 'Starter package from €199, mobile-friendly, quick to launch, and tailored to your salon.',
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
      title: 'Local SEO: How Google<br><em>Finds You in Your City</em>',
      bottomTitle: 'Want better local visibility<br>without a messy website?',
      bottomText: 'We build websites that communicate clearly, support local rankings, and make your business look professional in Google.',
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
    const bottomTitleEl = document.querySelector('.art-bottom-cta h2');
    const bottomTextEl = document.querySelector('.art-bottom-cta p');
    if (key === 'en') {
      if (titleEl) titleEl.innerHTML = page.title;
      if (categoryEl) categoryEl.textContent = page.category;
      if (dateEl) dateEl.textContent = page.date;
      if (readEl) readEl.textContent = page.read;
      if (currentEl) currentEl.textContent = page.current;
      if (bottomTitleEl) bottomTitleEl.innerHTML = page.bottomTitle;
      if (bottomTextEl) bottomTextEl.textContent = page.bottomText;
      contentEl.innerHTML = page.content;
    } else {
      if (titleEl) titleEl.innerHTML = originalTitle;
      if (categoryEl) categoryEl.textContent = originalCategory;
      if (dateEl) dateEl.textContent = originalDate;
      if (readEl) readEl.textContent = originalRead;
      if (currentEl) currentEl.textContent = originalCurrent;
      if (bottomTitleEl) bottomTitleEl.innerHTML = originalBottomTitle;
      if (bottomTextEl) bottomTextEl.textContent = originalBottomText;
      contentEl.innerHTML = originalHtml;
    }
  }

  document.addEventListener('wk:languagechange', (event) => applyArticleLanguage(event?.detail?.lang || localStorage.getItem('wk-lang') || 'nl'));
  applyArticleLanguage(localStorage.getItem('wk-lang') || 'nl');
})();

