# Content Management Guide

## Overview
This project uses Google Sheets as a simple CMS to manage dynamic content. Content updates will appear on the website within ~30 minutes due to Incremental Static Regeneration (ISR).

## Google Sheet Setup

### 1. Create Your Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it something like "BeaYOUtiful Foundation - Website Content"

### 2. Set Up Columns
**Row 1 must contain these exact column headers:**
- `key` (Column A)
- `value` (Column B)

### 3. Configure Sharing
1. **File → Share → Anyone with the link (Viewer)**
   - Click "Share" button
   - Change to "Anyone with the link"
   - Set permission to "Viewer"
   - Copy the link

2. **File → Publish to the web → Entire document**
   - Go to File menu
   - Select "Publish to the web"
   - Choose "Entire document"
   - Click "Publish"

### 4. Extract Sheet ID
From your share link, copy the Sheet ID:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit#gid=0
                                    ↑
                              Copy this part
```

## Content Keys

The following keys are currently supported by the website:

| Key | Description | Default Value |
|-----|-------------|---------------|
| `heroTitle` | Main hero heading | "Join the Hundred. Change Lives" |
| `heroSubtext` | Hero section subtitle | "Join an exclusive circle of changemakers funding confidence and self-worth for young people who need it most." |
| `ctaLabel` | Call-to-action button text | "Donate Now" |
| `totalRaised` | Total funds raised display | "$2,500" |
| `supporterCount` | Number of supporters | "15" |
| `impact1` | First impact bullet point | "Personalized Mentorship" |
| `impact2` | Second impact bullet point | "Confidence Building Workshops" |
| `impact3` | Third impact bullet point | "Leadership Development" |
| `investmentFunds` | What your investment funds text | "Your $25/month directly funds program materials..." |
| `changemakerBenefit1` | Changemaker benefit 1 | "Personalized welcome kit & digital badge" |
| `changemakerBenefit2` | Changemaker benefit 2 | "Featured on Impact Wall & quarterly spotlights" |
| `changemakerBenefit3` | Changemaker benefit 3 | "Early access to events & volunteer opportunities" |
| `changemakerBenefit4` | Changemaker benefit 4 | "Annual celebration invitation" |
| `changemakerBenefit5` | Changemaker benefit 5 | "Quarterly impact reports & member updates" |
| `changemakerBenefit6` | Changemaker benefit 6 | "Free digital event access" |
| `changemakerBenefit7` | Changemaker benefit 7 | "Founding changemaker recognition" |
| `testimonial1Quote` | First testimonial quote | "The confidence workshops helped me find my voice..." |
| `testimonial1Author` | First testimonial author | "Alex Johnson" |
| `testimonial1Role` | First testimonial role | "Workshop Participant, Age 16" |
| `testimonial1Initials` | First testimonial initials | "AJ" |
| `testimonial2Quote` | Second testimonial quote | "Giving $25 a month is the easiest..." |
| `testimonial2Author` | Second testimonial author | "Sarah Martinez" |
| `testimonial2Role` | Second testimonial role | "Monthly Supporter" |
| `testimonial2Initials` | Second testimonial initials | "SM" |
| `testimonial3Quote` | Third testimonial quote | "The mentorship program gave me..." |
| `testimonial3Author` | Third testimonial author | "Taylor Kim" |
| `testimonial3Role` | Third testimonial role | "Mentorship Graduate, Age 17" |
| `testimonial3Initials` | Third testimonial initials | "TK" |

## Example Sheet Layout

| key | value |
|-----|-------|
| heroTitle | Join the Hundred. Change Lives |
| heroSubtext | Join an exclusive circle of changemakers funding confidence and self-worth for young people who need it most. |
| ctaLabel | Donate Now |
| totalRaised | $2,500 |
| supporterCount | 15 |
| impact1 | Personalized Mentorship |
| impact2 | Confidence Building Workshops |
| impact3 | Leadership Development |
| investmentFunds | Your $25/month directly funds program materials, workshop supplies, mentorship resources, and mental wellness tools for young people who need them most. Based on current costs this supports about 2 participants each month. |
| changemakerBenefit1 | Personalized welcome kit & digital badge |
| changemakerBenefit2 | Featured on Impact Wall & quarterly spotlights |
| changemakerBenefit3 | Early access to events & volunteer opportunities |
| changemakerBenefit4 | Annual celebration invitation |
| changemakerBenefit5 | Quarterly impact reports & member updates |
| changemakerBenefit6 | Free digital event access |
| changemakerBenefit7 | Founding changemaker recognition |
| testimonial1Quote | "The confidence workshops helped me find my voice. I never thought I could speak in front of my class, but now I'm mentoring others." |
| testimonial1Author | Alex Johnson |
| testimonial1Role | Workshop Participant, Age 16 |
| testimonial1Initials | AJ |
| testimonial2Quote | "Giving $25 a month is the easiest high-impact habit I have. Seeing the monthly updates makes me feel connected to the change." |
| testimonial2Author | Sarah Martinez |
| testimonial2Role | Monthly Supporter |
| testimonial2Initials | SM |
| testimonial3Quote | "The mentorship program gave me the tools to believe in myself. Now I'm applying to college with confidence I never had before." |
| testimonial3Author | Taylor Kim |
| testimonial3Role | Mentorship Graduate, Age 17 |
| testimonial3Initials | TK |

## Environment Setup

1. Copy `src/env.example` to `.env.local`
2. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
3. Restart your development server

## Update Frequency

- **Development**: Changes appear immediately after restart
- **Production**: Updates appear within ~30 minutes due to ISR (revalidate=1800 seconds)
- **Manual Refresh**: You can force a refresh by redeploying

## Troubleshooting

- **Content not updating**: Check that sharing is set to "Anyone with the link (Viewer)"
- **Sheet not found**: Verify the Sheet ID is correct in your `.env.local`
- **Build errors**: Ensure all required keys exist in your sheet
- **Permission errors**: Make sure the sheet is published to the web

## Best Practices

1. **Keep keys lowercase** and use camelCase for multi-word keys
2. **Test content length** - very long text may break layouts
3. **Use consistent formatting** - avoid special characters that might cause issues
4. **Backup your content** - keep a copy of important text elsewhere
5. **Coordinate updates** - let the team know when making major content changes
