//    /api/contact
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { email, name, message } = req.body;

		if (
			!email ||
			!email.includes("@") ||
			!name ||
			name.trim() === "" ||
			!message ||
			message.trim() === ""
		) {
			res.status(422).json({ message: "Invalid input" });
			return;
		}

		// Store in database
		const newMessage = {
			email,
			name,
			message,
		};

		const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.woyal.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

		let client;
		try {
			console.log(connectionString);
			client = await MongoClient.connect(connectionString);
		} catch (err) {
			return res.status(500).json({ message: "Error in connecting to database" });
		}

		const db = client.db();
		try {
			const result = await db.collection("messages").insertOne(newMessage);
			newMessage.id = result.insertedId; // ?: This inserts the id of the document into the response
		} catch (err) {
			client.close();
			res.status(500).json({ message: "Storing message failed!" });
		}

		client.close();
		res.status(201).json({ message: "Successfully stored message!", newMessage });
	}
}
