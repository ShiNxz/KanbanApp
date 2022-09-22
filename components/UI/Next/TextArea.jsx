// NEXT-UI INPUT
import Textarea from '@nextui-org/react/textarea'
import Loading from '@nextui-org/react/loading'
import { forwardRef } from 'react'

const InputForm = forwardRef((props, ref) => {
	if (props.error) {
		props.color = 'error'
		props.status = 'error'
	} else if (props.success) {
		props.status = 'success'
		props.color = 'success'
	}

	return (
		<Textarea
			clearable={props.clearable || true}
			helperText={props.helper}
			helperColor={props.color}
			contentRight={props.loading ? <Loading size='xs' /> : props.contentRight}
			width={props.width}
			fullWidth={props.full}
			ref={ref}
			{...props}
		/>
	)
})

export default InputForm
