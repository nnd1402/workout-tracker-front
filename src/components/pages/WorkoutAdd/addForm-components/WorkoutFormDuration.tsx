import { Form, Row, Col } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

type WorkoutFormDurationProps = {
	workoutDuration: string;
	handleDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const WorkoutFormDuration = (props: WorkoutFormDurationProps) => {
	return (
		<Form.Group className='mb-3 form-group' as={Row}>
			<Form.Label className='form-label'>Duration</Form.Label>
			<Col xs='6'>
				<Form.Control
					className='duration-control'
					type='number'
					placeholder='Your workout duration'
					value={props.workoutDuration}
					onChange={props.handleDurationChange}
					onKeyPress={(e) => {
						if (!/[0-9]/.test(e.key)) {
							e.preventDefault();
						}
					}}
				/>
			</Col>
			<Col xs='6'>
				<p className='minutes'>min</p>
			</Col>

			<RangeSlider
				value={props.workoutDuration}
				onChange={props.handleDurationChange}
				variant='warning'
				step={15}
				min={15}
				max={90}
				tooltipLabel={(currentValue) => `${currentValue} minutes`}
			/>
		</Form.Group>
	);
};

export default WorkoutFormDuration;
