---
site:
  name: Northwalk
  displayName: nw
  description: Some website description
  url: http://localhost:4321 # without '/' trailing slash
  featuredImage:
    image: /src/media/pages/bg-5.webp
    alt: Social image
  theme: neutral-cyan
  
  # 'amber','emerald','indigo','neutral-cyan','neutral-indigo','neutral-pink','neutral-purple','neutral-red','neutral-teal','pink','purple','teal','light','dark','auto',
  duotone: false
  transitions: true
navigation:
  menuLinks:
    - type: archive
      label: Articles
      link: /articles
    - type: archive
      label: Templates
      link: /templates
    - type: archive
      label: Work
      link: /work
    - type: work
      label: Work 1
      link: src/data/work/northwalk-1.md
    - type: url
      label: External
      link: https://bbc.co.uk
---
