import Button from '@nextui-org/react/button'
import Loading from '@nextui-org/react/loading'

const NextButton = (props) => {
	return (
		<Button
			disabled={props.disabled || props.loading}
			size={props.size || 'md'}
			color={props.color || 'primary'}
			iconRight={
				props.loading ? (
					<Loading
						color='currentColor'
						size='xs'
						className='mr-2'
					/>
				) : (
					props.icon
				)
			}
			style={{ width: props.width || undefined, minWidth: props.width || undefined }}
			{...props}
		>
			{props.loading ? (
				props.children ? (
					'אנא המתן...'
				) : (
					<Loading
						color='currentColor'
						size='xs'
						className='mr-2'
					/>
				)
			) : (
				props.children
			)}
		</Button>
	)
}

export default NextButton
