import searchImg from './assets/desktop/icon-search.svg';
import searchImgMobile from './assets/mobile/icon-search.svg';
import locationImg from './assets/desktop/icon-location.svg';
import filter from './assets/mobile/icon-filter.svg';
import { useState } from 'react';
function Joblist(props) {
	const [isOpen, setIsOpen] = useState(false);
	function handleMobileToggle() {
		setIsOpen(!isOpen);
	}
	function handleMobileSearch() {
		props.onSearch();
		handleMobileToggle();
	}
	return (
		<>
			<section className='joblist-container'>
				<section className='filter-container'>
					<div className='filter__search'>
						<img src={searchImg} />
						<input
							type='text'
							placeholder='Filter by title , companies , expertise…'
							value={props.title}
							onChange={props.onTitleInput}
						/>
					</div>

					<div className='filter__location'>
						<img src={locationImg} />

						<select value={props.location} onChange={props.onLocationChange}>
							<option value=''>Filter by location...</option>
							{props.locations}
						</select>
					</div>

					<div className='filter__fulltime'>
						<div className='filter__wrapper'>
							<input
								type='checkbox'
								name='checkbox'
								id='checkbox'
								onClick={props.onToggle}
								value={props.isFullTime}
							/>
							<label for='checkbox'>Full Time</label>
						</div>

						<button className='filter__btn' onClick={props.onSearch}>
							Search
						</button>
					</div>

					<img
						src={filter}
						className='filter__mobilemenu'
						onClick={handleMobileToggle}
					/>
					<img
						src={searchImgMobile}
						className='filter__search--mobile'
						onClick={props.onSearch}
					/>
				</section>

				<div className='overlay' style={{ display: isOpen ? 'flex' : 'none' }}>
					<section
						className={`mobile-filter ${props.theme}`}
						style={{ display: isOpen ? 'flex' : 'none' }}
					>
						<div className='filter__location'>
							<img src={locationImg} />

							<select value={props.location} onChange={props.onLocationChange}>
								<option value=''>Filter by location...</option>
								{props.locations}
							</select>
						</div>

						<div className='filter__fulltime'>
							<div className='filter__wrapper'>
								<input
									type='checkbox'
									name='checkbox'
									id='checkbox'
									onClick={props.onToggle}
									value={props.isFullTime}
								/>
								<label for='checkbox'>Full Time Only</label>
							</div>
						</div>
						<button className='filter__btn' onClick={handleMobileSearch}>
							Search
						</button>
					</section>
				</div>
				<div className='joblist-wrapper'>{props.data}</div>
			</section>

			<button
				onClick={props.onShowMore}
				style={{ display: props.renderAmount === 12 ? '' : 'none' }}
			>
				Load More
			</button>
		</>
	);
}
export default Joblist;
