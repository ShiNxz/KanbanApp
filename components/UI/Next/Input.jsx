import NextInput from '@nextui-org/react/input'
import Loading from '@nextui-org/react/loading'

const Input = (props) => {
	let color = props.color
	let status = props.status

	if (props.error) {
		color = 'error'
		status = 'error'
	} else if (props.success) {
		status = 'success'
		color = 'success'
	}

	if (props.password) props.type = 'password'

	return !props.password ? (
		<NextInput
			clearable={props.clearable || true}
			//helperText={props.error ? props.error : props.success ? props.success : props.helper}
			helperColor={color || props.color}
			contentRight={props.loading ? <Loading size='xs' /> : props.contentRight}
			style={{ width: props.width || undefined }}
			status={ color || props.color}
			disabled={props.disabled || props.loading}
			loading={undefined}
			{...props}
		/>
	) : (
		<NextInput.Password
			helperText={helper}
			helperColor={color}
			{...props}
		/>
	)
}

export default Input
