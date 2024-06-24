import React from "react";
import "./Donationpage.css";

const Donationpage = () => {
	return (
		<div className="donationpage">
			<div className="donationpage__container container">
				{/* Header */}
				<div className="donationpage__header--container">
					<h1 className="donationpage__heading">Accent - Tips</h1>
					<p className="donationpage__desc">
						Earn tips for your content from your followers
					</p>
				</div>
				{/* Details */}
				<div className="donationpage--details">
					<h1>Accept Tips from your Followers</h1>
					<p className="donationpage--details--guideline--desc">
						We at Accent believe that talent and hardwork should be rewarded.
						Your followers may think so too!
					</p>
					<p className="donationpage--details--guideline--desc">
						So add your donation page URL to your account to enable other users
						to send you a tip. <br /> You can use any service of your choice to
						do so, however we suggest using something like{" "}
						<a
							href="https://www.buymeacoffee.com/"
							className="donationpage--details--link"
						>
							Buy me a Coffee
						</a>{" "}
						or{" "}
						<a
							href="https://ko-fi.com/"
							className="donationpage--details--link"
						>
							Ko-fi
						</a>{" "}
						or something similiar.
					</p>
					<p className="donationpage--details--guideline--step">
						Step 1. Set up a donation page.
					</p>
					<p className="donationpage--details--guideline--desc">
						You can create your own custom donation page or use any donation
						accepting platforms, however we suggest using something like{" "}
						<a
							href="https://www.buymeacoffee.com/"
							className="donationpage--details--link"
						>
							Buy me a Coffee
						</a>{" "}
						or{" "}
						<a
							href="https://ko-fi.com/"
							className="donationpage--details--link"
						>
							Ko-fi
						</a>{" "}
						or something similiar.
					</p>
					<p className="donationpage--details--guideline--step">
						Step 2. Get your donation page link
					</p>
					<p className="donationpage--details--guideline--desc">
						Copy the link to your custom donation page or BuyMeACoffee or Ko-fi
						page. Be careful and make sure to copy the correct link.
					</p>
					<p className="donationpage--details--guideline--step">
						Step 3. Add the donation page link to your Accent account
					</p>
					<p className="donationpage--details--guideline--desc">
						Go to your profile settings and paste your donation page link in the
						"Donation Link" and save your profile.
					</p>
					<p className="donationpage--details--guideline--step">
						Step 4. You're all set!
					</p>
					<p className="donationpage--details--guideline--desc">
						And done! Now your followers can tip you by clicking on the "Support
						Artist" button on any of your post. Make sure to test out the button
						from your posts.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Donationpage;
