const prisma = require('../shared/prisma/prisma.client');
const errorHandler = require('../shared/errors');

module.exports = async function (context, req) {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
    });

    return {
      status: 200,
      body: employees,
    };
  } catch (error) {
    context.log('Error while trying to list all employees.');
    context.log(error);

    return errorHandler(500, error);
  }
}