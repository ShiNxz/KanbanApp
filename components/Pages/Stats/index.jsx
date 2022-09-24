import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { useEffect, useState } from 'react'
import StatCard from './StatCard'
import { getLabelProps } from '@/utils/data/Labels'

const Stats = () => {
	const { data } = useSWR('/api/cards', fetcher)

	// get the data and calculate the stats
	const [stats, setStats] = useState({
		users: {},
		labels: {},
	})

	useEffect(() => {
		// calculate the stats

		// users
		const users = {}
		const labels = {}

		data &&
			data.cards &&
			data.cards.forEach((card) => {
				// users
				// for every card, count the creator 1 card
				users[card.user.username] = {
					...users[card.user.username],
					madeCards: users[card.user.username]?.madeCards + 1 || 1,
				}

				// for every card, count the user that closed the card
				if (card.done.value)
					users[card.done.user.username] = {
						...users[card.done.user.username],
						closedCards: users[card.done.user.username]?.closedCards + 1 || 1,
					}

				// labels
				// for every card, count the label
				labels[card.label] = labels[card.label] + 1 || 1
			})

		setStats({ users, labels })
	}, [data])

	return (
		<div>
			<h1>נתוני אתר</h1>
			<div className='grid grid-cols-6 gap-4'>
				<StatCard title='משתמשים'>
					{Object.entries(stats.users).map(([username, stats]) => (
						<div
							className='flex flex-col my-2'
							key={username}
						>
							<h4 className='mb-0'>{username}</h4>
							<span>
								<b>משימות שנוצרו:</b> {stats.madeCards || 0}
							</span>
							<span>
								<b>משימות שבוצעו:</b> {stats.closedCards || 0}
							</span>
						</div>
					))}
				</StatCard>
				<StatCard title='סטטוס'>
					{Object.entries(stats.labels).map(([labelId, uses]) => (
						<div
							className='flex flex-col my-2'
							key={labelId}
						>
							<h4 className='mb-0'>{getLabelProps(labelId).label}</h4>
							<span>
								<b>שימוש בסטטוס:</b> {uses} פעמים
							</span>
						</div>
					))}
				</StatCard>
			</div>
		</div>
	)
}

export default Stats
