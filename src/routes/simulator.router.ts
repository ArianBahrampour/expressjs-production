import express from "express";
import { Router } from "express";
import { Simulator } from "../models/Simulator";
import cors from "cors";
import logger from "../utils/logger";
import { Profile } from "src/models/Profile";

var app = express();
app.use(cors());

export var router = express.Router();

router.get("/api/simulator", async (req, res) => {
    var simulator = await Simulator.find().lean();
    if (!simulator) {
        res.status(404).json({ message: "Not Found" });
    }
    logger.info(simulator);
    res.json({ simulator });
});

router.get("/api/simulator/:profile_id", async (req, res) => {
    logger.info("========== ");
    let query = {};
    var { profile_id } = req.params;
    logger.info({ profile_id });
    query = { profile_id };
    if (!profile_id) {
        res.status(400).json({ message: "profile_id is undefined" });
    }
    var data = await Simulator.find(query);
    if (!data) {
        res.status(404).json({ message: "Not Found" });
    }
    res.json(data);
});

router.post("/api/simulator/:profile_id", async (req, res) => {
    var { profile_id } = req.params;

    if (!profile_id) {
        res.status(400).json({ message: "profile_id is undefined" });
    }

    // find profile
    var profile = await Profile.findOne({ _id: profile_id }).exec();

    var newData = {
        ...req.body,
        profile_id,
    };
    logger.info(newData);
    var simulator = await Simulator.create(newData);
    res.json(simulator);
});
