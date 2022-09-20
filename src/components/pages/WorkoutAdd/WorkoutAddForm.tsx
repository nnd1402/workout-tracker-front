import { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import WorkoutTitle from '././components/WorkoutTitle';
import WorkoutDuration from '././components/WorkoutDuration';
import WorkoutDescription from '././components/WorkoutDescription';
import WorkoutDatePicker from '././components/WorkoutDatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const WorkoutAddForm = () => {
	const [workoutTitle, setWorkoutTitle] = useState('');
	const [workoutDuration, setWorkoutDuration] = useState('');
	const [workoutDescription, setWorkoutDescription] = useState('');
	const [startDate, setStartDate] = useState(new Date());

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	function handleWorkoutTitle(e: any): void {
		setWorkoutTitle(e.target.value);
	}

	function handleDurationChange(e: any): void {
		setWorkoutDuration(e.target.value);
	}

	function handleDescriptionChange(e: any): void {
		setWorkoutDescription(e.target.value);
	}

	function handleDateChange(date: Date): void {
		setStartDate(date);
	}

	const addWorkout = () => {
		setIsLoading(true);
		Axios.post('https://localhost:7116/api/Workout', {
			title: workoutTitle,
			duration: workoutDuration,
			description: workoutDescription,
			date: startDate
		})
			.then(() => {
				alert('Successfully added workout');
				setErrorMessage('');
				setIsLoading(false);
			})
			.catch(() => {
				setErrorMessage(
					'Something went wrong, please check that you entered the fields correctly!'
				);
				setIsLoading(false);
			});
	};

	return (
		<>
			<Container className='add-workout-container'>
				<Form className='add-workout-form '>
					<Row>
						<Col xs={1}>
							<Link to='/' className=' m-3 text-center'>
								<FontAwesomeIcon
									className='arrow-left-icon'
									icon={faArrowLeft}
									size='2x'
								/>
							</Link>
						</Col>
						<Col xs={10}>
							<h3 className='add-workout-title'>
								Form for adding a new workout
							</h3>
						</Col>
					</Row>
					<WorkoutTitle
						workoutTitle={workoutTitle}
						handleWorkoutTitle={handleWorkoutTitle}
					/>
					<WorkoutDuration
						workoutDuration={workoutDuration}
						handleDurationChange={handleDurationChange}
					/>
					<WorkoutDescription
						workoutDescription={workoutDescription}
						handleDescriptionChange={handleDescriptionChange}
					/>
					<WorkoutDatePicker
						startDate={startDate}
						handleDateChange={handleDateChange}
					/>
					<div className='text-center'>
						<Button variant='success' onClick={addWorkout} disabled={isLoading}>
							{isLoading ? (
								<Spinner animation='border' size='sm' />
							) : (
								'Add Workout'
							)}
						</Button>
					</div>
					<div className='text-center'>
						<small className='error-message'>{errorMessage}</small>
					</div>
				</Form>
			</Container>
		</>
	);
};

export default WorkoutAddForm;
