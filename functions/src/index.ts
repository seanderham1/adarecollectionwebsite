import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import express from "express";
import cors from "cors";

import nodemailer from "nodemailer";


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Add this middleware to log all requests
app.use((req, res, next) => {
  logger.info(`Request path: ${req.path}, URL: ${req.url}, method: ${req.method}`);
  next();
});

// Email transporter will be created inside the function

// Access request submission endpoint
app.post("/api/access-request", async (req, res) => {
  try {
    const { email, name, reason } = req.body;
    
    // Get email configuration
    const emailUser = 'info@theadarecollection.ie';
    const emailPass = 'owotdbgnxfyxadho';
    
    // Validate required fields
    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        message: "Valid email address is required" 
      });
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
    
    // Create email content for admin notification
    const mailOptions = {
      from: emailUser,
      to: 'info@theadarecollection.ie',
      subject: 'New Access Request - The Adare Collection Website',
      html: `
        <h2>New Website Access Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Reason for Access:</strong> ${reason || 'Not provided'}</p>
        <p><strong>Request Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><strong>To grant access:</strong></p>
        <p>Reply to this email with the access code: <code>access345</code></p>
        <p>Or send a custom message to the requester.</p>
        <hr>
        <p><em>This access request was submitted from the Adare Collection website.</em></p>
        <p>The Adare Collection Limited</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    logger.info(`Access request submitted by ${email}`);
    
    return res.json({ 
      success: true, 
      message: "Access request submitted successfully. We'll review your request and contact you soon." 
    });
    
  } catch (error) {
    logger.error('Error processing access request:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to submit access request. Please try again or contact us directly." 
    });
  }
});

// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, country, extension, phone, email, message } = req.body;
    
    // Get email configuration (temporarily hardcoded for testing)
    const emailUser = 'info@theadarecollection.ie';
    const emailPass = 'owotdbgnxfyxadho';
    
    // Debug: Log the email configuration
    logger.info(`Email config - user: ${emailUser}, pass: ${emailPass ? '***' : 'NOT SET'}`);
    
    if (!emailPass) {
      logger.error('Email password not configured');
      return res.status(500).json({ 
        success: false, 
        message: "Email configuration error. Please contact support." 
      });
    }
    
    // Create transporter inside function where config is available
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, email, and message are required" 
      });
    }

    // Create email content
    const mailOptions = {
      from: emailUser,
      to: 'info@theadarecollection.ie',
      subject: 'New Contact Inquiry - The Adare Collection',
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Country:</strong> ${country || 'Not specified'}</p>
        <p><strong>Extension:</strong> ${extension || 'Not specified'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not specified'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This inquiry was submitted from the Adare Collection website.</em></p>
        <p>The Adare Collection Limited</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    logger.info(`Contact form submitted by ${email}`);
    
    return res.json({ 
      success: true, 
      message: "Thank you for your inquiry. We will contact you within 24 hours." 
    });
    
  } catch (error) {
    logger.error('Error sending contact email:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send inquiry. Please try again or contact us directly." 
    });
  }
});

app.get("/hello", (_req, res) => {
  logger.info("hello endpoint hit");
  res.json({ ok: true, message: "Hello from Firebase Functions (Gen 2)!" });
});

// Add this new route to handle the /api/hello path
app.get("/api/hello", (_req, res) => {
  logger.info("api/hello endpoint hit");
  res.json({ ok: true, message: "Hello from Firebase Functions (Gen 2) via /api/hello!" });
});

// Add a catch-all to see what paths are being requested
app.get("*", (req, res) => {
  logger.info(`Unmatched path: ${req.path}, URL: ${req.url}`);
  res.json({ 
    path: req.path, 
    url: req.url, 
    message: "Debug info - this path was not matched",
    availableRoutes: ["/hello", "/api/hello", "/api/contact", "/api/access-request"]
  });
});

// Gen-2 with runtime environment variables
export const api = onRequest(
  { 
    region: "us-central1", 
    memory: "256MiB", 
    timeoutSeconds: 60, 
    cors: true
  },
  app
);

