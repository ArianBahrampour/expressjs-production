import express from "express";
import { Profile } from "../models/Profile";
import logger from "../utils/logger";

export var router = express.Router();

router.get("/api/profile", async (req, res) => {
    var profile = await Profile.find().lean();
    if (!profile) {
        res.status(404).json({ message: "Not Found" });
    }
    logger.info(profile);
    res.json({ profile });
});

router.post("/api/profile", async (req, res) => {
    var { email, name, nickname } = req.body;

    if (!email || !name || !nickname) {
        res.status(400).json({ message: "Missing fields" });
    }
    if (typeof email !== "string" || typeof name !== "string" || typeof nickname !== "string") {
        res.status(400).json({ message: "Invalid fields" });
    }

    let profile = await Profile.findOne({
        $or: [{ email }, { nickname }],
    }).exec();

    if (!profile) {
        profile = await Profile.create({ name, email, nickname });
    } else {
        res.status(400).json({ message: "Profile already exists" });
    }

    res.json(profile);
});
