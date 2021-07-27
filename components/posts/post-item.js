import Link from "next/link";
import classes from "./post-item.module.css";
import Image from "next/image";

export default function PostItem({ title, date, excerpt, slug, image }) {
	const formattedDate = new Date(date).toLocaleDateString("en-SG", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const imagePath = `/images/posts/${slug}/${image}`;
	const linkPath = `/posts/${slug}`;

	// ?: Setting image priority={true} will cause them to preload so user will not need to wait as it is otherwise lazily loaded
	return (
		<li className={classes.post}>
			<Link href={linkPath}>
				<a>
					<div className={classes.image}>
						<Image src={imagePath} alt={title} width={300} height={200} layout="responsive" priority={true} />
					</div>

					<div className={classes.content}>
						<h3>{title}</h3>
						<time>{formattedDate}</time>
						<p>{excerpt}</p>
					</div>
				</a>
			</Link>
		</li>
	);
}
