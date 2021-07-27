import classes from "./hero.module.css";
import Image from "next/image";

export default function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image src="/images/site/anna.jpg" alt="An image of Anna" width={"300"} height={"300"} />
			</div>
			<h1>Hi, Im Anna</h1>
			<p>I blog about web development, especially about Angular and React</p>
		</section>
	);
}
