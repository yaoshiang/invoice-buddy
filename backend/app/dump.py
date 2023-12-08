system_prompt= (
    "Your job is to help a product manager write a mock press release. "
    "The Amazon Mock Press Release format is part of the Amazon approach to product development."
    "It starts with a strong emphasis on the user, and how a product will be received by the user."
    "The goal is not to enumerate a bunch of features or technologies, but to focus on how a user benefits."
    'Here is a template of the press release. "'
    "[TITLE]"
    "[Subtitle]"
    "[City, State]–[Intended Launch Date]"
    "[Intro paragraph]"
    "[Problem]"
    "[Solution]"
    "[Quote by leader in your company]"
    "[How the product/service works]"
    "[Quote by a customer of the product/service]"
    "[To learn more, go to [URL]."
    '"'
    ''
    'A few notes on using the template above:'
    '[Title] - This is a standard press release title. I like this general format: [COMPANY] ANNOUNCES [SERVICE | TECHNOLOGY | TOOL] TO ENABLE [CUSTOMER SEGMENT] TO [BENEFIT STATEMENT]. '
    '[Subtitle] - The subtitle just frames the main announcement in a different way or provides another element of detail.'
    "[Date] - Set this to 3 months from today."
    '[Intro paragraph] - Provide a crisp 3-4 sentences that reiterate and expand on the title with a little more detail on the customers served and what is being launched.'
    '[Problem paragraph] - Lay out the top 3-4 (max) problems for the customers your product or service is intended to serve. Describe each problem briefly and talk about the negative impact of it. Resist the temptation to start talking about your solution. Keep this paragraph focused on the problems, and make sure the problems are ranked in descending order of how painful they are.'
    '[Solution paragraph] - Describe how your product/service elegantly solves the problem. Give a brief overview of how it works, and then go through and talk about how it solves each problem you listed above.'
    '[Quote by leader in your company] - Pick a leader in your company and make up a quote that talks about why the company decided to tackle this problem and (at a high-level) how the solution solves it.'
    '[How the product/service works] - Describe what a customer has to do to start using the product/service and how it works. Go into enough detail to give them confidence it actually solves the problem.'
    '[Customer quote] - Create a fake quote by a fake customer, but one that sounds like it could be real. The customer should describe her pain point or the goal she needs to accomplish, and then how the product you launched enables her to do so.'
    '[How to get started] - Provide a URL or other information on the first place a customer should go to get access to the product/service.'
    ''
    'Here is a mock press release to show you how it all comes together. It includes html. '
    '<h1>CIRCULERT APP ALERTS SHOPPERS WHEN THE PRODUCTS AND SERVICES THEY WANT BECOME AVAILABLE OR DROP IN PRICE</h1>'
    "<h2>If a product or service isn’t available today or at the right price, Circulert helps shoppers buy it later, for less.</h2>"
    'SEATTLE–January 1, 2024'
    '<p>Circulert, a Seattle company, today launched a new application for iOS and Android that notifies users when the products and services they want or need become available for sale or drop in price. '
    '<h3> Problem </h3>'
    '<p>Many items consumers want to buy aren’t available today, or the price might not be quite sharp enough to prompt a purchase. If there’s a specific brand of clothing you like, you have to keep checking retailer websites so see if they’ve released a new line, or spend time looking through a slew of daily emails from every retailer you’ve ever shopped from to find the one email that tells you about new products you care about. How often have you found out that your favorite band is playing a show in your town after all the tickets are sold out? How often have you picked through “web specials” of your favorite clothing line when they go on discount, only to find that the only sizes still available of that one product you love are XXL of XXS? Too often.</p>'
    '<h3> Solution </h3>'
    '<p>Circulert solves these problems by telling you when you can buy the things you want, or buy the things you want at the price you want. No more work. No more missing out. Circulert learns about the products and services you care most about, and then sends you only the notifications you want. You can choose the notification style or frequency, or view a feed of recent alerts. You are in control. At launch, Circulert can send you availability or price drop notifications for products like clothing, music, or books from your favorite brands, artists or authors. Circulert can also tell you when your favorite band schedules a show in your town, when a flight between you and your long-distance partner is a screaming deal, or when the price of that sweet new tech bauble drops below the amount your spouse is likely to notice on the credit card statement.</p>'
    '<h3> Quote By Company Leader</h3>'
    '<p>“Our goal with Circulert is to take the hassle out of buying things later,” said Ian McAllister, creator of Circulert. “There are tens of thousands of retailers on the web selling everything imaginable. Circulert helps consumers filter out the noise and all the stuff they don’t need, and helps them get the things they do need at the best price, saving them time and money.”</p>'
    '<h3> How The Product Works Works </h3>'
    '<p>To try out Circulert, go to Circulert.com and download the app for iOS or Android. Connect the app to your Amazon, Ticketmaster, and other online accounts, and then review the suggested alerts. Circulert will then send you only highly relevant notifications when the items you want are available at the right price. You can star items that you want to get back to easily, share them with friends and family, or follow through and buy them.</p>'
    '<h3> Quote By Customer </h3>'
    '<p>“I absolutely hate missing out on a great deal,” said Clare Keating, a nurse in Seattle. ”To make sure I don’t miss out I used to have to hit my favorite websites every few days. With Circulert, I found out about great deals right away and never miss out.”</p>'
    '<h3> How To Get Started </h3>'
    '<p>If you want to save time or money (or both!), visit circulert.com today.</p>'
    '')

user_prompt = (
    'I interviewed the product manager. My questions, and the product manager responses, '
    'stored as a json. The json consists of five sections. Each section starts with '
    'the dict["label"], which is what I asked the product manager. The product manager '
    'did the hard work of thinking through the problem carefully and responding in text,'
    'which is in the dict["value"] field. In case the product manager accidentally added HTML tags,'
    'ignore all of the HTML tags.'
    'Now that you have all the context on the goal, and the template, here is the '
    'job to be done: write a document in the Amazon Mock Press Release format, '
    'based on the information provided by the product manager. '
    'Use HTML tags to create headings and paragraphs, just like you saw in the template.'
    'Target about 1-2 pages of content. '
    'It is very important that you do not respond with headers based on my questions and the product manager response.'
    'Your headings should match the AMazon Mock Press Release format: '
    "[TITLE]"
    "[Subtitle]"
    "[City, State]–[Intended Launch Date]"
    "[Intro paragraph]"
    "[Problem]"
    "[Solution]"
    "[Quote by leader in your company]"
    "[How the product/service works]"
    "[Quote by a customer of the product/service]"
    "[To learn more, go to [URL].")

import re
# as per recommendation from @freylis, compile once only
CLEANR = re.compile('<.*?>') 

def cleanhtml(raw_html):
  cleantext = re.sub(CLEANR, '', raw_html)
  return cleantext

print(cleanhtml(system_prompt))
print(cleanhtml(user_prompt)      )

Who is your ideal customer? Be very specific. What annoys them? What keeps them up at night? What will get them promoted?

The ideal customer is a boutique law firm focused on litigation. They compete for clients by promising a more cost effective 
approach to litigation than the big firms. one of the ways they do this is by using technology throughout their business.

What is their challenge or pain or frustration? What time of day does it happen? What language does the user say when this happens?

The challenge is that they have to manually review documents during discovery to build a chronological timeline of events. This
could take hours of an associates times, requiring thousands in billable fees, not to mention mind-numbing work for associates
that leads to burnout. 

How would you describe to Oprah Winfrey what your product is and the single most important benefit for this customer? How would they describe a magical experience with your product?

Lex Intel automatically scans hundreds of thousands of documents and builds a chronological timeline of events in minutes. This
is a magical experience for laywers because it saves them hours of time and thousands of dollars in billable fees to get the
first draft of a timeline down. Every sentence created by the Lex Intel LLMs has references to the original documents, so
a human lawyer in the loop can review and ensure accuracy.

How will your user experience your product? Is it an app, website, or physical product?

Lexintel is available as an add-in to Microsoft Word, and integrates with all the major document management systems used
by law firms including iManage and NetDocuments.

If the product were perfect, what should the user do right now to get access to your product?

Visit lexintel.ai or call 1-800-LEX-INTEL to talk to a solution architect today.





Who is your ideal customer? Be very specific. What annoys them? What keeps them up at night? What will get them promoted?

The ideal customer is a boutique law firm focused on litigation. They compete for clients by promising a more cost effective 
approach to litigation than the big firms. one of the ways they do this is by using technology throughout their business.

What is their challenge or pain or frustration? What time of day does it happen? What language does the user say when this happens?

The challenge is that they have to manually review recent dockets involving their judge to understand the personality, psychology,
and tendencies of that specific judge to tailor their filings to the judge. This could take hours of an associates times, requiring
thousands in billable fees. 

How would you describe to Oprah Winfrey what your product is and the single most important benefit for this customer? How would they describe a magical experience with your product?

Lex Intel automatically scans all the dockets for a judge to build a profile of the judge's personality, psychology, and tendencies, then
it uses that profile to critique draft filings and suggest edits to tailor the filing to the judge. 


How will your user experience your product? Is it an app, website, or physical product?

Lexintel is available as an add-in to Microsoft Word, and integrates with all the major court case data providers including
WestLaw and LexisNexis.

If the product were perfect, what should the user do right now to get access to your product?

Visit lexintel.ai or call 1-800-LEX-INTEL to talk to a solution architect today.
