// Функции для преобразования JSON данных
export const transformEmployeeData = (data) => {
  return {
    ...data,
    // Можно добавить дополнительные преобразования
    fullInfo: `${data.name} - ${data.position} (${data.department})`
  };
};

export const formatPhoneNumber = (phone) => {
  return phone.replace(/(\d{1})?(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
};

export const filterEmployeesByStatus = (employees, status) => {
  return employees.filter(emp => emp.status === status);
};

export const sortEmployeesByName = (employees) => {
  return [...employees].sort((a, b) => a.name.localeCompare(b.name));
};