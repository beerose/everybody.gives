import db from './index';

const seed = async () => {
	const groupNames = [ 'family-christmas', 'work-goodbye', 'friends-birthday' ];

	for (const groupName of groupNames) {
		const group = await db.group.create({
			data: {
				name: groupName,
				hashedPassword: '1234',
				settings: {
					event: `My ${groupName} event`,
					date: '2022-12-24',
					amount: 100
				}
			}
		});
		for (let i = 0; i < 10; i++) {
			await db.groupMember.create({
				data: {
					name: `(${group.name}) User ${i}`,
					groupId: group.id
				}
			});
		}
	}
};

export default seed;
