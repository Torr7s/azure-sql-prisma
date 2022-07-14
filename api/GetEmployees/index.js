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

    console.log(employees)

    return {
      status: 200,
      body: employees,
    };
  } catch (error) {
    context.log('Error while trying to list all employees.');
    context.log(error);

    return handleError(500, error);
  }
}