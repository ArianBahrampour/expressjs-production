import express from "express";
import { Favorite } from "../models/Favorite";
import logger from "../utils/logger";

export const router = express.Router();

router.get("/api/favorite", async (req, res) => {
    const favorite = await Favorite.find().lean();
    logger.info(favorite);
    res.json({ favorite });
});

router.get("/api/favorite/:profile_id", async (req, res) => {
    logger.info(req.params);
    let query = {};
    const { profile_id } = req.params;
    if (profile_id == "undefined") {
        query = {};
        res.status(400).json({ message: "profile_id is undefined" });
    }

    query = { profile_id };
    logger.info(query);
    const data = await Favorite.find(query);
    if (!data) {
        res.status(404).json({ message: "Not Found" });
    }
    res.json(data);
});
