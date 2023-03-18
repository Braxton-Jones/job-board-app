import './sass/main.scss';
import data from '../data.json';
import Listing from './Listing.jsx';
import Detail from './Detail.jsx';
import { useState } from 'react';
import logo from './assets/desktop/logo.svg';
import sun from './assets/desktop/icon-sun.svg';
import moon from './assets/desktop/icon-moon.svg';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Joblist from './Joblist.jsx';

function App() {
	const [renderAmount, setRenderAmount] = useState(12);
	const [location, setLocation] = useState('');
	const [title, setTitle] = useState('');
	const [isFullTime, setIsFullTime] = useState('');
	const [searchQuery, setSearchQuery] = useState(
		filterJobs(data, title, location, isFullTime),
	);
	const [theme, setTheme] = useState('light');

	// Getting the user's inputs
	const handleTitleInput = (event) => {
		setTitle(event.target.value);
		console.log(title);
	};

	const handleLocationChange = (event) => {
		setLocation(event.target.value);
		console.log(location);
	};

	const handleFullTimeToggle = () => {
		if (isFullTime === 'full time') {
			setIsFullTime();
		} else {
			setIsFullTime('full time');
		}
	};

	function handleShowMore() {
		setRenderAmount(data.length);
	}

	// Filter Functionality
	function filterJobs(data, title, location, isFullTime) {
		return data.filter((data) => {
			if (title && !data.position.toLowerCase().includes(title.toLowerCase())) {
				return false;
			}

			if (location && data.location !== `${location}`) {
				return false;
			}

			if (isFullTime && data.contract.toLowerCase() !== `${isFullTime}`) {
				return false;
			}

			return true;
		});
	}

	function handleThemeToggle() {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}

	const handleSearchBtn = () => {
		setSearchQuery(filterJobs(data, title, location, isFullTime));
	};

	const jobList = searchQuery
		.map((data) => (
			<Listing
				key={data.id}
				id={data.id}
				company={data.company}
				logoSrc={data.logo}
				logoBG={data.logoBackground}
				postDate={data.postedAt}
				contractType={data.contract}
				position={data.position}
				location={data.location}
				theme={theme}
			/>
		))
		.slice(0, renderAmount);

	const locations = [
		...new Set(
			data.map((data) => {
				return data.location;
			}),
		),
	].map((location) => <option value={location}>{location}</option>);

	return (
		<BrowserRouter basename='/job-board-app'>
			<main className={theme}>
				<section className='header-container'>
					<Link to='/'>
						<img src={logo} className='header__img'></img>
					</Link>
					<div className='header__toggle'>
						<img src={sun} />
						<div>
							<label className='toggle-switch'>
								<input type='checkbox' onClick={handleThemeToggle} />
								<span className='slider round'></span>
							</label>
						</div>
						<img src={moon} />
					</div>
				</section>

				<Routes>
					<Route
						path='/'
						element={
							<Joblist
								data={jobList}
								title={title}
								onTitleInput={handleTitleInput}
								location={location}
								locations={locations}
								onLocationChange={handleLocationChange}
								onToggle={handleFullTimeToggle}
								isFullTime={isFullTime}
								onSearch={handleSearchBtn}
								onShowMore={handleShowMore}
								renderAmount={renderAmount}
								theme={theme}
							/>
						}
					></Route>
					<Route
						path='/:company'
						element={<Detail details={data} theme={theme} />}
					></Route>
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
