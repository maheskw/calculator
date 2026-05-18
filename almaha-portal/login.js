// api/login.js — Vercel Serverless Function
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, password } = req.body;

    // Vercel Settings-ல் நாம் வைக்கப்போகும் ரகசிய மாறிகள் (Environment Variables)
    const CORRECT_PASSWORD = process.env.PORTAL_PASSWORD; 
    const SHEET_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
    const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

    // வாடிக்கையாளர் ஐடி மற்றும் பாஸ்வேர்டைச் சரிபார்த்தல்
    if (username === 'salon001' && password === CORRECT_PASSWORD) {
        try {
            // கூகுள் ஷீட்டில் இருந்து பாதுகாப்பாக தரவை எடுத்தல் (Sheet1-ல் உள்ள A முதல் D காலம்கள்)
            const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:D?key=${SHEET_API_KEY}`;
            const response = await fetch(sheetUrl);
            const data = await response.json();

            const rows = data.values || [];
            // லாகின் செய்த வாடிக்கையாளரின் ID (salon001) உள்ள ரோக்களை மட்டும் ஃபில்டர் செய்தல்
            const customerData = rows.filter(row => row[0] === username);

            return res.status(200).json({ success: true, accounts: customerData });
        } catch (error) {
            return res.status(500).json({ message: 'டேட்டா எடுப்பதில் பிழை!' });
        }
    } else {
        return res.status(401).json({ success: false, message: 'தவறான லாகின் விவரங்கள்!' });
    }
}