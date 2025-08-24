import { NextResponse } from 'next/server';

export async function GET() {
  const sheetId = process.env.SHEET_ID;
  
  if (!sheetId) {
    return NextResponse.json({ 
      error: 'SHEET_ID not set',
      status: 'missing_env'
    });
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
      return NextResponse.json({ 
        error: `All fetch methods failed`,
        status: 'fetch_error',
        url: `Last attempted: ${url}`
      });
    }
    
    let data: any;
    let rowCount = 0;
    
    if (successMethod.includes('gsx2json')) {
      data = await response.json();
      rowCount = data.rows?.length || 0;
    } else {
      const rawData = await response.text();
      const jsonStart = rawData.indexOf('{');
      const jsonEnd = rawData.lastIndexOf('}') + 1;
      const jsonData = rawData.substring(jsonStart, jsonEnd);
      data = JSON.parse(jsonData);
      rowCount = data.table?.rows?.length || 0;
    }
    
    return NextResponse.json({ 
      success: true,
      data,
      url,
      method: successMethod,
      rowCount
    });
    
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'fetch_error',
      url: `https://gsx2json.com/api?id=${sheetId}`
    });
  }
}
