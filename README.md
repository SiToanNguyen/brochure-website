# Brochure Website – Easy No-Code Editing

This is a lightweight and customizable website template designed for small businesses such as clinics, restaurants, or shops.

The **core feature** of this project:

> **All website content can be edited directly by the user through a simple Google Sheet — no coding, no technical knowledge, and no need to contact the developer.**

---

### **Deployment on GitHub Pages**
https://sitoannguyen.github.io/brochure-website/

---

## Features

### 1. **No-Code Editing via Google Sheets**
Every part of the website is editable through a spreadsheet. For example, for a doctor clinic:

- Clinic name & tagline  
- Doctor’s profile  
- List of services  
- Assistants / staff  
- Opening hours  
- Contact information  
- Holiday dates  
- Image links  

If the user knows how to edit a Google Sheet, they already know how to edit the website.

---

## How It Works

### **Website Frontend**
- `index.html` (main site)
- `script.js` (loads data)
- TailwindCSS (via CDN)

### **Google Sheet as CMS**
A Google Apps Script converts the Google Sheet into a public JSON API.

https://docs.google.com/spreadsheets/d/1Gtw1_VK2bbvvd4YjwduPQ-jgx4a8W_LopHeCtidQ3jQ/edit?usp=sharing


Please check the script in Extension > Apps Script.

---

### Why Google Sheets Instead of WordPress or Facebook?

Most small businesses only need to update simple information — opening hours, services, staff, and contact details. Traditional CMS platforms like **WordPress** can be overwhelming with plugins, dashboards, themes, updates, and security issues. Social platforms like **Facebook Pages** are easy to post on, but they don’t allow clean control over layout or structured data.

With **Google Sheets**:

- Editing the website is as easy as updating a spreadsheet.
- No login to a complicated CMS dashboard.
- No risk of breaking layouts, plugins, or themes.
- No need for backups — Google handles everything.
- No ads, no clutter, no unexpected UI changes (unlike Facebook).
- The user owns and controls all data directly.
- Changes appear instantly on the website.

For busy business owners, Google Sheets is the simplest, safest, and most reliable way to manage website content without any technical skills.

---

## Contributing

This project is for viewing only.  
If you'd like to make changes, feel free to clone the repository and modify it as you wish.

---

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.  
You are free to use, share, and modify the code, but **not for commercial purposes**.  
See the [LICENSE](LICENSE) file for more details.
