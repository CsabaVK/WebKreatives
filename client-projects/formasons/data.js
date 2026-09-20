/* Formasons Estates — the facts the pages read from.
   Everything a person might want to change lives here: phone numbers, the
   address, the service lines, the process, the testimonials. The pages render
   from this file, so a new service or a new number never needs an HTML edit. */
window.FORMASONS = {
  name: 'Formasons Estates',
  trading: 'FGL Facilities',
  group: ['FGL Facilities', 'FGL Cleaning', 'FGL London', 'FGL Cardiff'],
  phone: '0330 043 3012',
  phoneRaw: '+443300433012',
  phone2: '0121 798 1329',
  phone2Raw: '+441217981329',
  email: 'info@formasons.com',
  address: { street: '1 Kingdom Street', area: 'Paddington', city: 'London', postcode: 'W2 6BD' },
  mapsUrl: 'https://www.google.com/maps?q=1+Kingdom+Street,+Paddington,+London+W2+6BD',
  coverage: ['London', 'Greater London', 'Cardiff'],

  /* The six service families. `lines` are the named services exactly as the
     client lists them; `note` is the one sentence under the family name. */
  services: [
    { id: 'cleaning', name: 'Cleaning',
      note: 'Offices, hospitality, end of tenancy.',
      lines: ['Office cleaning', 'Pub and restaurant cleaning', 'Jet wash and specialist cleaning', 'Clearances and end-of-tenancy cleaning', 'Commercial cleaning'] },
    { id: 'maintenance', name: 'Maintenance',
      note: 'Planned and on call, inside and out.',
      lines: ['Planned maintenance', 'Mechanical and electrical', 'Ground maintenance', 'General maintenance'] },
    { id: 'security', name: 'Security',
      note: 'Staffed and monitored, around the clock.',
      lines: ['Manned guarding', 'Door supervisor', 'Key holding', 'Vacant property supervision', 'Concierge and CCTV'] },
    { id: 'handyman', name: 'Handyman',
      note: 'The small jobs that otherwise wait.',
      lines: ['General DIY', 'Odd jobs', 'Paint and decorating', 'Locksmith'] },
    { id: 'washroom', name: 'Washroom',
      note: 'Supplies and service on one schedule.',
      lines: ['Supplies', 'Rental of equipment', 'Service and maintain', 'Sanitary services'] },
    { id: 'waste', name: 'Waste management',
      note: 'Bins, skips and recycling, on your schedule.',
      lines: ['Complete waste management solution', 'General recycling', 'Supply of bins and skips'] }
  ],

  /* One week of a typical schedule, shown beside the process ledger. */
  sampleSchedule: [
    { day: 'Mon', what: 'Office clean', when: '06:00' },
    { day: 'Tue', what: 'Planned maintenance', when: '08:00' },
    { day: 'Wed', what: 'Office clean', when: '06:00' },
    { day: 'Thu', what: 'Washroom service', when: '07:30' },
    { day: 'Fri', what: 'Office clean, waste collection', when: '06:00' },
    { day: 'Sat', what: 'Grounds', when: '09:00' },
    { day: 'Sun', what: 'Key holding, 24-hour line', when: '' }
  ],

  /* The overnight timeline drawn beside the building section. `side` is
     which side of the building the note sits on, `y` its height on it. */
  overnight: [
    { t: '22:00', what: 'Security desk staffed, doors locked', side: 'l', y: 346 },
    { t: '02:00', what: 'Perimeter walked, CCTV watched', side: 'l', y: 282 },
    { t: '04:30', what: 'Waste out, bins to the yard', side: 'l', y: 196 },
    { t: '06:00', what: 'Cleaning, every floor', side: 'l', y: 110 },
    { t: '07:30', what: 'Plant room checked', side: 'r', y: 47 },
    { t: '08:00', what: 'Washrooms stocked', side: 'r', y: 196 },
    { t: '08:30', what: 'First person in. Nothing to notice.', side: 'r', y: 346 }
  ],

  process: [
    { name: 'Property analysis', text: 'We walk the building with you, floor by floor.' },
    { name: 'Customised plan', text: 'One schedule, every service, frequency and people named.' },
    { name: 'On-site consultation', text: 'The plan is checked on site before it is priced.' },
    { name: 'Estimate', text: 'In writing within one working day. No obligation.' },
    { name: 'Delivery', text: 'Our own staff, a named contact, a 24-hour line.' },
    { name: 'Finishing touches', text: 'Inspected, signed off with you, schedule adjusted.' }
  ],

  promises: [
    'A free consultation, on site.',
    'A written estimate within one working day.',
    'A 24-hour line, answered by a person.',
    'Fully licensed and insured.',
    'If it is not right, we put it right.'
  ],

  recognition: ['Best of Home Org 2018, Winner', '100 Remodelers, West Coast', 'HoM Top Choices', 'Mel8 Certified'],

  testimonials: [
    { name: 'Mx Jacks Mayfield', text: 'Formasons have been a pleasure to work with. Their team of experts is dedicated to ensuring that our property is managed to the highest standards. We highly recommend them for all your facilities management needs.' },
    { name: 'Peter Scranford', text: 'Formasons has been managing our property for over a year now, and we are extremely satisfied with their service. Their team of experts is professional and dedicated to ensuring that our property is managed to the highest standards. We highly recommend them to anyone looking for facilities management services.' },
    { name: 'Tom Jones', text: 'Formasons has been managing our property for several months now, and we are very impressed with their service. Their team of experts is knowledgeable and dedicated to providing the highest level of service to their clients. We highly recommend them for all your facilities management needs.' }
  ]
};
