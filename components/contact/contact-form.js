import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../notification/notification";

const sendContactData = async contactDetails => {
	const response = await fetch("/api/contact", {
		method: "POST",
		body: JSON.stringify(contactDetails),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = response.json();

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong!");
	}
};

export default function ContactForm() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [requestStatus, setRequestStatus] = useState(); // pending, success, error
	const [requestError, setRequestError] = useState();

	useEffect(() => {
		console.log("inside useEffect");
		console.log(requestStatus);
		if (requestStatus === "success" || requestStatus === "error") {
			const timer = setTimeout(() => {
				console.log("inside set timeout");
				setRequestError(null);
				setRequestStatus(null);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [requestStatus]);

	const submitHandler = async event => {
		event.preventDefault();

		try {
			setRequestStatus("pending");
			await sendContactData({ email, name, message });
			setRequestStatus("success");
			setEmail("");
			setName("");
			setMessage("");
		} catch (err) {
			setRequestStatus("error");
			setRequestError(err.message);
		}
	};

	let notificationData;

	if (requestStatus === "pending") {
		notificationData = {
			status: "pending",
			title: "Sending messsage ...",
			message: "Your message is on its way!",
		};
	}

	if (requestStatus === "error") {
		notificationData = {
			status: "error",
			title: "Error in sending message",
			message: requestError,
		};
	}

	if (requestStatus === "success") {
		notificationData = {
			status: "success",
			title: "Success!",
			message: "Successfully sent message",
		};
	}

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor="email">Your email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="name">Your Name</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={event => setName(event.target.value)}
						/>
					</div>
				</div>

				<div className={classes.control}>
					<label htmlFor="message">Your message</label>
					<textarea
						id="message"
						cols="5"
						rows="5"
						value={message}
						onChange={event => setMessage(event.target.value)}
					></textarea>
				</div>

				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>

			{notificationData && <Notification {...notificationData} />}
		</section>
	);
}
