import api from '../config/api';

export const getSevkiyat = companyId => {
  return api.get(`ShipMonth/${companyId}`);
};
