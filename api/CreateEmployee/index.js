const prisma = require('../shared/prisma/prisma.client');
const errorHandler = require('../shared/errors');

module.exports = async function (context, req) {
  try {
    let {
      name,
      salary,
      job_role,
      employee_registration
    } = req.body;
  
    employee_registration = parseInt(employee_registration);
  
    const employeeRegistrationExists = await prisma.employee.findUnique({
      where: {
        employee_registration
      }
    });
  
    if (employeeRegistrationExists) return errorHandler(490, 'Employee already exists.');
  
    const employee = await prisma.employee.create({
      data: {
        name,
        salary,
        job_role,
        employee_registration
      }
    });
  
    return {
      status: 201,
      body: employee
    }
  } catch (error) {
    context.log('Error while trying to create an employee.');
    context.log(error);

    return errorHandler(500, error);
  }
}