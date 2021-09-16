const User = require('../dataBase/User');

module.exports = {
    findAll: async (query = {}) => {
        const {
            perPage = 10,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;
        const skip = (page - 1) * perPage;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        const filterObject = {};
        let ageFilter = {};

        Object
            .keys(filters)
            .forEach((key) => {
                switch (key) {
                    case 'role':
                        const rolesArr = filters.role.split(',');

                        filterObject.role = { $in: rolesArr };
                        break;
                    case 'email':
                        filterObject.email = filters.email;
                        break;
                    case 'name':
                        filterObject.name = { $regex: `^${filters.name}`, $options: 'gi' };
                        break;
                    case 'age.gte':
                        ageFilter = { ...ageFilter, $gte: +filters['age.gte'] };
                        break;
                    case 'age.lte':
                        ageFilter = { ...ageFilter, $lte: +filters['age.lte'] };
                        break;
                    default:
                        console.info(`[INFO]: ${key} no match with exist filters`);
                        break;
                }
            });

        if (Object.keys(ageFilter).length) {
            filterObject.age = ageFilter;
        }

        const users = await User
            .find(filterObject)
            .select('-password -__v')
            .limit(+perPage)
            .skip(skip)
            .sort(sort);

        const count = await User.countDocuments(filterObject);

        return {
            data: users,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)
        };
    }
};
