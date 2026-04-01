-- Full project seed (all frontend projects).
with project_data(slug,title,short_description,full_description,client,year,role,duration,featured,status,sort_order,cover_image_url,meta_title,meta_description,og_image_url) as (
  values
  ('viewflix','VIEWFLIX','Streaming Analytics Dashboard UX/UI','VIEWFLIX is a comprehensive dashboard for streaming service providers to monitor real-time user engagement, peak traffic hours, and content performance metrics.','ViewFlix Inc.',2025,'Product Designer','3 Months',true,'published',10,'/VF/1.jpg','VIEWFLIX Case Study','Streaming analytics dashboard UX/UI case study.','/VF/1.jpg'),
  ('cv-genius','CV Genius','Ai Resume Builder SaaS Landing Page UI/UX Design','CV Genius is an AI-powered resume builder designed to help job seekers create ATS-optimized resumes in minutes. The landing page emphasizes simplicity, speed, and the power of AI assistance, guiding users from a blocked state to hired with confidence.','CV Genius',2025,'Lead Designer','4 Weeks',false,'published',20,'/Cv/1.png','CV Genius Case Study','AI resume builder landing page case study.','/Cv/1.png'),
  ('aura-pods-pro','AURA Pods Pro','Conversion-Focused Product Landing Page UX','AURA Pods Pro required a high-conversion landing page that balanced technical specifications with lifestyle branding. The design focus was on tactile visual elements and a seamless user flow from feature discovery to checkout.','AURA Digital',2025,'Lead UI/UX Designer','4 Weeks',true,'published',30,'/Aur/1.png','AURA Pods Pro Case Study','Conversion-focused landing page for consumer product.','/Aur/1.png'),
  ('upskillr','UPSKILLR','EdTech SaaS Landing Page UI/UX Design','UPSKILLR is a modern learning platform connecting professionals with industry-led micro-courses. The landing page uses bold typography and dynamic layouts to communicate growth, energy, and career advancement possibilities.','Upskillr Tech',2025,'UI/UX Designer','5 Weeks',false,'published',40,'/Upskillr/1.png','UPSKILLR Case Study','EdTech SaaS landing page design case study.','/Upskillr/1.png'),
  ('nova-wallet','NOVA Wallet','Personal Finance App Landing Page','NOVA Wallet simplifies personal finance management with a sleek, dark-mode focused interface. The project involved designing a landing page that builds trust while showing off the app modern, secure, and user-friendly features.','Nova FinTech',2025,'Product Designer','6 Weeks',false,'published',50,'/Nova/1.png','NOVA Wallet Case Study','Personal finance app landing page case study.','/Nova/1.png'),
  ('ek-analytics','E.K Analytics','B2B Data Analytics Platform UX/UI','E.K Analytics simplifies complex B2B data into actionable insights. The platform features customizable widgets and automated reporting tools for enterprise teams.','EK Solutions',2024,'UI/UX Consultant','6 Weeks',true,'published',60,'/EK/1.png','E.K Analytics Case Study','B2B analytics platform UX case study.','/EK/1.png'),
  ('clarity-care','CLARITY Care','Telehealth Platform UX/UI Design','Clarity Care is a patient-first telehealth platform designed to bridge the gap between rural patients and specialist healthcare providers via secure video consultation.','Clarity Health',2024,'Product Designer','2 Months',true,'published',70,'/Clar/1.png','CLARITY Care Case Study','Telehealth platform UX/UI case study.','/Clar/1.png'),
  ('aurea-residences','Aurea Residences','Luxury Real Estate Website UI Design','Aurea Residences represents the pinnacle of luxury living. The website design matches the property elegance with sophisticated typography, immersive imagery, and a seamless booking and inquiry flow for high-net-worth individuals.','Aurea Group',2024,'Lead Designer','2 Months',false,'published',80,'/Aurea/1.png','Aurea Residences Case Study','Luxury real estate website design case study.','/Aurea/1.png'),
  ('moodra','Moodra','Mental Health & Recovery Website UI Design','Moodra is a compassionate digital space for mental health recovery. The design utilizes calming color palettes, accessible typography, and a supportive user journey to encourage users to seek help and access resources easily.','Moodra Health',2024,'UI/UX Designer','3 Months',false,'published',90,'/Moodra/1.png','Moodra Case Study','Mental health and recovery website case study.','/Moodra/1.png')
)
insert into public.projects (slug,title,short_description,full_description,client,year,role,duration,featured,status,sort_order,cover_image_url,meta_title,meta_description,og_image_url)
select * from project_data
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  full_description = excluded.full_description,
  client = excluded.client,
  year = excluded.year,
  role = excluded.role,
  duration = excluded.duration,
  featured = excluded.featured,
  status = excluded.status,
  sort_order = excluded.sort_order,
  cover_image_url = excluded.cover_image_url,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  og_image_url = excluded.og_image_url;
