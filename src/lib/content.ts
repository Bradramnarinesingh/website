export interface ContentData {
  [key: string]: string;
}

const DEFAULT_CONTENT: ContentData = {
  heroTitle: "Join the Hundred. Change Lives",
  heroSubtext: "Join an exclusive circle of changemakers funding confidence and self-worth for young people who need it most.",
  impact1: "Personalized Mentorship",
  impact2: "Confidence Building Workshops",
  impact3: "Leadership Development",
  investmentFunds: "Your $25/month directly funds program materials, workshop supplies, mentorship resources, and mental wellness tools for young people who need them most. Based on current costs this supports about 2 participants each month.",
  changemakerBenefit1: "Personalized welcome kit & digital badge",
  changemakerBenefit2: "Featured on Impact Wall & quarterly spotlights",
  changemakerBenefit3: "Early access to events & volunteer opportunities",
  changemakerBenefit4: "Annual celebration invitation",
  changemakerBenefit5: "Quarterly impact reports & member updates",
  changemakerBenefit6: "Free digital event access",
  changemakerBenefit7: "Founding changemaker recognition",
  testimonial1Quote: "\"The confidence workshops helped me find my voice. I never thought I could speak in front of my class, but now I'm mentoring others.\"",
  testimonial1Author: "Alex Johnson",
  testimonial1Role: "Workshop Participant, Age 16",
  testimonial1Initials: "AJ",
  testimonial2Quote: "\"Giving $25 a month is the easiest high-impact habit I have. Seeing the monthly updates makes me feel connected to the change.\"",
  testimonial2Author: "Sarah Martinez",
  testimonial2Role: "Monthly Supporter",
  testimonial2Initials: "SM",
  testimonial3Quote: "\"The mentorship program gave me the tools to believe in myself. Now I'm applying to college with confidence I never had before.\"",
  testimonial3Author: "Taylor Kim",
  testimonial3Role: "Mentorship Graduate, Age 17",
  testimonial3Initials: "TK"
};

export async function fetchContent(): Promise<ContentData> {
  const sheetId = process.env.SHEET_ID;
  
  console.log('Fetching content, sheet ID:', sheetId ? 'Set' : 'Not set');
  
  if (!sheetId) {
    console.warn('SHEET_ID environment variable not set, using default content');
    return DEFAULT_CONTENT;
  }

  try {
    // Try multiple approaches to fetch the sheet data
    let response: Response | null = null;
    let url = '';
    let successMethod = '';
    
    // Method 1: Try gsx2json with different sheet names
    const possibleSheetNames = ['Sheet1', 'Sheet 1', 'Sheet', '1', ''];
    for (const sheetName of possibleSheetNames) {
      try {
        url = sheetName 
          ? `https://gsx2json.com/api?id=${sheetId}&sheet=${encodeURIComponent(sheetName)}`
          : `https://gsx2json.com/api?id=${sheetId}`;
        
        console.log(`Trying gsx2json with sheet: "${sheetName || 'default'}"`);
        
        response = await fetch(url, { 
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.ok) {
          successMethod = `gsx2json with sheet: ${sheetName || 'default'}`;
          console.log(`Success: ${successMethod}`);
          break;
        }
      } catch (error) {
        console.log(`Failed with sheet name "${sheetName}":`, error);
        continue;
      }
    }
    
    // Method 2: Try alternative service if gsx2json fails
    if (!response || !response.ok) {
      try {
        url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
        console.log(`Trying alternative method: ${url}`);
        
        response = await fetch(url, { 
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000)
        });
        
        if (response.ok) {
          successMethod = 'Google Sheets API alternative';
          console.log(`Success: ${successMethod}`);
        }
      } catch (error) {
        console.log('Alternative method failed:', error);
      }
    }
    
    if (!response || !response.ok) {
      throw new Error(`All fetch methods failed. Last URL: ${url}`);
    }
    
    let data: any;
    let content: ContentData = {};
    let validRows = 0;
    
    if (successMethod.includes('gsx2json')) {
      // Handle gsx2json format
      try {
        data = await response.json();
        console.log('Parsed gsx2json data:', data);
        
        if (!data.rows || !Array.isArray(data.rows)) {
          throw new Error('Invalid gsx2json format - no rows found');
        }
        
        data.rows.forEach((row: any, index: number) => {
          if (row.key && row.value !== undefined && row.value !== '') {
            content[row.key] = row.value;
            validRows++;
          } else {
            console.log(`Skipping invalid gsx2json row ${index + 1}:`, row);
          }
        });
      } catch (error) {
        console.error('Failed to parse gsx2json data:', error);
        throw error;
      }
    } else {
      // Handle Google Sheets API format
      try {
        const rawData = await response.text();
        console.log('Google Sheets API raw data length:', rawData.length);
        console.log('Raw data received:', rawData);
        
        // Remove the /*O_o*/ wrapper and parse JSON
        const jsonStart = rawData.indexOf('{');
        const jsonEnd = rawData.lastIndexOf('}') + 1;
        const jsonData = rawData.substring(jsonStart, jsonEnd);
        
        data = JSON.parse(jsonData);
        console.log('Parsed Google Sheets API data:', data);
        
        if (!data.table || !data.table.rows || !Array.isArray(data.table.rows)) {
          throw new Error('Invalid Google Sheets API format - no table rows found');
        }
        
        // Google Sheets API format: rows[0].c[0].v = first cell value
        data.table.rows.forEach((row: any, index: number) => {
          console.log(`Processing row ${index + 1}:`, row);
          if (row.c && row.c.length >= 2) {
            const keyCell = row.c[0];
            const valueCell = row.c[1];
            
            if (keyCell && keyCell.v && valueCell && valueCell.v !== null && valueCell.v !== undefined) {
              const key = keyCell.v.toString().trim();
              const value = valueCell.v.toString();
              if (key && value !== '') {
                content[key] = value;
                validRows++;
                console.log(`Added content: ${key} = ${value}`);
              }
            }
          } else {
            console.log(`Skipping invalid Google Sheets API row ${index + 1}:`, row);
          }
        });
      } catch (error) {
        console.error('Failed to parse Google Sheets API data:', error);
        throw error;
      }
    }
    
    if (validRows === 0) {
      throw new Error('No valid content rows found in Google Sheet');
    }
    
    console.log(`Processed ${validRows} valid content rows:`, content);
    
    // Merge with defaults to ensure all required keys exist
    const finalContent = { ...DEFAULT_CONTENT, ...content };
    console.log('Final content:', finalContent);
    
    return finalContent;
    
  } catch (error) {
    console.error('Failed to fetch content from Google Sheets:', error);
    console.warn('Falling back to default content');
    return DEFAULT_CONTENT;
  }
}
