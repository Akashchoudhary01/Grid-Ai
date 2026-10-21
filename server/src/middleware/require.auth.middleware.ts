import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth"
import { Request , Response , NextFunction } from "express";
import type {Session} from '../lib/session'


declare module "express-serve-static-core" {
    interface Request {
        session: Session;
    }
}


export async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    req.session = session;
    next();
}