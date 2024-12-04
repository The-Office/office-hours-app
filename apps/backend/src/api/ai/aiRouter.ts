// aiRouter.ts
import express, { Router } from "express";
import { AIController } from "./aiController";
import { AIService } from "./aiService";

export const aiRouter = express.Router();
const aiService = new AIService();
const aiController = new AIController(aiService);

aiRouter.post("/office-hours", aiController.parseOfficeHours);