import './sass/components/_listing.scss';
import { Link } from 'react-router-dom';
function Listing(props) {
	const logoUrl = new URL(props.logoSrc, import.meta.url).href;
	const logoStyles = {
		backgroundColor: `${props.logoBG}`,
		background: `url(${logoUrl}) no-repeat ${props.logoBG} center`,
		width: '50px',
		height: '50px',
		borderRadius: '25%',
	};

	return (
		<section className={`listing ${props.theme}`}>
			<div style={logoStyles} className='listing__logo'></div>
			<div className='listing__wrapper'>
				<p>
					{props.postDate} - {props.contractType}
				</p>
				<Link to={`/${props.company}`}>
					<h2 className='listing__title'>{props.position}</h2>
				</Link>
				<p>{props.company}</p>
				<p>{props.location}</p>
			</div>
		</section>
	);
}

export default Listing;
