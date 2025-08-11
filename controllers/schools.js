import { db } from "../index.js";


function calcDist(lat1 , long1 , lat2 , long2){
    let x = lat2 - lat1;
    let y = long2 - long1;
    return Math.sqrt(x * x + y * y)*111;
}

export function addSchool(req, res) {
    const { name, address, latitude, longitude } = req.body;
    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error("Error adding school: ", err);
            return res.json({ error: "Internal Server Error" });
        }
        res.json({ message: "School added successfully", schoolId: result.insertId });
    });
}

export function findSchool(req, res) {
    const { id } = req.params;
    const query = "SELECT * FROM schools WHERE id = ?";

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error finding school:", err);
            return res.json({ error: "Internal Server Error" });
        }
        if (results.length === 0) {
            return res.json({ message: "School not found" });
        }
        res.json({ schools: results });
    });
}

export function listSchool(req, res) {
    const { latitude, longitude } = req.query;

    if (
        latitude === undefined ||
        longitude === undefined ||
        isNaN(parseFloat(latitude)) ||
        isNaN(parseFloat(longitude))
    ) {
        return res.json({ error: "Valid latitude and longitude are required as query parameters." });
    }

    const userLat = parseFloat(latitude);
    const userLong = parseFloat(longitude);

    const query = "SELECT * FROM schools";

    db.query(query, (err, results) => {
        if (err) {
            return res.json({ error: "Database error" });
        }

        const sortedSchools = results
            .map(school => ({
                ...school,
                distance: calcDist(userLat, userLong, school.latitude, school.longitude)
            }))
            .sort((a, b) => a.distance - b.distance);

        res.json({ schools: sortedSchools });
    });
}

export function listAllSchools(req, res) {
    const query = "SELECT * FROM schools";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching schools:", err);
            return res.json({ error: "Internal Server Error" });
        }
        res.json({ schools: results });
    });
}