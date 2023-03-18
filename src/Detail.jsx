import './sass/components/_detail.scss';
import { useParams } from 'react-router-dom';
function Detail(props) {
	const params = useParams();
	const job = props.details.filter(
		(data) => data.company === params.company,
	)[0];
	const logoStyles = {
		background: `url(${job.logo}) ${job.logoBackground} no-repeat center`,
	};

	return (
		<>
			<section className={'description {props.theme}'}>
				<section className='description__header'>
					<div style={logoStyles} className='description__logo'></div>
					<div className='description__title'>
						<h2 className='description__position'>{job.company}</h2>
						<p>{job.company.toLowerCase()}.com</p>
					</div>
					<p className='description__link'>Company Site</p>
				</section>

				<section className='description__body'>
					<div className='description__details'>
						<div>
							<p className='description__copy'>
								{job.postedAt} - {job.contract}
							</p>
							<h3 className='description__position'>{job.position}</h3>
							<p className='description__location'>{job.location}</p>
						</div>
						<div>
							<p className='description__apply'>Apply Now</p>
						</div>
					</div>

					<div>
						<p className='description__copy'>{job.description}</p>
					</div>

					<div>
						<h3>Requirements</h3>
						<p className='description__copy'>{job.requirements.content}</p>
						<ul className='description__requirements'>
							{job.requirements.items.map((item) => (
								<li>{item}</li>
							))}
						</ul>
					</div>

					<div>
						<h3>What you will do</h3>
						<p className='description__copy'>{job.role.content}</p>
						<ul className='description__roles'>
							{job.role.items.map((item) => (
								<li>{item}</li>
							))}
						</ul>
					</div>
				</section>
			</section>
			<section className='description__footer'>
				<div>
					<h3 className='description__position'>{job.position}</h3>
					<p className='description__position--subtitle'>{job.company}</p>
				</div>

				<p className='description__apply'>Apply Now</p>
			</section>
		</>
	);
}

export default Detail;
