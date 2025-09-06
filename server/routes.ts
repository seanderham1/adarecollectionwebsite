import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Newsletter subscription endpoint
  app.post('/api/newsletter-subscription', async (req, res) => {
    try {
      const { email, timestamp, source } = req.body;

      // Validate email
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // Log the subscription (in production, you'd send actual email)
      console.log('Newsletter subscription received:', {
        email,
        timestamp,
        source,
        adminEmail: 'info@theadarecollection.ie'
      });

      // TODO: Integrate with email service to send notification to info@theadarecollection.ie
      // For now, we'll just log it and return success
      
      res.status(200).json({ 
        success: true, 
        message: 'Newsletter subscription processed successfully' 
      });

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
