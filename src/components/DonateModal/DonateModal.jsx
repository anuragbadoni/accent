import React from "react";
import "./DonateModal.css";

const DonateModal = ({ setDonateModal, user }) => {
	// to store the donation link
	const donationLink = user.donationLink;

	return (
		<div className="donatemodal">
			<div className="donatemodal--container">
				<div className="donatemodal--header">
					<h1 className="donatemodal--form--heading">Support Creator</h1>
					{donationLink && (
						<p className="donatemodal--form--subheading">
							Make <span>{user.username}</span>'s day by sending them a tip!
						</p>
					)}
					{(!donationLink || donationLink === "") && (
						<p className="donatemodal--form--subheading">
							Sorry <span>{user.username}</span> is currently not accepting tips
							or does not have a donation page set up yet!
						</p>
					)}
					<p className="donatemodal--form--warning">
						This will take you to a tipping service like buymeacofee or ko-fi
						which is setup by the creator themselves. Accent is not responsible
						for any payment related issues.
					</p>
				</div>
				<div className="donatemodal--buttons">
					<button
						className="secondary-btn"
						onClick={() => setDonateModal(false)}
					>
						Cancel
					</button>
					<a
						href={user.donationLink}
						target="_blank"
						className="primary-btn donatemodal--donatebtn"
						onClick={() => setDonateModal(false)}
						rel="noreferrer"
					>
						Send a Tip
					</a>
				</div>
			</div>
		</div>
	);
};

export default DonateModal;
