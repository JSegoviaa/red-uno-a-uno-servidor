import { Router } from "express";
import { iniciarChat, obtenerChats } from "../controllers/chats";

const router = Router();

router.get("/", obtenerChats);

router.post("/", iniciarChat);

export default router;
