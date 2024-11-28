import type { Request, Response, NextFunction } from "express";
import { UserService } from "@/api/user/userService";

export const adminAuth = (userService: UserService, authorizedRoles = ["professor", "admin"]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.auth.userId;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const user = await userService.getById(userId);
      if (!user.data?.role || !authorizedRoles.includes(user.data.role)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};