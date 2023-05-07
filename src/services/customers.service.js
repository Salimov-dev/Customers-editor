import httpService from "./http.service";

const customersEndpoint = "customers/";

const customersService = {
  get: async () => {
    const { data } = await httpService.get(customersEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(customersEndpoint + payload._id, payload);
    return data;
  },
  remove: async (customerId) => {
    const { data } = await httpService.delete(customersEndpoint + customerId);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await httpService.patch(customersEndpoint + id, payload);
    return data;
  },
};
export default customersService;
